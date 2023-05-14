import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FecthproductsService {
  constructor(private http: HttpClient) { }
  
  getProducts(page:number): Observable<any> {
    return this.http.get(`${environment.urlFetch}/products/completelist?page=${page}`);
  }
  deleteProduct(code: string): Observable<any> {
    return this.http.delete(`${environment.urlFetch}/products/delete/${code}`);
  }
  addProduct(product: any): Observable<any>  {
    return this.http.post(`${environment.urlFetch}/products/insert`, product);
  }
  updateProduct(id: string, product: any): Observable<any>  {
    return this.http.put(`${environment.urlFetch}/products/update/${id}`, product);
  }
  findAllProductsByCategory(category: string): Observable<any>  {
    return this.http.get(`${environment.urlFetch}/products/category/${category}`);
  }
  
}
