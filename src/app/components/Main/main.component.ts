import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { convertCurrency, Rate } from '../../utils/utils';
import { CurrencyService } from '../../services/currency.service';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    CommonModule,
    MaterialModule,
    MatButtonToggleModule,
    MatOptionModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  placeholder: string = '0.00';
  firstInput: string = '';
  firstSelect: string = '840';
  secondInput: string = '';
  secondSelect: string = '980';
  conversionType: 'buy' | 'sell' = 'buy';
  currencies: Rate[] = [];
  currenciesValues = [
    { value: '840', viewValue: 'USD' },
    { value: '978', viewValue: 'EUR' },
    { value: '980', viewValue: 'UAH' },
  ];

  constructor(private currencyService: CurrencyService) {}

  async ngOnInit() {
    const result = await this.currencyService.load();
    this.currencies = result.result;
  }

  private updateValues(changedField: 'first' | 'second') {
    if (this.firstInput === '' && this.secondInput === '') return;
    try {
      const result = convertCurrency(
        this.firstInput,
        this.firstSelect,
        this.secondInput,
        this.secondSelect,
        this.conversionType,
        changedField,
        this.currencies
      );

      if (result) {
        if (changedField === 'first') {
          this.secondInput = result.newSecondValue.toString();
        } else {
          this.firstInput = result.newFirstValue.toString();
        }
      } else {
        console.warn('Conversion result is undefined.');
      }
    } catch (error) {
      console.error('Error during currency conversion:');
    }
  }

  updateFirstValue(newFirstValue: string) {
    this.firstInput = newFirstValue;
    this.updateValues('first');
  }

  updateSecondValue(newSecondValue: string) {
    this.secondInput = newSecondValue;
    this.updateValues('second');
  }

  updateFirstSelect(newFirstSelect: string) {
    this.firstSelect = newFirstSelect;
    this.updateValues('first');
  }

  updateSecondSelect(newSecondSelect: string) {
    this.secondSelect = newSecondSelect;
    this.updateValues('first');
  }

  updateConversionType(newConversionType: 'buy' | 'sell') {
    this.conversionType = newConversionType;
    this.updateValues('first');
  }
}
