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
          window.location.reload();
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

  // Método para actualizar el perfil del cliente, pasando el ID en la URL
  updateUserProfile(id: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  // Método para limpiar el token de autenticación y hacer logout
  logout(): void {
    // Limpia el token de autenticación del localStorage y sessionStorage
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');

  // Reinicia la aplicación forzando una recarga
  window.location.reload();

  }

}

