/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AppointmentStatus } from 'src/app/model/appointment.interface';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-cancel-modal',
  templateUrl: './cancel-modal.page.html',
  styleUrls: ['./cancel-modal.page.scss'],
})
export class CancelModalPage implements OnInit {

  appointmentId: string;

  private modalController    = inject(ModalController);
  private appointmentService = inject(AppointmentService);
  private navParams = inject(NavParams);

  constructor() { }

  ngOnInit() {
     // Obtén el appointmentId pasado al modal
     this.appointmentId = this.navParams.get('appointmentId');
     console.log('Appointment ID:', this.appointmentId); // Verifica que recibes el ID correctamente
  }

  dismiss(type: any) {
    this.modalController.dismiss(type);
  }

   // Método para cancelar la cita
   cancelarAppointment() {
    // Llama al servicio para actualizar el estado de la cita a "CANCELLED"
    this.appointmentService.updateAppointmentStatus(this.appointmentId, AppointmentStatus.CANCELED).subscribe(
      (response) => {
        console.log('Appointment cancelled:', response);
        this.dismiss('ok'); // Cierra el modal tras cancelar la cita
      },
      (error) => {
        console.error('Error cancelling appointment:', error); // Manejo de errores
      }
    );
  }

}
