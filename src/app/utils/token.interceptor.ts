import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

import { Messages } from '../constants/messages';
import { DataService } from '../services/data.service';
import { TokenExcludedEndpoints } from 'src/environments/endpoints';
import { AppConfig } from '../constants/app-config';
import {User} from '../model/interfaces/interfaces';

const DEFAULT_TIMEOUT = 30000;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  user: User;
  isLogged: boolean;
  constructor(private data: DataService) {
    this.data.getIsLogged().subscribe(user => this.isLogged = user);
  }

  private applyCredentials = (req: HttpRequest<any>) => {
    // const token = this.data.getToken()
    this.user = this.data.getUser();
    if (!this.isLogged) {
      this.data.ifReload(true);
      return req;
    } else {
      if (!this.endpointExcluded(req.url)) { // token &&
        // req = req.clone({ headers: req.headers.append('token', token) });
        req = req.clone({ headers: req.headers.append('usuario', this.user.id.toString()) });
      }
      return req;
    }
  }

  private endpointExcluded(url: string): boolean {
    const excluded = TokenExcludedEndpoints.find(endpoint => {
      return url.includes(endpoint);
    }) || [];
    return excluded.length > 0;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = this.applyCredentials(req);

    return next.handle(authReq).pipe(
      timeout(AppConfig.httpTimeout || DEFAULT_TIMEOUT),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          return throwError(Messages.timeout);
        }
        if (error instanceof HttpErrorResponse) {
          return throwError(error.error.message || error.message || Messages.generic);
        } else {
          return throwError(error);
        }
      })
    );
  }
}
