import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Housing} from "../interface/housing";
import {Paginate} from "../interface/paginate";
import {AuthService} from "./auth.service";
import {UpdatedImage} from "../interface/updated-image";
import {PostHousing} from "../interface/post-housing";
import {environment} from "../../environments/environment.prod";



@Injectable({
  providedIn: 'root'
})
export class HousingService {

  private readonly baseUri: string=`${environment.apiUri}/housing`;
  constructor(private http: HttpClient, private authService: AuthService) {

  }

  getAll(query: string = ''): Observable<Paginate<Housing>> {
      let uri = this.baseUri;
      if (query != '') {
        uri = `${this.baseUri}?${query}`;
      }
      return this.http.get<Paginate<Housing>>(uri)
  }

  getById(id: string): Observable<Housing> {
    return this.http.get<Housing>(`${this.baseUri}/${id}`)
  }

  getByOwner(owner: string, page: number = 1, limit: number = 10): Observable<Paginate<Housing>> {
    return this.http.get<Paginate<Housing>>(`${this.baseUri}/owner/${owner}?limit=${limit}`);
  }

  create(body: PostHousing): Observable<Housing> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
    const options = { headers };
    return this.http.post<Housing>(this.baseUri, body, options);
  }
  updateMainImage(id: string, multipart: FormData): Observable<UpdatedImage> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'enctype': 'multipart/form-data'
    });
    console.log()
    const options = { headers };
    return this.http.patch<UpdatedImage>(`${this.baseUri}/${id}`, multipart, options);
  }

  updateHousing(housing: PostHousing): Observable<Housing> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${this.authService.getToken()}`
    })
    const options = { headers };
    return this.http.put<Housing>(this.baseUri, housing, options);
  }

  deleteById(id: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const options = { headers };
    return this.http.delete<void>(`${this.baseUri}/${id}`,options);
  }
  sendLike(id: string): Observable<Housing> {
    let observable: Observable<Housing>;
    this.authService.getSession().subscribe({
      next: (session) => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.authService.getToken()}`
        })
        const options = { headers };
        observable = this.http.patch<Housing>(`${this.baseUri}/like/${id}`, {userId: session.id}, options);
      }
    })
    return observable;
  }
  sendDislike(id: string): Observable<Housing> {
    let observable: Observable<Housing>;
    this.authService.getSession().subscribe({next: (session) => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.authService.getToken()}`
        });
        const options = { headers };
        observable = this.http.patch<Housing>(`${this.baseUri}/like/remove/${id}`, {userId: session.id}, options)
      }
    })
    return observable;
  }
}
