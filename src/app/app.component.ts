import {AfterContentChecked, ChangeDetectorRef, Component} from '@angular/core';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfig } from './constants/app-config';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  now = new Date();
  isLoading: Observable<boolean>;
  theme = environment.theme;
  isReload = false;
  userIsAuthenticated: Observable<boolean>;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    // private matIcon: MatIconRegistry,
    private changeDetector: ChangeDetectorRef,
    private dom: DomSanitizer,
    private route: Router
  ) {
    this.isLoading = this.dataService.getIsLoading();
    this.translate.setDefaultLang('es');
    this.userIsAuthenticated = this.dataService.getIsLogged();

    const body = document.body;
    body.setAttribute('class', environment.theme);

    this.dataService
      .getGeneralNotificationMessage()
      .subscribe(msg => {
        this.snackBar.open(msg, 'OK', {
          duration: AppConfig.generalMessageTimeout
        });
      });
  }

  showMenu(): boolean {
    return this.route.url !== '/login';
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }

  // private setupCustomIcons(): void {
  //   this.matIcon.addSvgIcon('mex', this.dom.bypassSecurityTrustResourceUrl('./assets/img/lang/mex.svg'));
  //   this.matIcon.addSvgIcon('usa', this.dom.bypassSecurityTrustResourceUrl('./assets/img/lang/usa.svg'));
  // }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
