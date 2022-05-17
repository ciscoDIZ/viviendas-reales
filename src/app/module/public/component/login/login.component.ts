import {Component, OnDestroy, OnInit} from '@angular/core';
import {Login} from "../../../../interface/login";
import {AuthService} from "../../../../service/auth.service";

import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Location} from "@angular/common";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Session} from "../../../../interface/session";

@Component({
  selector: 'public-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  login: Login;
  errorMessage: string | undefined;
  subscription: Subscription;
  private session: Session;
  constructor(
    private loginService: AuthService,
    private location: Location,
    private route: Router
  ) {}


  ngOnInit(): void {
    this.subscription = this.loginService.currentSession.subscribe({next:session => this.session = session})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sendSession() {


  }
  onSubmit(loginForm: NgForm) {
    this.loginService.singIn(<Login>{ payload: loginForm.value })
      .subscribe(
        {
          next: authenticatedUser => {
            sessionStorage.setItem('session', JSON.stringify(authenticatedUser));
            this.loginService.getSession().subscribe({
              next: (session) => {

                this.loginService.sendSession(session);
                this.route.navigate([`/private/user/profile/me/${session.id}`]).then(() => window.location.reload());
              }
            })

          },
          error: (err) => this.errorMessage = err.error.message
        }
      );
  }
}
