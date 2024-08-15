import { Rate } from '../types/types';

const USD_CODE = 840;
const EUR_CODE = 978;
const UAH_CODE = 980;

const findRate = (
  codeA: number,
  codeB: number,
  conversionType: string,
  currencies: Rate[]
): number | null => {
  const rates: Rate[] = currencies || [];

  const rateEntry = rates.find(
    (rate) =>
      (rate.currencyCodeA === codeA && rate.currencyCodeB === codeB) ||
      (rate.currencyCodeA === codeB && rate.currencyCodeB === codeA)
  );

  if (!rateEntry) return null;

  if (rateEntry.rateBuy && conversionType === 'buy') return rateEntry.rateBuy;
  if (rateEntry.rateSell && conversionType === 'sell')
    return rateEntry.rateSell;
  if (rateEntry.rateCross) return rateEntry.rateCross;

  return null;
};

export const convertCurrency = (
  fromValue: number | null,
  codeCurrencyFrom: string,
  toValue: number | null,
  codeCurrencyTo: string,
  conversionType: string,
  changedField?: 'from' | 'to',
  currencies: Rate[] = []
): { newFirstValue: number | null; newSecondValue: number | null } | void => {
  if (fromValue === null && toValue === null) {
    return;
  }
  if (codeCurrencyFrom === codeCurrencyTo) {
    return { newFirstValue: toValue, newSecondValue: fromValue };
  }

  let rate = findRate(
    Number(codeCurrencyFrom),
    Number(codeCurrencyTo),
    conversionType,
    currencies
  );

  if (
    (Number(codeCurrencyFrom) === USD_CODE &&
      Number(codeCurrencyTo) === EUR_CODE &&
      rate !== null) ||
    (Number(codeCurrencyFrom) === UAH_CODE && rate !== null)
  ) {
    rate = 1 / rate;
  } else {
    rate = rate;
  }

  if (rate === null) {
    console.error('Rate not found');
    return;
  }

  let newFirstValue = fromValue;
  let newSecondValue = toValue;

  if (changedField === 'from') {
    newSecondValue = Number((Number(fromValue) * rate).toFixed(2));
  } else if (changedField === 'to') {
    newFirstValue = Number((Number(toValue) / rate).toFixed(2));
  }

  return { newFirstValue, newSecondValue };
};
