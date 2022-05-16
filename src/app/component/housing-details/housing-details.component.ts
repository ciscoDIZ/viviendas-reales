import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Housing} from "../../interface/housing";
import {HousingService} from "../../service/housing.service";
import {Session} from "../../interface/session";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-housing-details',
  templateUrl: './housing-details.component.html',
  styleUrls: ['./housing-details.component.scss']
})
export class HousingDetailsComponent implements OnInit {
  session: Session;
  housing: Housing
  showMore: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private housingService: HousingService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getSession().subscribe($data => this.session = $data);
    this.getHousing();
    console.log(this.housing);
  }

  getHousing() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.housingService.getById(id).subscribe($data=> {
      this.housing = $data
      console.log(this.housing)
    });

  }

  toggleShow(): void {
    this.showMore = !this.showMore;
  }
}
