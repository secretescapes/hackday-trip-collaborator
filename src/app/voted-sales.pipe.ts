import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'votedSales'
})
export class VotedSalesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return value;
    }
    return value.filter(x => x !== null && x.votes > 0).sort((x, y) => x.votes === y.votes ? 0 : (x.votes > y.votes ? -1 : 1));
  }

}
