import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { MovimientosCatalog, Producto} from '../model/interfaces/interfaces';
import {ConsumeService} from './consume.service';
import {Endpoints} from '../../environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  catalogs = new Subject<Array<MovimientosCatalog>>();

  constructor(private consume: ConsumeService) { }

  getProductCatalog(): Observable<Array<Producto>> {
    return this.consume.httpGet(Endpoints.catalogos.host + Endpoints.catalogos.products);
  }

  getMovsCatalog(): Observable<Array<MovimientosCatalog>> {
    return this.consume.httpGet(Endpoints.catalogos.host + Endpoints.catalogos.typeMovs);
    // return this.catalogs.asObservable();
    // return of(catalogoTipoMovimiento);
  }

  setMovsCatalog(catalogs): void {
    this.catalogs.next(catalogs);
  }

  getMovsCatalogService(): Observable<Array<MovimientosCatalog>> {
    return this.consume.httpGet(Endpoints.catalogos.host + Endpoints.catalogos.typeMovs);
    // return of(catalogoTipoMovimiento);
  }
}
