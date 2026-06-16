import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recortarTexto',
})
export class RecortarTextoPipe implements PipeTransform {
  transform(value: string, limite: number = 20): string {
    if (!value) return '';
    return value.length > limite ? value.substring(0, limite) + '...' : value;
  }
}
