import {Component, OnInit} from '@angular/core';
import {Session} from "../../../../interface/session";
import {AuthService} from "../../../../service/auth.service";
import {NgForm} from "@angular/forms";
import {UserService} from "../../../../service/user.service";
import {User} from "../../../../interface/user";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  session: Session;
  user: User;
  responseMessageOk: string;
  responseMessageError: string;
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.getSession();
  }

  getSession(): void {
    this.authService.getSession().subscribe({
      next: (session) => this.session = session,
      error: err => console.error(err),
    })
  }

  getVerify(payload: object): void {
    this.authService.verify(payload).subscribe({
      next: () => this.responseMessageOk = 'update success',
      error: () => this.responseMessageError = 'update failed'
    })
  }

  onSubmit(changePasswordForm: NgForm) {
    console.log(changePasswordForm.value)
    const { oldPassword, newPassword } = changePasswordForm.value;
    const payload = { id: this.session.id, password: oldPassword };
    this.authService.verify(payload).subscribe({
      next: (message) => {
        this.responseMessageOk = message.msg;
        this.userService.updateById(this.session.id, {password: newPassword}).subscribe({
          next: (_) => this.user = _
        })
      },
      error: (err) => {
        this.responseMessageError = err.msg;
      }
    })
  }


}
