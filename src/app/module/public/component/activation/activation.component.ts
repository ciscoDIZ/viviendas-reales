import {Component, Input, OnInit} from '@angular/core';
import {ActivatedUser} from "../../../../interface/activated-user";
import {Session} from "../../../../interface/session";
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'public-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  @Input()
  activationUri: string;
  activatedUser: ActivatedUser;
  loggedUser: Session;

  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelperService: JwtHelperService
  ) {
    this.activatedUser = {
      token: ''
    };
  }

  activation(): void {
    this.authService.activate(this.activationUri).subscribe($data => this.activatedUser = $data);
    this.loggedUser = this.jwtHelperService.decodeToken<Session>(this.activatedUser.token);
    sessionStorage.setItem('session', JSON.stringify(this.loggedUser));
    this.router.navigate(['private/dashboard'])
  }

  ngOnInit(): void {
  }

}
