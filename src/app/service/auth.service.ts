import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Login} from "../interface/login";
import { Observable} from "rxjs";
import {Session} from "../interface/session";
import {ActivatedUser} from "../interface/activated-user";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ResponseMsg} from "../interface/response-msg";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUri: string;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
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

  getSession(): Observable<Session> {
    return new Observable(
      (observer) => observer.next(
        this.jwtHelper
          .decodeToken<Session>(sessionStorage.getItem('session'))
      )
    );
  }

  getToken(): string {
    return JSON.parse(sessionStorage.getItem('session')).token;
  }

  verify(payload: object): Observable<ResponseMsg> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
    });
    const options = { headers };
    console.log(headers.get('Authorization'))
    return this.http.put<ResponseMsg>(this.baseUri, payload, options);
  }
}
