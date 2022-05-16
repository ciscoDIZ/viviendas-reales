import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readMore'
})
export class ReadMorePipe implements PipeTransform {

  transform(value: string, maxLength: number, showMore: boolean = false): any {
    if (value) {
      if (showMore) {
        return value;
      }
      return value.substring(0, maxLength);
    }
  }

}
