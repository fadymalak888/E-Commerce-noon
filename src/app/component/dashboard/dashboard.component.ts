import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  GainBySelected:string = 'last Week'
  constructor() { }

  ngOnInit(): void {
  }

  getGain(GainBy:string){
this.GainBySelected = GainBy;
  }
}
