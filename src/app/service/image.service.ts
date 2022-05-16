import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Image} from "../interface/image";
import {Paginate} from "../interface/paginate";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiBase: string = 'http://localhost:5000/api/image'
  constructor(private http: HttpClient) { }

  getImageById(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.apiBase}/id/${id}`)
  }

  getAll(housing: string): Observable<Paginate<Image>> {
    const query = (housing) ? `?housing=${housing}` : '';
    return this.http.get<Paginate<Image>>(`${this.apiBase}${query}`)
  }
}
