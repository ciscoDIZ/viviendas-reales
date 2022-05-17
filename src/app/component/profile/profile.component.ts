import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Session} from "../../interface/session";
import {UserService} from "../../service/user.service";
import {User} from "../../interface/user";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  session: Session;
  user: User;
  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSession();
    this.getUser();
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
}
