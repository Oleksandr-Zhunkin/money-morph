const findRate = (
  codeA: number,
  codeB: number,
  conversionType: string,
  currencies: Rate[]
): number | null => {
  const rates: Rate[] = currencies || [];

  const rateEntry = rates.find(
    (rate) =>
      (rate.currencyCodeA === Number(codeA) &&
        rate.currencyCodeB === Number(codeB)) ||
      (rate.currencyCodeA === Number(codeB) &&
        rate.currencyCodeB === Number(codeA))
  );

  if (!rateEntry) return null;

  if (rateEntry.rateBuy && conversionType === 'buy') return rateEntry.rateBuy;
  if (rateEntry.rateSell && conversionType === 'sell')
    return rateEntry.rateSell;
  if (rateEntry.rateCross) return rateEntry.rateCross;

  return null;
};

export const convertCurrency = (
  firstValue: string,
  firstSelect: string,
  secondValue: string,
  secondSelect: string,
  conversionType: string,
  changedField?: 'first' | 'second',
  currencies?: Rate[]
): { newFirstValue: string; newSecondValue: string } | void => {
  if (firstSelect === secondSelect) {
    return { newFirstValue: firstValue, newSecondValue: firstValue };
  }

  if (!currencies) {
    return console.error('Currencies not found');
  }
  let rate = findRate(
    Number(firstSelect),
    Number(secondSelect),
    conversionType,
    currencies
  );

  if (
    (Number(firstSelect) === 840 &&
      Number(secondSelect) === 978 &&
      rate !== null) ||
    (Number(firstSelect) === 980 && rate !== null)
  ) {
    rate = 1 / rate;
  } else {
    rate = rate;
  }

  if (rate === null) {
    console.error('Rate not found');
    return;
  }

  let newFirstValue = firstValue;
  let newSecondValue = secondValue;

  if (changedField === 'first') {
    newSecondValue = (Number(firstValue) * rate).toFixed(2);
  } else if (changedField === 'second') {
    newFirstValue = (Number(secondValue) / rate).toFixed(2);
  }

  return { newFirstValue, newSecondValue };
};

export interface Rate {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy?: number;
  rateSell?: number;
  rateCross?: number;
}
