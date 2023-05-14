import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FetchcartsService {
  public itemsCart$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get myNumberObservable(): Observable<number> {
    return this.itemsCart$.asObservable();
  }

  constructor(private http: HttpClient) { }
  getProductsFromCartByEmail(email: string,): Observable<any> {
    return this.http.get(`${environment.urlFetch}/cart/${email}`);
  }
  addProductsOnCartByMail(email: string, body: any): Observable<any> {
    return this.http.post(`${environment.urlFetch}/cart/${email}`, body);
  }
  deleteProducOfCart(email: string, code: any): Observable<any> {
    return this.http.put(`${environment.urlFetch}/cart/${email}`, code);
  }

  endBuy(email: string, cartUser: any[]): Observable<any> {
    return this.http.post(`${environment.urlFetch}/cart/buy/${email}`, cartUser);
  }
}
