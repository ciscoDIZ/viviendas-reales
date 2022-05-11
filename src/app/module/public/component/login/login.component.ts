import { Component, OnInit } from '@angular/core';
import {ActivatedUser} from "../../../../interface/activated-user";
import {Login} from "../../../../interface/login";
import {AuthService} from "../../../../service/auth.service";

import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'public-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login;
  activatedUser: ActivatedUser;
  errorMessage: string | undefined;
  constructor(
    private loginService: AuthService,
    private jwtHelperService: JwtHelperService,
    private router: Router
  ) {
    this.login = {
      payload:{
        email: '',
        password: ''
      }

    };
  }

  ngOnInit(): void {

  }
  onSubmit(): void {
    this.loginService.singIn(this.login).pipe().subscribe(
      ($data) => {
        console.log($data)
        this.activatedUser = this.jwtHelperService.decodeToken<ActivatedUser>($data.token);
        sessionStorage.setItem('session', JSON.stringify(this.activatedUser));
        this.router.navigate(['private/dashboard']).then(() => window.location.reload())
      }
    )

  }

}
