import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
    catalog = [
      { id: 1, name: 'Activo'},
      { id: 0, name: 'Inactivo'},
    ];

    transform(value: any): unknown {
      return this.catalog.find(i => i.id === value).name;
    }
}
