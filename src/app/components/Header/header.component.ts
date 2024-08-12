import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import { Rate } from '../../utils/utils';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currencies: Rate[] = [];
  usd: number | undefined;
  eur: number | undefined;

  constructor(private currencyService: CurrencyService) {}
  async ngOnInit() {
    try {
      const data = await this.currencyService.load();

      this.currencies = data.result;
      this.usd = this.currencies[0].rateBuy;
      this.eur = this.currencies[1].rateBuy;
    } catch (error) {
      console.error('Failed to load currency data');
    }
  }
}
