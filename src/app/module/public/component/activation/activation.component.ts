import {Component, Input, OnInit} from '@angular/core';
import {ActivatedUser} from "../../../../interface/activated-user";
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";



@Component({
  selector: 'public-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  @Input()
  activationUri: string;
  activatedUser: ActivatedUser;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.activatedUser = {
      token: ''
    };
  }

  activation(): void {
    console.log(this.activationUri)
    this.authService.activate(this.activationUri).subscribe($data => {
      this.activatedUser = $data
      console.log(this.activatedUser)
      sessionStorage.setItem('session', JSON.stringify({token: this.activatedUser.token}))
      this.router
        .navigate(['/dashboard'])
        .then(() => window.location.reload());
    });

  }

  ngOnInit(): void {
  }

}
