import { Component, inject, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Appointment } from 'src/app/model/appointment.interface';

@Component({
  selector: 'app-confirmappointmentmodal',
  templateUrl: './confirmappointmentmodal.page.html',
  styleUrls: ['./confirmappointmentmodal.page.scss'],
})
export class ConfirmAppointmentModalPage implements OnInit {

  appointment: Appointment;
  appointmentTime: string;

  private modalController = inject(ModalController);
  private navParams       = inject(NavParams);

  constructor() { }

  ngOnInit() {
    // Recibe el appointment pasado al modal
    this.appointment = this.navParams.get('appointment');
    // Convierte appointmentTime a formato de 12 horas
    this.appointmentTime = this.convertTo12HourFormat(this.appointment.appointmentTime);
  }

  // Función para convertir el tiempo a formato de 12 horas
  convertTo12HourFormat(time: string): string {
    const [hour, minute] = time.split(':').map(Number); // Extrae hora y minutos del string
    const ampm = hour >= 12 ? 'PM' : 'AM';  // Determina si es AM o PM
    const formattedHour = hour % 12 || 12;  // Convierte a formato de 12 horas
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`; // Retorna el tiempo formateado
  }

  // Función para cerrar el modal sin confirmar
  dismiss(type: any) {
    this.modalController.dismiss(type);
  }

  // Función para confirmar el appointment
  confirmAppointment() {
    this.modalController.dismiss('confirm');  // Envía el resultado de confirmación
  }
}
