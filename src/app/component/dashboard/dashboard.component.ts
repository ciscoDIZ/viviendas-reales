import { Component, OnInit } from '@angular/core';

import {Housing} from "../../interface/housing";
import {Session} from "../../interface/session";
import {HousingService} from "../../service/housing.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  housings: Housing[];
  session: Session;
  privateRoute: string;
  publicRoute: string;
  private readonly componentRoute: string = 'housing/details/';
  constructor(private housingService: HousingService) {
    this.privateRoute = `/private/${this.componentRoute}`;
    this.publicRoute = `/public/${this.componentRoute}`;
  }
  ngOnInit(): void {
    this.getContent();
  }

  private getContent() {
    this.session = JSON.parse(sessionStorage.getItem('session'));
    if (!this.session) {
      this.housingService.getAll().subscribe($data => this.housings = $data.list);
      return;
    }
    const { id } = this.session;
    this.housingService.getByOwner(id).subscribe($data => this.housings = $data.list);
  }
}
