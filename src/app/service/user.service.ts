import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostUser} from "../interface/post-user";
import {Observable} from "rxjs";
import {GetUser} from "../interface/get-user";
import {CreatedUser} from "../interface/created-user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiBase: string = 'http://localhost:5000/api/user'
  constructor(private http: HttpClient) { }

  create(user: PostUser): Observable<CreatedUser> {
    return this.http.post<CreatedUser>(this.apiBase, user)
  }

}
