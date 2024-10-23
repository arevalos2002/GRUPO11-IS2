import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth/';  // URL de la API Django

  constructor(private http: HttpClient) {}

  // Método para login
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, credentials);
  }

  // Método para registro
  register(userData: { username: string; email: string; password1: string; password2: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}registration/`, userData);
  }

  // Método para logout
  logout(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}logout/`, {}, { headers });
  }
  

  private getHeaders(): HttpHeaders {
    let token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }
}
