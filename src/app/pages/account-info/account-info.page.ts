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

  public util             = inject(UtilService);
  private modalController = inject(ModalController);
  private formBuilder     = inject(FormBuilder);
  private authService   = inject(AuthService);

  constructor() { }

  ngOnInit() {
    this.initForm();
    this.loadCustomerEmail(); // Cargar email del usuario autenticado
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
        console.log("Email in Profile",this.customerEmail);
        this.loadProfileData(this.customerEmail); // Cargar los datos del perfil
      });
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
            this.util.navigateRoot('/');
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

  // Función para logout
  onLogout() {
    this.authService.logout(); // Llama al método logout del servicio
    this.util.navigateRoot('/login'); // Redirige al usuario a la página de inicio de sesión
  }


  onBack() {
    this.util.onBack();
  }

  async onPin() {
    const modal = await this.modalController.create({
      component: SuccessPage,
      backdropDismiss: false,
      cssClass: 'success-modal'
    });
    modal.onDidDismiss().then((data) => {
      this.util.navigateRoot('/tabs');
    });
    await modal.present();
  }

}
