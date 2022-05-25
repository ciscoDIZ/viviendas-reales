import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PostUser} from "../interface/post-user";
import {Observable} from "rxjs";

import {CreatedUser} from "../interface/created-user";
import {User} from "../interface/user";
import {AuthService} from "./auth.service";
import {Paginate} from "../interface/paginate";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiBase: string=`${environment.apiUri}/user`
  constructor(private http: HttpClient, private authService: AuthService) { }

  create(user: PostUser): Observable<CreatedUser> {
    return this.http.post<CreatedUser>(this.apiBase, user)
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiBase}/${id}`)
  }

  updateById(id: string, user: any): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    console.log(headers.get('authorization'))
    const options = { headers }
    return this.http.put<User>(`${this.apiBase}/${id}`, user, options);
  }

  updateAvatar(id, multipart: FormData): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const options = { headers };
    return this.http.patch<User>(`${this.apiBase}/${id}`, multipart, options);
  }

  getAll(pagination = false): Observable<User[]> {
    return this.http.get<User[]>(this.apiBase)
  }
}
