/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { CancelModalPage } from '../cancel-modal/cancel-modal.page';
import { register } from 'swiper/element';
import { Router } from '@angular/router';
import { Appointment, AppointmentStatus } from 'src/app/model/appointment.interface';
import { AppointmentService } from 'src/app/services/appointment.service';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { LocalTime } from 'src/app/model/localtime.interface';
import { Customer } from 'src/app/model/customer.interface';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  segment: any = 'book';
  minDate: string;
  userId: string;
  user:Customer;
  serviceImageUrl: string;
  selectedDate: string | null = null;
  selectedSlot: number | null = null;
  availableMorningSlots: number[] = []; // Horarios disponibles después de filtrar
  availableAfternoonSlots: number[] = []; // Horarios disponibles después de filtrar
  availableSlots: number[] = []; // Horarios disponibles después de filtrar


  upcomingAppointments  : Appointment[] = [];
  completedAppointments : Appointment[] = [];
  cancelledAppointments : Appointment[] = [];

  slotList: any[] = [
    "10:00am",
    "01:00pm",
    "03:00pm",
    "05:00pm"
  ];
  slideOptStores = {
    initialSlide: 0,
    slidesPerView: 4.1,
  };

  selectedSpecialist: any = '';

  public util                = inject(UtilService);
  private modalController    = inject(ModalController);
  private navCtrl            = inject(NavController);
  private router             = inject(Router);
  private appointmentService = inject(AppointmentService);
  private authService        = inject(AuthService);
  private servicioService    = inject(ServicioService);


  constructor() {
    const today = new Date();
    const day = ('0' + today.getDate()).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();

    this.minDate = `${year}-${month}-${day}`;
  }

  ngOnInit() {
    this.getToken();

  }

  loadAvailableSlots(selectedDate: string) {
    this.availableMorningSlots = []; // Reinicia la lista de slots AM
    this.availableAfternoonSlots = []; // Reinicia la lista de slots PM

    this.appointmentService.loadAvailableSlots(selectedDate).subscribe((slots: number[]) => {
      this.availableSlots = slots;
      console.log("Available",this.availableSlots);

      // Divide los Slots en AM y PM
      this.availableSlots.forEach(slot => {

        const hour = slot.toString().split(':').map(digital => Number(digital)); // `slot` ya es de tipo `number`, por lo que contiene la hora

        if (hour[0] < 12) {
            this.availableMorningSlots.push(hour[0]);
        } else {
            this.availableAfternoonSlots.push(hour[0]-12);
        }
    });

    });
  }

  onDateChange(event: any) {
    const selectedDate = event.detail.value;

    // Verifica que `selectedDate` no sea nulo
    if (selectedDate) {
      this.selectedDate = selectedDate.split('T')[0]; // Si solo necesitas la fecha sin la hora
      console.log(this.selectedDate); // Para depuración, imprimirá la fecha en el formato "YYYY-MM-DD"

      // Cargar los horarios disponibles para la fecha seleccionada
      this.loadAvailableSlots(this.selectedDate!);
    } else {
      console.error('Fecha seleccionada no válida');
    }
  }

  getToken() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.getUserByToken(token).subscribe(
        (response:any) => {
          console.log('Username:', response);
          // Aquí puedes manejar el username, por ejemplo, almacenarlo en una variable o en el estado del componente
          this.userId = response.username;
          this.getUser(this.userId);

        },
        (error) => {
          console.error('Error al obtener el username:', error);
          // Verifica el contenido del error
          console.log('Error completo:', error);
        }
      );
    } else {
      console.error('Token not found');
    }
  }

  async getUser(userId: string) {
    try {
      const appointments = await this.appointmentService.getUserAppointments(userId).toPromise();

      if (!appointments || appointments.length === 0) {
        console.error("No appointments found or appointments is undefined");
        return; // Salir de la función si no hay citas
      }

      const now = new Date(); // Obtener la fecha y hora actual
      console.log("Appointments", appointments)

      for (const appointment of appointments) {
        // Combinar la fecha y hora del appointment en un solo objeto Date
        const appointmentDateTime = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`);
        console.log("FechaAppointment", appointmentDateTime);
        console.log("FechaHoy", now);

        if (appointment.status === 'CANCELLED') {
          this.cancelledAppointments.push(appointment);
        } else if ((appointment.status === 'CONFIRMED' || appointment.status === 'PENDING') && appointmentDateTime > now) {
          this.upcomingAppointments.push(appointment);
        } else if ((appointment.status === 'CONFIRMED' || appointment.status === 'PENDING' || appointment.status === 'COMPLETED') && appointmentDateTime <= now) {
          if (appointment.id) {
            appointment.status = AppointmentStatus.COMPLETED; // Cambiar el estado a COMPLETED
            try {
              await this.appointmentService.updateAppointmentStatus(appointment.id, AppointmentStatus.COMPLETED).toPromise();
              console.log('Appointment status updated to COMPLETED');
              this.completedAppointments.push(appointment);
            } catch (error) {
              console.error('Error updating appointment status', error);
            }
          } else {
            console.error('Appointment ID is undefined');
          }
        }
      }
      console.log("LISTASUPP", this.upcomingAppointments);
      console.log("LISTASCOMP", this.completedAppointments);
    } catch (error) {
      console.error('Error fetching appointments', error);
    }
  }

  getServiceImageUrl(serviceName: string){
    this.servicioService.getServiceImageUrl(serviceName).subscribe(imageUrl => {
      this.serviceImageUrl = imageUrl;
    });
  }

  save(save: any) {
    console.log(this.selectedDate + " " + this.selectedSlot);
    this.selectedSlot = save;
    console.log(this.selectedDate + " " + this.selectedSlot);
  }

  isFormValid(): boolean {

    return this.selectedDate !== null && this.selectedSlot !== null;
  }

  segmentChanged() {
    console.log(this.segment);
  }

  onReceipt() {
    this.util.navigateToPage('e-receipt');
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CancelModalPage,
      cssClass: 'bookmark-modal'
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data && data.data == 'ok' && data.role == 'ok') {
        this.util.navigateToPage('cancel-booking');
      }
    });
    await modal.present();
  }

  onBack() {
    this.util.onBack();
  }

  saveSpecialist(name: string) {
    this.selectedSpecialist = name;
  }

  onPayment() {

    if(this.selectedSlot != null && this.selectedSlot >= 1 && this.selectedSlot <= 7 ){
      this.selectedSlot+=12;
    }
    this.router.navigate(['/services-list'], {
      queryParams: {
        user: this.userId,
        date: this.selectedDate,
        time: this.selectedSlot
      }
    });
    //this.util.navigateToPage('services-list');
  }



}
