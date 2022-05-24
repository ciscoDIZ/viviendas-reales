import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Paginate} from "../interface/paginate";
import {Comment} from "../interface/comment";
import {AuthService} from "./auth.service";
import {PostComment} from "../interface/post-comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiBase: string = 'https://auth-api-express-nodejs.herokuapp.com/api/comment'
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(query: any): Observable<Paginate<Comment>> {
    const querySegment = (query.housing) ? `?housing=${query.housing}` :
      (query.image) ? `?image=${query.image}` : query.author ? `?author=${query.author}`: query;
    return this.http.get<Paginate<Comment>>(`${this.apiBase}${querySegment}`)
  }

  save(comment: PostComment): Observable<Comment> {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.authService.getToken()}`});
    const options = { headers };
    return this.http.post<Comment>(this.apiBase, comment, options);
  }

  sendLike(id: string): Observable<Comment> {

    let observable: Observable<Comment>;
    this.authService.getSession().subscribe({
      next: (session) => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.authService.getToken()}`
        });
        const options = { headers };
        observable = this.http.patch<Comment>(`${this.apiBase}/like/${id}`, {like: session.id}, options);
      }
    });
    return observable;
  }
  sendDislike(id: string): Observable<Comment> {
    let observable: Observable<Comment>
    this.authService.getSession().subscribe({
      next: (session) => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.authService.getToken()}`
        });
        const options = { headers };
        observable = this.http.patch<Comment>(`${this.apiBase}/like/remove/${id}`, {author: session.id}, options);
      }
    });
    return observable;
  }
  edit(id: string, comment: PostComment): Observable<Comment> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const options = { headers };
    return this.http.patch<Comment>(`${this.apiBase}/${id}`, comment, options);
  }

  getById(id: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiBase}/${id}`);
  }
  delete(id: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const options = { headers };
    return this.http.delete<void>(`${this.apiBase}/${id}`, options);
  }
}

