import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Session} from "../../interface/session";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import { User } from '../../interface/user';
import {UserService} from "../../service/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
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
  privateRouteProfile: string;
  privateRouteNewRent: string;
  privateRouteMyRents: string;
  profileRoute: string;
  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    this.navbarSupportedContent = 'navbarSupportedContent';
    this.dashboardRoute = '/dashboard';
    this.authService.getSession().subscribe({next: session => this.session = session});
    this.publicLoginRoute = `${this.publicSection}/login`;
    this.publicRegisterRoute = `${this.publicSection}/register`;
    this.privateRouteProfile = (this.session) ?`${this.privateSection}/user/profile/me/${this.session.id}` : '';
    this.privateRouteNewRent = `${this.privateSection}/housing/create`;
    this.privateRouteMyRents = `${this.privateSection}/housing/me`
    this.profileRoute = (this.session) ? `/user/profile/${this.session.id}` : '';
    this.housingsRoute = `/housing`

  }

  ngOnInit(): void {
    this.subscription = this.authService.currentSession.subscribe({next: (session) => this.session = session});
    this.authService.getSession().subscribe($data => this.session = $data);
    if (this.session) {
      this.getUser();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getUser(): void {
    this.userService.getById(this.session.id).subscribe(user => this.user = user);
  }

  endSession() {
    this.authService.logOut();
    this.router.navigate(['/public/login']).then(() => window.location.reload());
    this.session = null;
  }
}
