/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Customer } from 'src/app/model/customer.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  private fb             = inject(FormBuilder);
  private authService    = inject(AuthService);
  private util           = inject(UtilService);
  private router         = inject(Router);
  private toastController= inject(ToastController);

  constructor() {}

  async ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  async onRegister() {
    this.submitForm(); // Directly submit the form without payment logic
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }

  async submitForm() {
    if (this.registerForm.valid) {
      const formData: Customer = this.registerForm.value; // Captura los datos del formulario
      console.log('Form Data:', formData);

      try {
        console.log('Registration started');
        const response = await this.authService.register(formData).toPromise(); // Convertimos el observable en promesa
        console.log('Registration successful', response);

        // Loguear automáticamente al usuario después del registro
        const loginCredentials = {
          email: formData.email,
          password: formData.password
        };

        console.log('Attempting to login after registration...');
        const loginResponse = await this.authService.login(loginCredentials).toPromise(); // Inicia sesión automáticamente
        console.log('Login successful', loginResponse);

        // Guardar el token de autenticación
        localStorage.setItem('authToken', loginResponse.jwt);

        await this.presentSuccessToast();
        console.log('Member created and logged in');
        this.registerForm.reset();

        // Redirigir al usuario a la página principal o dashboard
        await this.router.navigate(['/tabs/home']);

      } catch (error) {
        console.error('Error during registration or login', error);
        await this.presentErrorToast();
      }
    } else {
      console.log('Form is invalid');
    }
    console.log('Finish SubmitForm');
  }


  onBack() {
    this.util.navigateToPage('/login');
  }

  onHome() {
    this.util.navigateToPage('/');
  }

  onNext() {
    this.util.navigateToPage('account-info');
  }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Successful Registration. Your account has been created correctly.',
      duration: 3000,
      color: 'success',
      position: 'bottom'
    });
    toast.present();
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'There was a problem creating your account. Please try again.',
      duration: 3000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }

  isValidField(field: string) {
    return this.registerForm.controls[field] && this.registerForm.controls[field].touched;
  }
}

