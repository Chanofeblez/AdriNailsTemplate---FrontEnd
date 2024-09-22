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
  addBankCard: boolean = false;
  payments: any;
  card: any;
  sourceId: string;

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
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      cardNonce: [''] // Este campo almacenará el token de la tarjeta si se agrega
    });
    // Inicializar Square Payment SDK solo si el usuario elige agregar una tarjeta
    if (this.addBankCard) {
      await this.initializeSquare();
    }
  }

  async onRegister() {
    if (this.addBankCard && this.card) {
      // Procesar la tarjeta antes de enviar el formulario
      const result = await this.card.tokenize();
      if (result.status === 'OK') {
        // Verificar si el control 'cardNonce' está presente en el formulario
        const cardNonceControl = this.registerForm.get('cardNonce');
        if (cardNonceControl) {
          cardNonceControl.setValue(result.token);
          this.submitForm(); // Enviar el formulario después de tokenizar
        } else {
          console.error('Card nonce control is missing from the form group.');
        }
      } else {
        console.error('Failed to tokenize card:', result.errors);
      }
    } else {
      this.submitForm();
    }
  }

  async initializeSquare() {
    try {
      if (!window.Square) {
        throw new Error('Square.js failed to load properly');
      }

      // Inicializa el objeto de pagos de Square con tu aplicación y location ID
      this.payments = window.Square.payments('YOUR_SQUARE_APPLICATION_ID', 'YOUR_LOCATION_ID');
      this.card = await this.payments.card();
      await this.card.attach('#card-container');

      // Asignar evento de clic al botón de añadir tarjeta
      document.getElementById('card-button')?.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
          const result = await this.card.tokenize();
          if (result.status === 'OK') {
            const cardNonceControl = this.registerForm.get('cardNonce');
            if (cardNonceControl) {
              cardNonceControl.setValue(result.token);
              console.log('Card tokenized successfully:', result.token);
            } else {
              console.error('Card nonce control is missing from the form group.');
            }
          } else {
            console.error('Failed to tokenize card:', result.errors);
          }
        } catch (error) {
          console.error('Tokenization failed:', error);
        }
      });

    } catch (error) {
      console.error('Failed to initialize Square PaymentForm:', error);
    }
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
        const response = await this.authService.register(formData).toPromise(); // Convertimos el observable en promesa
        console.log('Registro exitoso', response);
        await this.presentSuccessToast();
        console.log('miembro creado');
        this.registerForm.reset();
        await this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error en el registro', error);
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
      message: 'Registro Exitoso. Tu cuenta ha sido creada correctamente.',
      duration: 3000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Hubo un problema al crear tu cuenta. Por favor, intenta nuevamente.',
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }

  isValidField( field: string){

    return this.registerForm.controls[field] && this.registerForm.controls[field].touched;
   // if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
   //   return true;
   // } else{
   //   return false;
   // }
  }


}
