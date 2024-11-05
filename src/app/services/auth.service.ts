import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
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

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('authToken');

    if (!token) {
      return of(false); // Devuelve un observable que emite 'false' si no hay token
    }

    // Verifica con el servidor si el token es válido
    return this.getUserByToken(token).pipe(
      map((username) => {
        // Si se encuentra un username, el token es válido
        return !!username;
      }),
      catchError((error) => {
        console.error('Error al verificar el token', error);
        return of(false); // Si hay un error, devuelve 'false'
      })
    );
  }



  register(customer: Customer): Observable<any> {
    console.log("En el servicio");
    return this.http.post(`${this.apiUrl}`, customer).pipe(
      tap((response: any) => {
        if (response && response.token) {
          console.log("Guardar en el local");
          localStorage.setItem('authToken', response.token);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Error en el servicio:", error);
        // Extrae el mensaje de error de la respuesta
        const errorMessage = error.error?.error || error.error || 'Unknown error';
        // Lanza un nuevo error con el mensaje adecuado
        return throwError(() => new Error(errorMessage));
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

  getUserByToken(token: string): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/extract-username`, { token });
  }

  getCustomerByEmail(email: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/by-email`, { params: { email:email } });
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

