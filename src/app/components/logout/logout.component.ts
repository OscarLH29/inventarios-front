import { Component } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private dataService: DataService) { }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.dataService.setUser(null);
    this.dataService.setIsLogged(false);
  }

}
