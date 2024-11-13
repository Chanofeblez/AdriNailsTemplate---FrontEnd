/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  private fb             = inject(FormBuilder);
  private authService    = inject(AuthService);
  private toastController= inject(ToastController);
  private router         = inject(Router);
  private location         = inject(Location);

  constructor() {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 async onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        async (response) => {
          localStorage.setItem('authToken', response.jwt);
          await this.presentSuccessToast();

          // Redirigir al usuario después del inicio de sesión
          this.router.navigate(['/tabs/home']);

        },
        async (error) => {
          console.error('Login error', error);
          console.error('Login error', error.message);
          await this.presentErrorToast();
        }
      );
    } else {
      console.log('Formulario no es válido');
      await this.presentErrorToast(); // Si el formulario es inválido, muestra un error
    }

  }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Login successful. Welcome back!',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Login failed. Please check your credentials.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  onBack() {
    this.location.back();
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onHome() {
    this.router.navigate(['/tabs']);
  }

  onReset() {
    this.router.navigate(['/reset-password']);
  }

}
