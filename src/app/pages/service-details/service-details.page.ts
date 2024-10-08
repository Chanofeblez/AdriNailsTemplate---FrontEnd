/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicio, ServicioVariant } from 'src/app/model/manicure-service.interface';
import { UtilService } from 'src/app/services/util.service';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { PaymentModalPage } from '../payment-modal/payment-modal.page';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment, AppointmentStatus } from 'src/app/model/appointment.interface';
import { ServicioService } from 'src/app/services/servicio.service';
import { Customer } from 'src/app/model/customer.interface';
import { SuccessPage } from '../success/success.page';
import { ConfirmAppointmentModalPage } from '../confirmappointmentmodal/confirmappointmentmodal.page';
import { ConfirmappointmentmodalPageModule } from '../confirmappointmentmodal/confirmappointmentmodal.module';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {

  userId: string;
  name: string = '';
  selectedDate: string;
  selectedTime: string;
  imagePath: string;
  logged: boolean;

  servicios: Servicio[]=[];
  mostrarServicio : Servicio | null = null;
  varianteServicio: ServicioVariant[] = [];
  varianteAppointment: ServicioVariant[] = [];

  //carga: ManicureInterface[]=[]
  //carga1: ManicureInterface[]=[]

  total: number = 0;

  public util                = inject(UtilService);
  private modalController    = inject(ModalController);
  private route              = inject(ActivatedRoute);
  private router             = inject(Router);
  private authService        = inject(AuthService);
  private navCtrl            = inject(NavController);
  private appointmentService = inject(AppointmentService);
  private servicioService    = inject(ServicioService);
  private toastController    = inject(ToastController);

  constructor() {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId= params['user'];
      this.selectedDate = params['date'];
      this.selectedTime = params['time'];
      this.name = params['name'];
      this.total = params['price'];
      this.imagePath = params['imagePath'];
      console.log(this.userId);
      console.log(this.name);
      console.log(this.selectedDate);
      console.log(this.selectedTime);
      console.log(this.total);
      console.log(this.imagePath);
    });
  }

  ionViewWillEnter() {
    // Reinicia los componentes cada vez que se entra a la página
    this.resetPage();
    this.loadServicios();
  }

  resetPage() {
    // Aquí puedes reiniciar cualquier variable o estado
    this.varianteAppointment = [];
    this.total = 0;
    this.mostrarServicio = null;
    this.varianteServicio = [];
    console.log('Página reiniciada');
  }

  loadServicios(): void {
    this.servicioService.getAllServicios().subscribe(
      (data: Servicio[]) => {
        console.log(data);
        this.servicios = data;
        console.log(this.servicios);
        this.separateServicios(this.servicios);
      },
      (error) => {
        console.error('Error al cargar los servicios', error);
      }
    );
  }

  separateServicios(servicios: Servicio[]){
    for(let i = 0; i < servicios.length; i++){
      if(servicios[i].name === this.name){
        this.mostrarServicio = servicios[i];
        this.total=this.mostrarServicio.price;
        console.log(servicios[i]);
        this.varianteServicio = servicios[i].variants;
      }
    }
    console.log(this.varianteServicio);
  }

  onBack() {
    this.util.onBack();
  }

