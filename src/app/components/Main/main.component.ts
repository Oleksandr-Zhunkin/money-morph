import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { convertCurrency } from '../../utils/utils';
import { Rate } from '../../services/currency.service';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatOptionModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  placeholder = '0.00';
  fromValue: number | null = null;
  firstSelect = '840';
  toValue: number | null = null;
  secondSelect = '980';
  conversionType: 'buy' | 'sell' = 'buy';
  @Input() currencies: Rate[] = [];
  currenciesValues = [
    { value: '840', viewValue: 'USD' },
    { value: '978', viewValue: 'EUR' },
    { value: '980', viewValue: 'UAH' },
  ];

  private updateValues(changedField: 'first' | 'second') {
    if (this.fromValue === null && this.toValue === null) return;
    try {
      const result = convertCurrency(
        this.fromValue,
        this.firstSelect,
        this.toValue,
        this.secondSelect,
        this.conversionType,
        changedField,
        this.currencies
      );

      if (result) {
        if (changedField === 'first') {
          this.toValue = result.newSecondValue;
        } else {
          this.fromValue = result.newFirstValue;
        }
      } else {
        console.warn('Conversion result is undefined.');
      }
    } catch (error) {
      console.error('Error during currency conversion');
    }
  }

  updateFirstValue(newFirstValue: number | null) {
    this.fromValue = newFirstValue;
    this.updateValues('first');
  }

  updateSecondValue(newSecondValue: number | null) {
    this.toValue = newSecondValue;
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
