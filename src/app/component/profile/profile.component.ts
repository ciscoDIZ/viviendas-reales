import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Session} from "../../interface/session";
import {UserService} from "../../service/user.service";
import {User} from "../../interface/user";
import {ActivatedRoute} from "@angular/router";
import {HousingService} from "../../service/housing.service";
import {Housing} from "../../interface/housing";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  session: Session;
  user: User;
  housings: Housing[];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {
  }

  ngOnInit(): void {
    this.getSession();
    this.getUser();
    this.getHousings();
  }

  getSession(): void {
    this.authService.getSession().subscribe({next: session => this.session = session});
  }

  getUser(): void {
    const id = this.route.snapshot.params['id'];
    this.userService.getById(id).subscribe({
      next: (user) => this.user = user,
      error: (response) => console.error(response.error.message)
    });
  }

  getHousings() {
    const owner = this.route.snapshot.params['id'];
   this.housingService.getByOwner(owner, 1, 4).subscribe({
     next: (housings) => this.housings = housings.list
   })
  }
}
