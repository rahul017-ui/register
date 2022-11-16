import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ROOT_URL: string = environment.URL

  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post<any>(`${this.ROOT_URL}/api/v1/users/login`, user);
  }
  
  Register(user: any) {
    return this.http.post<any>(`${this.ROOT_URL}/api/v1/users/register`, user,)

  }

  getAuthToken() {
    return localStorage.getItem('x-auth-token');
  }

  setAuthToken(token: string) {

    localStorage.setItem('x-auth-token', token)
  }

  removeAuthToken() {
    localStorage.removeItem('x-auth-token');
  }

}


