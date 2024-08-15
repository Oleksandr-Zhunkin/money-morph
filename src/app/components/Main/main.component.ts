import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { convertCurrency } from '../../utils/utils';
import { CommonModule } from '@angular/common';
import { CustomInput } from '../customInput/customInput.component';
import { CustomSelect } from '../customSelect/customSelect.component';
import { CustomToggle } from '../customToggle/customToggle.component';
import { Rate } from '../../types/types';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, CommonModule, CustomInput, CustomSelect, CustomToggle],
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

  private updateValues(changedField: 'from' | 'to') {
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
        if (changedField === 'from') {
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
    this.updateValues('from');
  }

  updateSecondValue(newSecondValue: number | null) {
    this.toValue = newSecondValue;
    this.updateValues('to');
  }

  updateFirstSelect(newFirstSelect: string) {
    this.firstSelect = newFirstSelect;
    this.updateValues('from');
  }

  updateSecondSelect(newSecondSelect: string) {
    this.secondSelect = newSecondSelect;
    this.updateValues('from');
  }

  updateConversionType(newConversionType: 'buy' | 'sell') {
    this.conversionType = newConversionType;
    this.updateValues('from');
  }
}
