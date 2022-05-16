import { Component, Input, OnInit } from '@angular/core';
import {Session} from "../../interface/session";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import { User } from '../../interface/user';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  session: Session;
  user: User;
  navbarSupportedContent: string;
  dashboardRoute: string;
  publicLoginRoute: string;
  publicRegisterRoute: string;
  housingsRoute: string;

  private readonly privateSection = '/private';
  private readonly publicSection = `/public`;


  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    this.navbarSupportedContent = 'navbarSupportedContent';
    this.dashboardRoute = `/`;
    this.publicLoginRoute = `${this.publicSection}/login`;
    this.publicRegisterRoute = `${this.publicSection}/register`;
    this.housingsRoute = `/housing`

  }

  ngOnInit(): void {
    this.authService.getSession().subscribe($data => this.session = $data);
    if (this.session) {
      this.getUser();
    }
  }


  getUser(): void {
    this.userService.getById(this.session.id).subscribe(user => this.user = user);
  }

  endSession() {
    this.authService.logOut();
    this.session = null;
    this.router.navigate(['/public/dashboard']).then(() => window.location.reload());
  }
}
