import { Component, OnInit } from '@angular/core';

import {Session} from "../../interface/session";
import {HousingService} from "../../service/housing.service";
import {Paginate} from "../../interface/paginate";
import {Housing} from "../../interface/housing";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../interface/user";
import {UserService} from "../../service/user.service";

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
  housings: Housing[];
  users: User[];
  constructor(private housingService: HousingService, private userService: UserService, config: NgbCarouselConfig) {
    this.privateRoute = `/private/${this.componentRoute}`;
    this.publicRoute = `/public/${this.componentRoute}`;
    config.interval = 20000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }
  ngOnInit(): void {
    this.housingService.getAll().subscribe({
      next: (housing) => this.housings = housing.list,
      error: response => console.error(response.error.message)
    });
    this.userService.getAll().subscribe({
      next: (users) => {
        console.log(users)
        this.users = users
          .sort((a, b) => b.housings.length - a.housings.length)
          .splice(0, 4)
      }
    });
  }
}
