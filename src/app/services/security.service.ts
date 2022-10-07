import { Injectable } from '@angular/core';
import { Endpoints } from 'src/environments/endpoints';
import { ILoginRes, ILoginReq } from '../model/http/security.model';
import {Observable, of} from 'rxjs';
import { ConsumeService } from './consume.service';
import {HttpHeaders} from '@angular/common/http';
import {User} from '../model/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Content-Type': 'application/json'
  });

  constructor(private consume: ConsumeService) { }

  utf8_to_b64(str): string {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  // b64_to_utf8(str): string {
  //   return decodeURIComponent(escape(window.atob(str)));
  // }

  login(req: ILoginReq): Observable<User> {
    return this.consume.httpPost(Endpoints.security.host + Endpoints.security.login, req);
  }

  getAlmacenUser(id: number): Observable<any> {
    const params = `?cliente=${id}&rol=2`;
    return this.consume.httpGet(Endpoints.catalogos.host + Endpoints.catalogos.almacenByUser + params);
    // return of(1);
  }
}
