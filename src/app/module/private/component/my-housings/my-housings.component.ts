import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {HousingService} from "../../../../service/housing.service";
import {Session} from "../../../../interface/session";
import {Paginate} from "../../../../interface/paginate";
import {Housing} from "../../../../interface/housing";

@Component({
  selector: 'private-my-housings',
  templateUrl: './my-housings.component.html',
  styleUrls: ['./my-housings.component.scss']
})
export class MyHousingsComponent implements OnInit {
  session: Session;
  paginatedHousings: Paginate<Housing>;
  constructor(
    private authService: AuthService,
    private housingService: HousingService,
  ) { }

  ngOnInit(): void {
    this.authService
      .getSession()
      .subscribe($data => this.session = $data);
    this.getHousings();
  }

  getHousings(): void {
    this.housingService
      .getByOwner(this.session.id)
      .subscribe($data => this.paginatedHousings = $data);
  }

  removeHousing(id: string): void {
    this.housingService.deleteById(id).subscribe({
      next: () => window.location.reload(),
      error: (err) => console.error(err)
    })
  }
}
