import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Housing} from "../interface/housing";
import {Paginate} from "../interface/paginate";

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  apiBase: string;
  constructor(private http: HttpClient) {
      this.apiBase = 'http://localhost:5000/api/housing'
  }

  getAll(query: string = ''): Observable<Paginate<Housing>> {
      return this.http.get<Paginate<Housing>>(this.apiBase)
  }

  getById(id: string): Observable<Housing> {
    return this.http.get<Housing>(`${this.apiBase}/${id}`)
  }

  getByOwner(owner: string): Observable<Paginate<Housing>> {
    return this.http.get<Paginate<Housing>>(`${this.apiBase}/owner/${owner}`);
  }
}
