import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaPipe',
})
export class FechaPipe implements PipeTransform {
  transform(value: string,): string {
    if (!value) return '';
    const soloFecha = value.split('T')[0];
    const [anio, mes, dia] = soloFecha.split('-');
    return `${dia}-${mes}-${anio.slice(-2)}`;
  }
}
