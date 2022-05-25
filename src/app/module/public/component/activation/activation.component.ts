import {Component, Input, OnInit} from '@angular/core';
import {ActivatedUser} from "../../../../interface/activated-user";
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import {GetUser} from "../../../../interface/get-user";



@Component({
  selector: 'public-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {

  activatedUser: ActivatedUser;
  @Input()
  user: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.activatedUser = {
      token: ''
    };
  }

  activation(): void {

    this.authService.activate(this.user).subscribe($data => {
      this.activatedUser = $data
      sessionStorage.setItem('session', JSON.stringify({token: this.activatedUser.token}))
      this.router
        .navigate(['/dashboard'])
        .then(() => window.location.reload());
    });

  }
  ngOnInit(): void {
  }

}
