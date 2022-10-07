import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {testProducts} from '../../mocks/productos-test';
import {AlmacenProducto, Cliente, PostMovimientos} from '../model/interfaces/interfaces';
import {ConsumeService} from './consume.service';
import {Endpoints} from '../../environments/endpoints';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {

  constructor(private consume: ConsumeService) { }

  getProducts(almacenId: number): Observable<Array<AlmacenProducto>> {
    const params = `?almacenId=${almacenId}&pagina=${environment.indexDefault}&tamanio=${environment.sizeDefault}`;
    return this.consume.httpGet(Endpoints.inventories.host + Endpoints.inventories.productAlmacen + params);
    // return of(testProducts);
  }

  postMovimiento(body: PostMovimientos): Observable<any> {
    console.log(body);
    return this.consume.httpPost(Endpoints.inventories.host + Endpoints.inventories.postMovimiento, body);
  }

  acceptCancelRequest(type: number, idRequest: number): Observable<any> {
    const params = `?idMovimiento=${idRequest}&estatus=${type}`;
    return this.consume.httpPut(Endpoints.inventories.host + Endpoints.inventories.acceptCancel + params, {});
    // return of(testProducts);
  }

  getClientsByName(name: string): Observable<Array<Cliente>> {
    const params = `?nombre=${name}&pagina=${environment.indexDefault}&tamanio=${environment.sizeDefault}`;
    return this.consume.httpGet(Endpoints.catalogos.host + Endpoints.catalogos.clientes + params);
    // return of([
    //   {
    //     id: 1,
    //     nombre: 'test',
    //     almacenId: 5
    //   },
    //   {
    //     id: 2,
    //     nombre: 'otro',
    //     almacenId: 4
    //   }
    // ]);
  }
}
