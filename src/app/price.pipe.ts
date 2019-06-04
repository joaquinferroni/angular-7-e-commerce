import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Price'
})
export class PricePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return `${value.toFixed(2).toLocaleString()}`;
  }

}

@Pipe({
  name: 'PriceSymbol'
})
export class PriceSymbolPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    var money = JSON.parse(localStorage.getItem('currentUser'))['moneyId'] == 3 ? 'U$D' : '$';
    return `${money} ${value}`;
  }

}
