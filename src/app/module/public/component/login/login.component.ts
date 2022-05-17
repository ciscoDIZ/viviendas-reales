import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
export class LoginComponent implements OnInit {

  login: Login;
  @Input()
  modal: HTMLDivElement;
  errorMessage: string | undefined;
  @Output()
  private currentSession: EventEmitter<Session>;
  private session: Session;
  constructor(
    private loginService: AuthService,
    private location: Location,
    private route: Router,
  ) {
    this.currentSession = new EventEmitter<Session>();
  }


  ngOnInit(): void {
  }


  sendSession() {


  }
  onSubmit(loginForm: NgForm) {

  this.modal.addEventListener('show.bs.modal', function (event) {
    console.log(event.target);
  });
    this.loginService.singIn(<Login>{ payload: loginForm.value })
      .subscribe(
        {
          next: authenticatedUser => {
            sessionStorage.setItem('session', JSON.stringify(authenticatedUser));
            this.loginService.getSession().subscribe({
              next: (session) => {
                debugger;
                this.currentSession.emit(session);
                this.modal.setAttribute('data-dismiss', 'modal');
                // @ts-ignore
                console.log(this.modal.hide())
              }
            })

          },
          error: (err) => this.errorMessage = err.error.message
        }
      );
  }
}
