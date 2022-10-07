import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_COMPONENTS } from './app.material';
import { APP_PROVIDERS } from './app.providers';
import { LogoutComponent } from './components/logout/logout.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MenuComponent } from './components/menu/menu.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { TransferProductComponent } from './components/modals/transfer-product/transfer-product.component';
import { RestoreProductComponent } from './components/modals/restore-product/restore-product.component';
import { ExitProductComponent } from './components/modals/exit-product/exit-product.component';
import {SharedModule} from './pages/shared/shared.module';
import {ConfirmActionComponent} from './components/modals/confirm-action/confirm-action.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    MenuComponent,
    TransferProductComponent,
    RestoreProductComponent,
    ExitProductComponent,
    ConfirmActionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
      }
    }),
    MATERIAL_COMPONENTS,
    MatTooltipModule,
    SharedModule
  ],
  providers: [
    APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
