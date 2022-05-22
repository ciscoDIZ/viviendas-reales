import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Image} from "../interface/image";
import {Paginate} from "../interface/paginate";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiBase: string = 'http://localhost:8080/api/image'
  constructor(private http: HttpClient, private authService: AuthService) { }

  getImageById(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.apiBase}/id/${id}`)
  }

  getAll(housing: string, page: number = 1): Observable<Paginate<Image>> {
    const query = (housing) ? `?housing=${housing}&page=${page}` : `?page=${page}`;
    return this.http.get<Paginate<Image>>(`${this.apiBase}${query}`)
  }
  create(image: FormData): Observable<Image> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
    });
    const options = { headers };
    return this.http.post<Image>(this.apiBase, image, options);
  }
}
