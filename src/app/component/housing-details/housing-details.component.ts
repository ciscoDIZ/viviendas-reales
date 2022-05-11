import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Housing} from "../../interface/housing";
import {HousingService} from "../../service/housing.service";

@Component({
  selector: 'app-housing-details',
  templateUrl: './housing-details.component.html',
  styleUrls: ['./housing-details.component.scss']
})
export class HousingDetailsComponent implements OnInit {

  housing: Housing
  constructor(private activatedRoute: ActivatedRoute, private housingService: HousingService) { }

  ngOnInit(): void {
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
}
