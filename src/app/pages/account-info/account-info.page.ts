/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { SuccessPage } from '../success/success.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/model/customer.interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.page.html',
  styleUrls: ['./account-info.page.scss'],
})
export class AccountInfoPage implements OnInit {

  profileForm: FormGroup;
  isFormEdited = false;
  customerEmail: string;
  customerId: string;

  private modalController = inject(ModalController);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private location = inject(Location);


  constructor() { }

  // ionViewDidEnter() {
  //   this.initForm();
  //   this.loadCustomerEmail(); // Cargar email del usuario autenticado
  // }

  ngOnInit() {
    this.initForm();
    this.loadCustomerEmail(); // Cargar email del usuario autenticado
  }

  // Navegación a la pantalla de edición de perfil
  navigateToProfile() {
    this.router.navigate(['/tabs/account']);
  }

  // Navegación a la política de privacidad
  navigateToPrivacy() {
    this.router.navigate(['/tabs/privacy-policy']);
  }

  // Navegación a la política de cancelación
  navigateToCancellation() {
    this.router.navigate(['/tabs/cancellation-policy']);
  }

  // Navegación a la política de eliminación de perfil
  navigateToDeletion() {
    this.router.navigate(['/tabs/deletion-policy']);
  }

  // Función para logout
  onLogout() {
    // Limpia el token de autenticación
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');

    // Navegar a home sin recargar toda la página
    this.router.navigate(['/home']).then(() => {
      // Si necesitas forzar una recarga de los componentes en home puedes hacerlo aquí
      window.location.reload(); // Opcional: sólo si realmente necesitas recargar todo desde el servidor
    });

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
      this.authService.getUserByToken(token).subscribe(
        (response: any) => {
          // Ahora response es un objeto Customer completo
          this.customerId = response.id;  // O maneja cualquier campo necesario
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


   // Cargar los datos del perfil del Customer por email
   loadProfileData(email: string) {
    this.authService.getCustomerByEmail(email).subscribe((customer: Customer) => {
      console.log("Customer in profile", customer);
      this.customerId = customer.id;
      console.log("Customer ID in profile", this.customerId);
      this.profileForm.patchValue({
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber
      });
    });
  }

  async onUpdate() {
    if (this.profileForm.valid && this.isFormEdited) {
      // Llama al método updateUserProfile del AuthService con el ID y los datos del formulario
      this.authService.updateUserProfile(this.customerId, this.profileForm.value).subscribe(
        async () => {
          // Si la actualización es exitosa, crea y muestra el modal
          const modal = await this.modalController.create({
            component: SuccessPage,
            backdropDismiss: false,
            cssClass: 'success-modal'
          });

          modal.onDidDismiss().then(() => {
            // Navega de vuelta a la página Home o donde prefieras después de cerrar el modal
            this.router.navigate(['/tabs']);
          });

          await modal.present();
        },
        (error) => {
          console.error('Error al actualizar el perfil:', error); // Manejo de errores
          // Aquí puedes mostrar un mensaje de error o manejarlo de otra forma
        }
      );
    }
  }



  onBack() {
    this.location.back();
  }

  async onPin() {
    const modal = await this.modalController.create({
      component: SuccessPage,
      backdropDismiss: false,
      cssClass: 'success-modal'
    });
    modal.onDidDismiss().then((data) => {
      this.router.navigate(['/tabs']);
    });
    await modal.present();
  }

}
