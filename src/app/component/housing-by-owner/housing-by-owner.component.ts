import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Route} from "@angular/router";
import {HousingService} from "../../service/housing.service";
import {Paginate} from "../../interface/paginate";
import {Housing} from "../../interface/housing";
import {UserService} from "../../service/user.service";
import {User} from "../../interface/user";

@Component({
  selector: 'app-housing-by-owner',
  templateUrl: './housing-by-owner.component.html',
  styleUrls: ['./housing-by-owner.component.scss']
})
export class HousingByOwnerComponent implements OnInit {
  housings: Paginate<Housing>;
  page: number;
  pageSize: number;
  total: number;
  owner: User;


  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService,
    private userService: UserService
  ) { this.page = 1; }

  ngOnInit(): void {
    const owner = this.route.snapshot.params['owner'];
    this.userService.getById(owner).subscribe({
      next: (user) => this.owner = user
    });
    this.housingService.getByOwner(owner).subscribe({
      next: (housings) => {
        this.housings = housings;
        this.total = this.housings.pagination.total;
        this.pageSize = this.housings.pagination.limit;
      }
    });

  }

  pageChanged($event: number) {
    if (!$event) {
      $event = 1;
    }
    this.page = $event;
    this.housingService
      .getByOwner(this.owner.id, this.page)
      .subscribe(
        {
        next: housings => this.housings = housings
      }
    );
  }
}
