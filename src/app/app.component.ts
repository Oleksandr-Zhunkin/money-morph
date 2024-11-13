import { CurrencyService } from './services/currency.service';
import { Component } from '@angular/core';
import { Rate } from './types/types';
import { HeaderComponent } from './components/Header/header.component';
import { MainComponent } from './components/Main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'money-morph';
  currencies: Rate[] | null = null;
  headerCurrencies: { displayName: string; rate: number | undefined }[] = [];

  constructor(private currencyService: CurrencyService) {}

  async ngOnInit() {
    const result = await this.currencyService.load();

    this.currencies = result;

    const usdToUah = result.find(
      (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
    );
    const eurToUah = result.find(
      (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
    );

    this.headerCurrencies = [
      { displayName: 'USD', rate: usdToUah?.rateBuy },
      { displayName: 'EUR', rate: eurToUah?.rateBuy },
    ];
  }
}
