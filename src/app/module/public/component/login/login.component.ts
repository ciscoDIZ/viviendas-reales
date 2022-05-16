import { Component, OnInit } from '@angular/core';
import {Login} from "../../../../interface/login";
import {AuthService} from "../../../../service/auth.service";

import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'public-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login;
  errorMessage: string | undefined;
  constructor(
    private loginService: AuthService,
    private router: Router
  ) {}


  ngOnInit(): void {

  }


  onSubmit(loginForm: NgForm) {
    this.loginService.singIn(<Login>{ payload: loginForm.value })
      .subscribe(
        {
          next: authenticatedUser => {
            sessionStorage.setItem('session', JSON.stringify(authenticatedUser));
            this.router.navigate(['/dashboard'])
              .then(() => window.location.reload())
          },
          error: (err) => this.errorMessage = err.error.message
        }
      );
  }
}
