import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";

import {Housing} from "../../interface/housing";
import {Session} from "../../interface/session";
import {Router} from "@angular/router";
import {HousingService} from "../../service/housing.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  housings: Housing[];
  session: Session;
  constructor(private housingService: HousingService, private router: Router, private location: Location) {
  }
  ngOnInit(): void {
    this.session = JSON.parse(sessionStorage.getItem('session'));
    const path = this.location.path(false);
    const pathBase = path.substring(1).split('/')[0];
    console.log(this.router.routerState)
    if (this.session && pathBase == 'public') {
      this.router.navigate(['private'])
    }else if (pathBase == 'public') {
      this.housingService.getAll().subscribe($data => this.housings = $data.list);
    }else {
      const { id } = this.session;
      this.housingService.getByOwner(id).subscribe($data => this.housings = $data.list)
    }
  }
}
