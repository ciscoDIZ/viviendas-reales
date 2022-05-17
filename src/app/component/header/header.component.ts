import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Session} from "../../interface/session";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import { User } from '../../interface/user';
import {UserService} from "../../service/user.service";
import {Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {Login} from "../../interface/login";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
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

  login: Login;
  @Input()
  modal: any;
  errorMessage: string | undefined;
  @Output()
  private currentSession: EventEmitter<Session>;


  constructor(private loginService: AuthService, private router: Router, private userService: UserService, private modalService: NgbModal) {
    this.navbarSupportedContent = 'navbarSupportedContent';
    this.dashboardRoute = '/dashboard';
    this.loginService.getSession().subscribe({next: session => this.session = session});
    this.publicLoginRoute = `${this.publicSection}/login`;
    this.publicRegisterRoute = `${this.publicSection}/register`;
    this.privateRouteProfile = (this.session) ?`${this.privateSection}/user/profile/me/${this.session.id}` : '';
    this.privateRouteNewRent = `${this.privateSection}/housing/create`;
    this.privateRouteMyRents = `${this.privateSection}/housing/me`
    this.profileRoute = (this.session) ? `/user/profile/${this.session.id}` : '';
    this.housingsRoute = `/housing`

  }

  ngOnInit(): void {

    this.loginService.getSession().subscribe($data => {
      if ($data) {
        this.getUser();
      }
    });

  }


  getUser(): void {
    this.userService.getById(this.session.id).subscribe(user => this.user = user);
  }

  endSession() {
    this.loginService.logOut();
    this.session = null;
    window.location.reload();

  }

  openModal(modal) {
    this.modalService.open(modal)
  }

  close(modal) {
    modal.close();
  }

  onSubmit(loginForm: NgForm, modal) {

    this.loginService.singIn(<Login>{ payload: loginForm.value })
      .subscribe(
        {
          next: authenticatedUser => {
            sessionStorage.setItem('session', JSON.stringify(authenticatedUser));
            this.loginService.getSession().subscribe({
              next: (session) => {
                this.session = session
                this.getUser();
                this.errorMessage = '';
                modal.close()

              }
            })

          },
          error: (err) => this.errorMessage = err.error.message
        }
      );
  }
}
