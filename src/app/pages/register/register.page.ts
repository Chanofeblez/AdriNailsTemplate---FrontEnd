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

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  private fb             = inject(FormBuilder);
  private authService    = inject(AuthService);
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

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }

  async onRegister() {
    this.submitForm(); // Directly submit the form without payment logic
  }



async submitForm() {
  if (this.registerForm.valid) {
    const formData: Customer = this.registerForm.value; // Captura los datos del formulario

    // Convierte el email a minúsculas
    formData.email = formData.email.toLowerCase();

    try {
      const response = await this.authService.register(formData).toPromise();

      // Loguear automáticamente al usuario después del registro
      const loginCredentials = {
        email: formData.email,
        password: formData.password
      };

      const loginResponse = await this.authService.login(loginCredentials).toPromise(); // Inicia sesión automáticamente

      // Guardar el token de autenticación
      localStorage.setItem('authToken', loginResponse.jwt);

      await this.presentSuccessToast();
      this.registerForm.reset();

      // Redirigir al usuario a la página principal o dashboard
      await this.router.navigate(['/tabs/home']);
    } catch (error: any) {
      let message = error?.error?.message || error?.message || 'Unknown error';
      await this.presentErrorToast(message);
    }
  } else {
    console.log('Form is invalid');
  }
}



  onBack() {
    this.router.navigate(['/login']);
  }

  onHome() {
    this.router.navigate(['/tabs']);
  }

  onNext() {
    this.router.navigate(['/tabs/account-info']);
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

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }


  isValidField(field: string) {
    return this.registerForm.controls[field] && this.registerForm.controls[field].touched;
  }
}

