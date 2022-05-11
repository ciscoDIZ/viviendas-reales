import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Session} from "../../interface/session";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  session: Session;
  navbarSupportedContent: string;
  constructor(private authService: AuthService, private router: Router) {
    this.navbarSupportedContent = 'navbarSupportedContent'
  }

  ngOnInit(): void {
    this.session = this.authService.getSession()
  }



  endSession() {
    this.authService.logOut();
    this.session = null;
    this.router.navigate(['/public/dashboard']).then(() => window.location.reload());
  }
}
