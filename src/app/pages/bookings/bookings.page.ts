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

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  segment: any = 'book';
  minDate: string;
  userId: string;
  selectedDate: string | null = null;
  selectedSlot: string | null = null;

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

  getToken() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.getUserByToken(token).subscribe(
        (response: any) => {
          console.log('Username:', response);
          // Aquí puedes manejar el username, por ejemplo, almacenarlo en una variable o en el estado del componente
          this.getUser(response.username);
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

  getUser(userId:string){
    this.appointmentService.getUserAppointments(this.userId).subscribe((appointments: Appointment[]) => {
      const now = new Date();

      appointments.forEach(appointment => {
        if (appointment.status === 'CANCELLED') {
          this.cancelledAppointments.push(appointment);
        } else if (appointment.status === 'CONFIRMED' && new Date(appointment.date) > now) {
          this.upcomingAppointments.push(appointment);
        } else if (appointment.status === 'CONFIRMED' && new Date(appointment.date) <= now) {
          appointment.status = AppointmentStatus.COMPLETED; // Cambiar el estado a COMPLETED
          this.appointmentService.updateAppointmentStatus(appointment.id, AppointmentStatus.COMPLETED).subscribe(response => {
            console.log('Appointment status updated to COMPLETED');
          }, error => {
            console.error('Error updating appointment status', error);
          });
          this.completedAppointments.push(appointment);
        }
      });
    });
  }


  onDateChange(event: any) {
    this.selectedDate = event.detail.value.split('T')[0];
   // const selectedDate = event.detail.value.split('T')[0]; // Solo obtener la fecha
   // console.log(selectedDate); // Esto imprimirá solo la fecha en formato "YYYY-MM-DD"
  }

  save(save: any) {
    console.log(this.selectedDate + " " + this.selectedSlot);
    this.selectedSlot = save;
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
    this.router.navigate(['/services-list'], {
      queryParams: {
        date: this.selectedDate,
        time: this.selectedSlot
      }
    });
    //this.util.navigateToPage('services-list');
  }



}
