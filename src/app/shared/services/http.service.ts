import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly localUrl = 'assets/dummy-data.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<Array<IProduct>>(`${this.localUrl}`);
  }
}