import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken'); // O sessionStorage
    return token != null; // Si existe un token, el usuario está logueado
  }

  // Otros métodos como login(), logout(), etc.
}

