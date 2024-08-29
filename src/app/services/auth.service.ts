import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Customer } from '../model/customer.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${base_url}/api/auth/customers`;

  private http = inject(HttpClient);

  constructor() { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken'); // O sessionStorage
    return token != null; // Si existe un token, el usuario está logueado
  }

  register(customer: Customer): Observable<any> {
    return this.http.post(`${this.apiUrl}`, customer).pipe(
      tap((response: any) => {
        if (response && response.token) {
          console.log("Guardar en el local");
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }


  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {

        }
      })
    );
  }

  getUserByToken(token: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/extract-username`, { token });
  }

  getCustomerByEmail(email: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/by-email`, { params: { email } });
  }

}

