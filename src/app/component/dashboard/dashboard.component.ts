import { Component, OnInit } from '@angular/core';

import {Session} from "../../interface/session";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  session: Session;
  privateRoute: string;
  publicRoute: string;
  private readonly componentRoute: string = 'housing/details/';
  constructor() {
    this.privateRoute = `/private/${this.componentRoute}`;
    this.publicRoute = `/public/${this.componentRoute}`;
  }
  ngOnInit(): void {
  }

}
