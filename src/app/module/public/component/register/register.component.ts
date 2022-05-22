import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {PostUser} from "../../../../interface/post-user";
import {UserService} from "../../../../service/user.service";
import {CreatedUser} from "../../../../interface/created-user";
@Component({
  selector: 'public-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  getUser: CreatedUser;
  constructor(private userService: UserService) {
    this.form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        residence: new FormControl('', []),
        password: new FormControl('', [Validators.required]),
        rePassword: new FormControl('', [Validators.required])
      }
    );
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { name, surname, email, password, rePassword, residence } = this.form.value;
    if (password != rePassword) {
      return;
    }
    const user: PostUser = {name,surname,email,password, residence};
    this.userService.create(user).subscribe($data => {
      this.getUser = $data
    });
  }
}
