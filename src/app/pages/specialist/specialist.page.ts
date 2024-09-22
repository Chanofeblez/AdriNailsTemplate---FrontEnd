/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { SuccessPage } from '../success/success.page';
import { Customer } from 'src/app/model/customer.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
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

  public util = inject(UtilService);
  private toastController = inject(ToastController);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() { }

  ngOnInit() {
    this.initForm();
    this.loadCustomerEmail();
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
  loadCustomerEmail() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.getUserByToken(token).subscribe((email: any) => {
        this.customerEmail = email.username;
        this.loadProfileData(this.customerEmail);
      });
    }
  }

  // Cargar los datos del perfil del Customer por email
  loadProfileData(email: string) {
    this.authService.getCustomerByEmail(email).subscribe((customer: Customer) => {
      this.customerId = customer.id;
      this.profileForm.patchValue({
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber
      });
    });
  }

  async onUpdate() {
    if (this.profileForm.valid && this.isFormEdited) {
      this.authService.updateUserProfile(this.customerId, this.profileForm.value).subscribe(
        async () => {
            // Mostrar el toast de éxito
        await this.presentToast('Profile updated successfully!', 'success');
        // Navegar de vuelta a las tabs (o donde prefieras)
        this.util.navigateRoot('/tabs');
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
