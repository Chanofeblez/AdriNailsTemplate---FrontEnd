/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servicio, ServicioVariant } from 'src/app/model/manicure-service.interface';
import { UtilService } from 'src/app/services/util.service';
import { ModalController, NavController } from '@ionic/angular';
import { PaymentModalPage } from '../payment-modal/payment-modal.page';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/model/appointment.interface';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {

  name: String = '';
  selectedDate: string;
  selectedTime: string;

  servicios: Servicio[]=[];
  mostrarServicio : Servicio;
  varianteServicio: ServicioVariant[] = [];
  varianteAppointment: ServicioVariant[] = [];

  //carga: ManicureInterface[]=[]
  //carga1: ManicureInterface[]=[]

  total: number = 0;

  public util                = inject(UtilService);
  private modalController    = inject(ModalController);
  private route              = inject(ActivatedRoute);
  private authService        = inject(AuthService);
  private navCtrl            = inject(NavController);
  private appointmentService = inject(AppointmentService);
  private servicioService = inject(ServicioService);

  constructor() {
    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      this.name = data.name;
      this.selectedDate = data.date;
      this.selectedTime = data.time;
      console.log(this.name);
      console.log(this.selectedDate);
      console.log(this.selectedTime);
    });
  }

  ngOnInit() {
    this.loadServicios();
  }

  loadServicios(): void {
    this.servicioService.getAllServicios().subscribe(
      (data: Servicio[]) => {
        console.log(data);
        this.servicios = data;
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
        this.varianteServicio = servicios[i].variants;
      }
    }
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

  onApply() {
    if (this.authService.isLoggedIn()) {
      // El usuario está logueado, puedes proceder a crear el appointment
      this.createAppointment();
    } else {
      // El usuario no está logueado, redirigir a la página de login
      // this.showLoginPrompt();
    }
  }

  createAppointment() {
  // const appointment: Appointment = {
  //    date: this.selectedDate,
  //    time: this.selectedTime,
  //    serviceName: this.mostrarServicio.name, // Asegúrate de tener este arreglo de servicios
      // Agrega aquí cualquier otro dato necesario
   // };
    // Aquí llamas a tu servicio para crear el appointment
  //  this.appointmentService.createAppointment(appointment).subscribe(
  //    (response: Appointment) => { // Especifica el tipo de `response` si lo conoces
  //      // Manejar la respuesta del servidor
  //      this.navCtrl.navigateForward('/confirmation'); // Navegar a la página de confirmación
  //    },
  //    (error: any) => { // Especifica `any` o un tipo más específico si sabes cuál es
  //      // Manejar el error
  //      console.error('Error creating appointment:', error);
  //    }
  //  );
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
