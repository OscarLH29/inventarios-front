import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {RoutesMenu} from '../../constants/app-config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  routesMenu = RoutesMenu;

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  backClicked(): void {
    this.location.back();
  }

  isActive(route): boolean {
    return route === this.router.url;
  }

  isProductIndv(): boolean {
    return this.router.url === '/producto';
  }

}
