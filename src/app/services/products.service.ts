import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from 'src/app/interfaces/product';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/products`);
  }

  getById(id: string): Observable<Product | null> {
    return this.http.get<Product | null>(`${environment.apiBaseUrl}/products/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiBaseUrl}/products`, product);
  }

  update(id: string, product: Product): Observable<Product | null> {
    return this.http.put<Product | null>(`${environment.apiBaseUrl}/products/${id}`, product);
  }

  delete(id: string): Observable<Product | null> {
    return this.http.delete<Product | null>(`${environment.apiBaseUrl}/products/${id}`);
  }
}
