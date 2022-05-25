import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Housing} from "../../interface/housing";
import {HousingService} from "../../service/housing.service";
import {Session} from "../../interface/session";
import {AuthService} from "../../service/auth.service";
import {Image} from "../../interface/image";

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
    this.authService.getSession().subscribe({next: session => this.session = session})
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

  onLike(session: Session): void {
    if (this.housing.likes.map(m => m.toString()).find(f => f === session.id)) {
      this.removeLike();
      return;
    }
    this.addLike();
  }

  addLike(): void {
    this.housingService.sendLike(this.housing.id).subscribe({
      next: (housing) => {
        this.housing = housing;
      },
      error: response => console.error(response.error.message)
    })
  }
  removeLike(): void {
    this.housingService.sendDislike(this.housing.id).subscribe({
      next: (housing) => {
        this.housing = housing;
      },
      error: response => console.error(response.error.message)
    })
  }

  isSessionLike(session: Session) {
    if (session){
      return !!this.housing.likes.find(user => user == session.id);
    }
    return false;
  }
}
