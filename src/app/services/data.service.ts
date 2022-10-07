import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AlmacenProducto, Producto, User} from '../model/interfaces/interfaces';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private isLoading = new Subject<boolean>();
  private product = new Subject<any>();
  private isLogged = new Subject<boolean>();
  private generalNotificationMessage = new Subject<string>();

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ifReload(reload): void {
    if (reload) {
      this.router.navigate(['login']);
    }
  }

  setIsLoading(loading: boolean): void {
    this.isLoading.next(loading);
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setProduct(product: AlmacenProducto): void {
    this.product.next(product);
  }

  getProduct(): Observable<Producto> {
    return this.product.asObservable();
  }

  getGeneralNotificationMessage(): Observable<string> {
    return this.generalNotificationMessage.asObservable();
  }

  setGeneralNotificationMessage(msg: string): void {
    this.generalNotificationMessage.next(msg);
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  removeToken(): void {
    sessionStorage.removeItem('token');
  }

  userIsAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  setIsLogged(status): void {
    this.isLogged.next(status);
  }

  getIsLogged(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  openDialog(dialog: any, config): MatDialogRef<any> {
    return this.dialog.open(dialog.component, config);
  }

  getUser(): User {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  setUser(user: any): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  removeUser(): void {
    sessionStorage.removeItem('user');
  }

  getMonthActually(): { primerDia: Date; ultimoDia: Date } {
    const date = new Date();
    return {
      primerDia: new Date(date.getFullYear(), date.getMonth(), 1),
      ultimoDia: new Date(date.getFullYear(), date.getMonth() + 1, 0)
    };
  }
}
