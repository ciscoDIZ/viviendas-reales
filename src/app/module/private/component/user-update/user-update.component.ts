import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../service/user.service";
import {User} from "../../../../interface/user";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'private-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  @Input()
  user: User
  isEditable: boolean = false;
  multipart: FormData;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(userForm: NgForm) {
    this.userService
      .updateById(this.user.id, userForm.value)
      .subscribe({ next:  user => {
          this.user = user;
          if (this.multipart) {
            this.userService.updateAvatar(this.user.id, this.multipart).subscribe({
              next: (user) => {
                this.user = user;
                window.location.reload();
              }
            });
          }
        },
        error: err => console.error(err)
      });
    this.toggleEditable();
  }

  toggleEditable(): void {
    this.isEditable = !this.isEditable;
  }

  upload($event) {
    this.multipart = new FormData();
    this.multipart.append('file', $event.target.files[0]);
  }
}
