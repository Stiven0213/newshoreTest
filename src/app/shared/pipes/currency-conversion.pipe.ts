import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConversion'
})
export class CurrencyConversionPipe implements PipeTransform {

  transform(value: number, rate: number): number {
    const convertedValue = Math.floor(value * rate); // Realiza la conversión de moneda
    return convertedValue;
  }

}
