import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }

  registerUser(data: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('file', file);
    return this.http.post(`${environment.urlFetch}/users/register`, formData);
  }
}
