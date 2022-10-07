import { MAT_DATE_LOCALE } from '@angular/material/esm2015';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './utils/token.interceptor';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {getSpanishPaginatorIntl} from './constants/spanish-paginator-intl';
import {MatDatepickerModule} from '@angular/material/datepicker';

export const APP_PROVIDERS = [
  MatDatepickerModule,
  { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
];
