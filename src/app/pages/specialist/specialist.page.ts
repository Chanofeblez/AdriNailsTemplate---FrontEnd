/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.page.html',
  styleUrls: ['./specialist.page.scss'],
})
export class SpecialistPage implements OnInit {

  profileForm: FormGroup;
  isFormEdited = false;
  customerEmail: string;
  customerId: string;

  private toastController = inject(ToastController);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() { }

  ngOnInit() {
    this.initForm();
    this.loadCustomer();
  }

  // Inicializar el formulario con validación
  initForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
    });

    // Detectar cambios en el formulario
    this.profileForm.valueChanges.subscribe(() => {
      this.isFormEdited = this.profileForm.dirty; // Solo se activa si se han hecho cambios
    });
  }

  // Cargar el email del token (si está en el localStorage o sessionStorage)
  loadCustomer() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.getUserByToken(token).subscribe(
        (response: any) => {
          // Ahora response es un objeto Customer completo
          this.customerId = response.id;  // O maneja cualquier campo necesario
          this.profileForm.patchValue({
            name: response.name,
            email: response.email,
            phoneNumber: response.phoneNumber
          });
        },
        (error) => {
          console.error('Error al obtener el cliente:', error);
          console.log('Error completo:', error);
        }
      );
    } else {
      console.log('Token no Found');
    }
  }

  async onUpdate() {
    if (this.profileForm.valid && this.isFormEdited) {
      this.authService.updateUserProfile(this.customerId, this.profileForm.value).subscribe(
        async () => {
            // Mostrar el toast de éxito
        await this.presentToast('Profile updated successfully!', 'success');
        // Navegar de vuelta a las tabs (o donde prefieras)
        this.router.navigate(['/tabs/account-info']);
      },
      async (error) => {
        // Mostrar el toast de error
        await this.presentToast('Error updating profile. Please try again.', 'danger');
        console.error('Error al actualizar el perfil:', error); // Manejo de errores
      }
      );
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración del toast en milisegundos
      color: color,   // Color del toast ('success', 'danger', etc.)
      position: 'bottom' // Posición del toast
    });
    toast.present();
  }

}
