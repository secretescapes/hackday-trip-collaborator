import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return [];
    } else {
      return Object.keys(value).map((e) => value[e]);
    }
  }

}
