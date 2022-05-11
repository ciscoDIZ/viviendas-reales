import { Component, OnInit } from '@angular/core';
import {Session} from "../../interface/session";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  session: Session;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.session = this.authService.getSession()
  }

  endSession() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
