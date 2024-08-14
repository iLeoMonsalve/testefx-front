import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/user/register';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    console.log("entra login")
    const body = { 
      "username": username, 
      "password":  password 
    };
    return this.http.post<any>(this.apiUrl, body);
  }
}