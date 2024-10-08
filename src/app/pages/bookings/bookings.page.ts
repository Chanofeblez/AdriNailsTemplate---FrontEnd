/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController, NavController, ToastController } from '@ionic/angular';
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

  @ViewChild(IonDatetime, { static: false }) dateTime!: IonDatetime;

  segment: any = 'book';
  minDate: string;
  userId: string;
  user: Customer;
  serviceImageUrl: string;
  selectedDate: string | null = null;
  previusselectedDate: string | null = null;
  selectedSlot: string | null = null;
  formattedSlot: { time: string, isAvailable: boolean }[] = [];
  availableSlots: string[] = []; // Horarios disponibles después de filtrar


  upcomingAppointments: Appointment[] = [];
  completedAppointments: Appointment[] = [];
  cancelledAppointments: Appointment[] = [];

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

  public util = inject(UtilService);
  private modalController = inject(ModalController);
  private navCtrl = inject(NavController);
  private router = inject(Router);
  private appointmentService = inject(AppointmentService);
  private authService = inject(AuthService);
  private servicioService = inject(ServicioService);
  private cdr = inject(ChangeDetectorRef);
  private toastController = inject(ToastController);

  constructor() {
    const today = new Date();
    const day = ('0' + today.getDate()).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();

    this.minDate = `${year}-${month}-${day}`;
  }

  ngOnInit() {
    this.getUserByToken();
  }

  // Este método se ejecuta cada vez que se entra en la vista
  ionViewWillEnter() {
    this.resetDate();
    this.cdr.detectChanges(); // Forzar la detección de cambios
    this.getUserAppointment(this.userId);
  }

  // Método para resetear la fecha seleccionada
  resetDate() {
    this.cdr.detectChanges();
    this.previusselectedDate = null;
    this.selectedDate = null; // Reinicia el valor de la fecha seleccionada
    this.selectedSlot = null;
    console.log("this.selectedDate", this.selectedDate);
    console.log("this.selectedSlot", this.selectedSlot);
  }

  loadAvailableSlots(selectedDate: string) {
    this.availableSlots = [];
    this.formattedSlot = [];
    this.appointmentService.loadAvailableSlots(selectedDate).subscribe((slots: string[]) => {
      this.availableSlots = slots;
      console.log("Available", this.availableSlots);

      // Lista de todos los slots
      const allSlots = ['10:00:00', '13:00:00', '15:00:00', '17:00:00'];

      // Compara todos los slots con los disponibles
      allSlots.forEach(slot => {
        const isAvailable = this.availableSlots.includes(slot); // Verifica si el slot está disponible
        const formattedSlot = this.convertTo12HourFormat(slot); // Convierte el slot al formato de 12 horas

        // Agrega el slot formateado al arreglo formattedSlots
        this.formattedSlot.push({ time: formattedSlot, isAvailable: isAvailable });
      });
      // Ahora tienes el array formattedSlots con los slots en formato de 12 horas y su disponibilidad
      console.log("formattedSlots", this.formattedSlot);
    });
  }

  convertTo12HourFormat(time: string): string {
    let [hour, minute] = time.split(':');
    let hourInt = parseInt(hour);

    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    hourInt = hourInt % 12 || 12; // Convierte 0 a 12 y mantiene el resto

    return `${hourInt}:${minute} ${ampm}`;
  }

  convertTo24HourFormat(time: string): string {
    let [hour, minuteWithAMPM] = time.split(':');
    let minute = minuteWithAMPM.slice(0, 2); // Extrae los minutos (primeros 2 caracteres)
    let ampm = minuteWithAMPM.slice(3).trim(); // Extrae AM o PM

    let hourInt = parseInt(hour);

    if (ampm === 'PM' && hourInt < 12) {
      hourInt += 12; // Convierte a formato de 24 horas
    }

    if (ampm === 'AM' && hourInt === 12) {
      hourInt = 0; // Convierte medianoche a 00:00 en formato 24 horas
    }

    return `${hourInt.toString().padStart(2, '0')}:${minute}:00`; // Retorna en formato HH:mm:ss
  }

  save(time: string) {
    // Convierte el slot seleccionado a string antes de compararlo
    const selectedSlotString = this.selectedSlot ? this.selectedSlot.toString() : null;

    // Extrae la hora de `time` como número en formato de 24 horas
    const [hour, minuteWithAMPM] = time.split(':');
    let hourInt = parseInt(hour, 10);
    const ampm = minuteWithAMPM.slice(3).trim(); // Extrae AM o PM

    if (ampm === 'PM' && hourInt < 12) hourInt += 12; // Convierte a formato 24h
    if (ampm === 'AM' && hourInt === 12) hourInt = 0;  // Maneja la medianoche como 00

    // Formatea el slot a HH:mm:ss
    const formattedSlot = `${hourInt.toString().padStart(2, '0')}:${minuteWithAMPM.slice(0, 2)}:00`;

    // Si el slot que se hace clic es el mismo que el seleccionado, lo deselecciona
    if (selectedSlotString === formattedSlot) {
      this.selectedSlot = null; // Deselecciona el slot
    } else {
      this.selectedSlot = formattedSlot; // Selecciona el slot como cadena en formato HH:mm:ss
    }

    console.log(this.selectedDate + " " + this.selectedSlot);
  }

  onDateChange(event: any) {
    const newSelectedDate = this.formatDate(event.detail.value); // Formatea la nueva fecha seleccionada
    console.log('Fecha newSelectedDate:', newSelectedDate);
    console.log('this.previusselectedDate', this.previusselectedDate);
    // Si la nueva fecha es la misma que la ya seleccionada, deselecciona la fecha
    if (this.previusselectedDate === newSelectedDate) {
      this.previusselectedDate = null;
      this.selectedDate = null;
      this.selectedSlot = null; // También deselecciona el slot si la fecha se deselecciona
      console.log('Fecha deseleccionada');

      // Reinicia el ion-datetime directamente
      this.resetIonDatetime();

      // Limpia los slots visualmente también
      this.formattedSlot = []; // Asegúrate de que esta variable controla la visualización de los slots
    } else {
      this.previusselectedDate = newSelectedDate; // Si es una fecha diferente, selecciona la nueva fecha
      this.selectedDate = newSelectedDate;
      this.selectedSlot = null; // Reinicia el slot seleccionado
      console.log('Fecha seleccionada:', this.previusselectedDate);

      // Cargar los horarios disponibles para la fecha seleccionada
      this.loadAvailableSlots(this.previusselectedDate);
    }
  }

  formatDate(date: string): string {
    return date.split('T')[0]; // Extrae solo la parte de la fecha "YYYY-MM-DD"
  }

  // Método para reiniciar ion-datetime
  resetIonDatetime() {
    if (this.dateTime) {
      this.dateTime.reset(); // Reinicia el ion-datetime
    }
  }

  getUserByToken() {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);
    if (token) {
      this.authService.getUserByToken(token).subscribe(
        (response: any) => {
          console.log('Customer:', response);
          // Ahora response es un objeto Customer completo
          this.userId = response.id;  // O maneja cualquier campo necesario
          console.log('Customer ID:', this.userId);

          // Llama directamente a getUser() después de obtener el userId
          this.getUserAppointment(this.userId);
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

  async getUserAppointment(userId: string) {
    this.upcomingAppointments = [];
    this.completedAppointments = [];
    this.cancelledAppointments = [];

    try {
      const appointments = await this.appointmentService.getUserAppointments(userId).toPromise();
      if (!appointments || appointments.length === 0) {
        console.log('No appointments found or appointment is undefined');
        return; // Salir de la función si no hay citas
      }

      const now = new Date(); // Obtener la fecha y hora actual
      console.log('Appointments:', appointments);

      for (const appointment of appointments) {
        const appointmentDateTime = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`);
        if (appointment.status === 'CANCELED') {
          this.cancelledAppointments.push(appointment);
        } else if (appointment.status === 'COMPLETED') {
          this.completedAppointments.push(appointment);
        } else if (appointment.status === 'CONFIRMED' || appointment.status === 'PENDING' || appointment.status === 'UPCOMING') {
          if (appointmentDateTime > now) {
            this.upcomingAppointments.push(appointment);
          } else if (appointmentDateTime <= now) {
            // Cambiar el estado a COMPLETED si la cita ya pasó
            if (appointment.id) {
              appointment.status = AppointmentStatus.COMPLETED;
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
      }

      // Ordenar las listas por fecha
      const sortByDate = (a: Appointment, b: Appointment) =>
        new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime();

      this.upcomingAppointments.sort(sortByDate);
      this.completedAppointments.sort(sortByDate);
      this.cancelledAppointments.sort(sortByDate);

      console.log('LISTAUP:', this.upcomingAppointments);
      console.log('LISTASCOMP:', this.completedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  getServiceImageUrl(serviceName: string) {
    this.servicioService.getServiceImageUrl(serviceName).subscribe(imageUrl => {
      this.serviceImageUrl = imageUrl;
    });
  }

  isSlotSelected(itemTime: string): boolean {
    // Obtén solo la hora de itemTime y compárala con selectedSlot
    const timeIn24HourFormat = this.convertTo24HourFormat(itemTime); // Convierte itemTime a 24 horas
    return this.selectedSlot === timeIn24HourFormat; // Compara con el selectedSlot
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

  review(appointmentId: string | undefined) {
    if (!appointmentId) {
      console.error('appointmentId is undefined or null');
      return;
    }
    this.util.navigateToPage(`/tabs/review/${appointmentId}`);
  }

  async presentModal(appointmentId: string, email: string) {
    const modal = await this.modalController.create({
      component: CancelModalPage,
      cssClass: 'bookmark-modal',
      componentProps: {
        'appointmentId': appointmentId // Pasa el appointmentId aquí
      }
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.getUserAppointment(email);
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
    if (this.selectedSlot != null) {
      // Convertir el slot a string antes de pasarlo a la función
      const selectedSlotString = this.selectedSlot.toString();
      // Convertir el slot a formato de 24 horas
      const slotIn24HourFormat = this.convertTo24HourFormat(selectedSlotString);
      console.log("Slot en formato de 24 horas:", slotIn24HourFormat);

      this.router.navigate(['/tabs/services-list'], {
        queryParams: {
          user: this.userId,
          date: this.selectedDate,
          time: slotIn24HourFormat // Envía el slot en formato de 24 horas al backend
        }
      });
    }
  }

  // Método para cambiar el estado de la cita
  async cambiarStatus(appointmentId: string, appointmentDate: string, appointmentTime: string) {
    try {
      // Llamar a un servicio para verificar la disponibilidad
      const isAvailable = await this.appointmentService.checkAvailability(appointmentDate, appointmentTime).toPromise();
      console.log("isAvailable", isAvailable);

      if (isAvailable) {
        // Si está disponible, proceder a cambiar el estado
        this.appointmentService.updateAppointmentStatus(appointmentId, AppointmentStatus.CONFIRMED).subscribe(
          async (response) => {
            console.log('Appointment Recuperada:', response);

            // Mostrar un toast de éxito
            const toast = await this.toastController.create({
              message: 'Your booking has been successfully restored.',
              duration: 3000,
              color: 'success',
              position: 'bottom'
            });
            await toast.present();

            this.getUserByToken(); // Llama a getToken() si todo salió bien
          },
          async (error) => {
            console.error('Failed to restore your booking:', error);

            // Mostrar un toast de error
            const toast = await this.toastController.create({
              message: 'Failed to restore your booking. Please try again.',
              duration: 3000,
              color: 'danger',
              position: 'bottom'
            });
            await toast.present();
          }
        );
      } else {
        // Si no está disponible, mostrar un mensaje al usuario
        const toast = await this.toastController.create({
          message: 'The selected time is no longer available. Please choose a different time.',
          duration: 3000,
          color: 'warning',
          position: 'bottom'
        });
        await toast.present();
      }
    } catch (error) {
      console.error('Error checking availability:', error);

      // Mostrar un mensaje de error si ocurre algún problema en la verificación
      const toast = await this.toastController.create({
        message: 'An error occurred while checking the availability. Please try again.',
        duration: 3000,
        color: 'danger',
        position: 'bottom'
      });
      await toast.present();
    }
  }



}
