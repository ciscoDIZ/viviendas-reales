import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login} from "../interface/login";
import {catchError, Observable} from "rxjs";
import {Session} from "../interface/session";
import {ActivatedUser} from "../interface/activated-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUri: string;
  constructor(private http: HttpClient) {
    this.baseUri = 'http://localhost:5000/api/auth';
  }

  singIn(login: Login): Observable<ActivatedUser> {
      return this.http.patch<ActivatedUser>(`${this.baseUri}`, login);
  }

  activate(uri: string): Observable<ActivatedUser> {
    return this.http.patch<ActivatedUser>(uri, {});
  }

  logOut(): void {
    sessionStorage.removeItem('session');
  }

  getSession(): Session {
    return JSON.parse(sessionStorage.getItem('session'));
  }
}
