import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {MovimientosRep} from '../model/interfaces/interfaces';
import {testsMovimients} from '../../mocks/productos-test';
import {ConsumeService} from './consume.service';
import {Endpoints} from '../../environments/endpoints';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private consume: ConsumeService) { }

  getMovimients(start: string, end: string, almacenId: number): Observable<Array<MovimientosRep>> {
    const params = `?almacenId=${almacenId}&fechaFin=${end}&fechaInicio=${start}&pagina=${environment.indexDefault}&tamanio=${environment.sizeDefault}`;
    return this.consume.httpGet(Endpoints.inventories.host + Endpoints.inventories.reportesMov + params);
    // return of(testsMovimients);
  }

  getMovimientsByWors(almacenId, text): Observable<Array<MovimientosRep>> {
    const params = `?almacenId=${almacenId}&pagina=${environment.indexDefault}&tamanio=${environment.sizeDefault}&texto=${text}`;
    return this.consume.httpGet(Endpoints.inventories.host + Endpoints.inventories.reportesMovByWord + encodeURIComponent(params));
    // return of(testsMovimients);
  }
}
