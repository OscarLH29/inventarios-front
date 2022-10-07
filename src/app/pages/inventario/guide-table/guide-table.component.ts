import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide-table',
  templateUrl: './guide-table.component.html',
  styleUrls: ['./guide-table.component.scss']
})
export class GuideTableComponent implements OnInit {
  showList = false;

  constructor() { }

  ngOnInit(): void {
  }

  showGuide(): void {
    this.showList = !this.showList;
  }

}
