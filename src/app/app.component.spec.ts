import { TestBed, async, inject, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MATERIAL_COMPONENTS } from './app.material';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_PROVIDERS } from './app.providers';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DataService } from './services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let matIcon: MatIconRegistry;
  let translate: TranslateService;
  let dataService: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MATERIAL_COMPONENTS,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => {
              return new TranslateHttpLoader(http);
            },
            deps: [HttpClient]
          }
        }),
      ],
      providers: [
        APP_PROVIDERS
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    matIcon = TestBed.inject(MatIconRegistry);
    translate = TestBed.inject(TranslateService);
    dataService = TestBed.inject(DataService);
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'inventories-app'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('inventories-app');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('inventories-app');
  });

  it('should setup custom icons', (done) => {
    const app = fixture.debugElement.componentInstance;
    app.setupCustomIcons();
    fixture.whenStable().then(() => {
      matIcon.getNamedSvgIcon('mex').subscribe(res => {
        expect(res).toBeDefined();
        done();
      });
    });
  });

  it('should change language', (done) => {
    const app = fixture.debugElement.componentInstance;
    app.changeLanguage('en');
    translate.get('language.en').subscribe(res => {
      expect(res).toBe('English');
      done();
    });
  });
});
