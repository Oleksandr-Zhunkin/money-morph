import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  http;
  url: string;

  constructor(http: HttpClient) {
    this.http = http;
    this.url = 'https://api.monobank.ua/bank/currency';
  }

  async load() {
    const currencyKey = 'currency';
    const date = new Date().getTime();

    const cashedCurrencyData = localStorage.getItem(currencyKey);

    if (cashedCurrencyData !== null) {
      const parsedData = JSON.parse(cashedCurrencyData);
      if (parsedData.date && date - parsedData.date < 3600000) {
        return parsedData.result as Rate[];
      }
    }
    const currencyData = {
      date,
      result: await firstValueFrom(this.http.get<Rate[]>(this.url)),
    };

    localStorage.setItem(currencyKey, JSON.stringify(currencyData));

    return currencyData.result;
  }
}

export interface Rate {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy?: number;
  rateSell?: number;
  rateCross?: number;
}
