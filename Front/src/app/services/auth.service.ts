import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  
  getCookie(): Observable<any> {
    return this.http.get(`${environment.urlFetch}/users/check`);
  }
  deleteCookie(): Observable<any> {
    return this.http.get(`${environment.urlFetch}/users/logout`);
  }

}
