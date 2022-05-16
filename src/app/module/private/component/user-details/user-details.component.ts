import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../service/user.service";
import {AuthService} from "../../../../service/auth.service";
import {User} from "../../../../interface/user";
import {Session} from "../../../../interface/session";

@Component({
  selector: 'private-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  session: Session;
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getSession().subscribe(session => this.session = session);
    if (this.session) {
      this.getUser();
    }
  }
  getUser(): void {
    this.userService.getById(this.session.id).subscribe({
      next: (user) => this.user = user,
    })
  }
}