//  getServicio(name: String) {
//
//    for (let i = 0; i < this.carga.length; i++) {
//      if (name === this.carga[i].name) {
//        this.mostrar = this.carga[i];
//        this.total=this.mostrar.price;
//      }
//    }
//    for (let i = 0; i < this.carga1.length; i++) {
//      if (name === this.carga1[i].name) {
//        this.mostrar = this.carga1[i];
//      }
//    }
//    console.log(this.mostrar);
//    return this.mostrar;
//  }

  onCheckboxChange(event: any, item: any) {
    const isChecked = event.detail.checked;
    console.log('Checkbox changed:', isChecked, 'for item:', item);
    if(isChecked){
      this.total+=item.price;
      // Agrega el item a varianteAppointment si está seleccionado
      this.varianteAppointment.push(item);
    }else{
      this.total-=item.price;
       // Remueve el item de varianteAppointment si no está seleccionado
       const index = this.varianteAppointment.findIndex(v => v.id === item.id);
       if (index > -1) {
           this.varianteAppointment.splice(index, 1);
       }
    }
    console.log(this.varianteAppointment);
  }

  onPayment() {
    this.util.navigateToPage('payment-modal');
  }

 async onApply() {
  this.authService.isLoggedIn().subscribe((isLoggedIn) => {
    this.logged = isLoggedIn; // Asigna el valor del observable a 'logged'
    console.log(this.logged); // Ahora puedes usar el valor booleano
  });
    if (this.logged ) {
      console.log("Adentro");
      // El usuario está logueado, puedes proceder a crear el appointment
      await this.presentConfirmModal();
    } else {
      // El usuario no está logueado, mostrar mensaje de error y redirigir al login
    this.presentToast('You must be logged in to create an appointment.');
    this.router.navigate(['/login']); // Redirigir al login
    }
  }

  async presentConfirmModal() {
    const appointmentRequestDTO: Appointment = {
      customerEmail: this.userId,  // Usar el email del Customer
      serviceName: this.name,  // Usar el ID del Servicio
      serviceVariantIds: this.varianteAppointment.map(variant => variant.id),  // Mapear las variantes a sus IDs
      appointmentDate: this.selectedDate,
      appointmentTime: this.selectedTime,
      totalCost: this.total,  // Asumiendo que tienes el total calculado
      status: AppointmentStatus.PENDING,  // Estado por defecto
      imagePath: this.imagePath
    };

    // Abre el modal de confirmación y pasa el appointmentRequestDTO
    const modal = await this.modalController.create({
      component: ConfirmAppointmentModalPage,
      cssClass: 'bookmark-modal',  // El componente del modal de confirmación
      componentProps: { appointment: appointmentRequestDTO },  // Pasa los detalles del appointment
      backdropDismiss: false,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data === 'confirm') {
        // Si el usuario confirma, crea el appointment
        this.createAppointment(appointmentRequestDTO);
      }
    });

    await modal.present();
  }


  createAppointment(appointmentRequestDTO: Appointment) {
    console.log("appointmentRequestDTO", appointmentRequestDTO);
    // Llamar al servicio para crear el appointment
    this.appointmentService.createAppointment(appointmentRequestDTO).subscribe(
      async (response: Appointment) => {
        console.log("Create Appointment", response);

        // Llamar al modal de éxito
        const modal = await this.modalController.create({
          component: SuccessPage  // El componente del modal
        });

        await modal.present();

        // Redirigir a la pantalla deseada después de que el modal se cierre automáticamente
        modal.onDidDismiss().then(() => {
          this.navCtrl.navigateForward('/tabs/home');  // Navegar a la página de inicio o cualquier otra página
        });
      },
      (error: any) => {
        console.error("Error creating appointment:", error);
        // Manejar el error
      }
    );
  }


  // Método para mostrar el toast
async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000, // Duración del toast (2 segundos)
    color: 'warning', // Puedes elegir otros colores como "danger", "success", etc.
    position: 'bottom' // Posición del toast
  });
  toast.present();
}


  showLoginPrompt() {
    const navigationExtras = {
      state: {
        redirectAfterLogin: '/bookings' // La página a la que quieres redirigir después del login
      }
    };
    this.navCtrl.navigateForward('/login', navigationExtras); // Redirigir a la página de login
  }

  async presentModal() {
    const amountToCharge = this.total;
    const modal = await this.modalController.create({
      component: PaymentModalPage,
      cssClass: 'bookmark-modal',
      componentProps: {
        amount: amountToCharge
    }
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data && data.data == 'ok' && data.role == 'ok') {
        this.util.navigateToPage('payment-modal');
      }
    });
    await modal.present();
  }

}
