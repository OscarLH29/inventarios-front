import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { ILoginReq } from 'src/app/model/http/security.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';
import {User} from '../../model/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private dataService: DataService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // TEST ONLY
    this.dataService.setIsLogged(false);
    this.formLogin.get('username').setValue('oscar.lopez@axity.com');
    this.formLogin.get('password').setValue('C15c0ax1ty2022');
  }

  ngOnInit(): void { }

  login(): void {
    const data: ILoginReq = {
      userName: this.formLogin.value.username,
      password: this.securityService.utf8_to_b64(this.formLogin.value.password),
      systemCode: environment.systemCode,
      newPassword: ''
    };

    this.securityService.login(data).subscribe(res => {
      this.user = res;
      this.getAlmacen(this.user.id);
    }, err => {
      this.dataService.setGeneralNotificationMessage(err);
      this.dataService.setIsLogged(false);
    }
    );
  }

  getAlmacen(id): void {
    this.securityService.getAlmacenUser(id).subscribe(res => {
      this.user.almacenId = res;
      this.dataService.setToken(this.user.dsEmail);
      this.dataService.setUser(this.user);
      this.dataService.setIsLogged(true);
      this.router.navigate(['inventario']);
    }, err => {
      this.dataService.setGeneralNotificationMessage(err);
      this.dataService.setIsLogged(false);
    });
  }
}
