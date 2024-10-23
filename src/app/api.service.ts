import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000'; // URL del backend de Django

  constructor(private http: HttpClient) {}

  // Ejemplo de petición GET a la API
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/`);
  }

  // Ejemplo de petición POST (registro de usuario)
  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register/`, data);
  }

  // Ejemplo de petición POST para login
  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login/`, data);
  }
}
