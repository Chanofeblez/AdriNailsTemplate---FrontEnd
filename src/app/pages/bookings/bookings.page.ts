/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { IonDatetime, ModalController, ToastController } from '@ionic/angular';
import { CancelModalPage } from '../cancel-modal/cancel-modal.page';
import { Router } from '@angular/router';
import { Appointment, AppointmentStatus } from 'src/app/model/appointment.interface';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/model/customer.interface';
import { ServicioService } from 'src/app/services/servicio.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage {

  @ViewChild('datePicker', { static: false }) datePicker: IonDatetime;

  segment: any = 'book';
  minDate: string;
  userId: string;
  userEmail: string;
  user: Customer;
  serviceImageUrl: string;
  selectedDate: string | null = null;
  previusselectedDate: string | null = null;
  selectedSlot: string | null = null;
  formattedSlot: { time: string, isAvailable: boolean }[] = [];
  availableSlots: string[] = []; // Horarios disponibles después de filtrar
  isLoading : boolean = true;

  upcomingAppointments: Appointment[] = [];
  completedAppointments: Appointment[] = [];
  cancelledAppointments: Appointment[] = [];

  selectedSpecialist: any = '';

  public location = inject(Location);
  private modalController = inject(ModalController);
  private router = inject(Router);
  private appointmentService = inject(AppointmentService);
  private authService = inject(AuthService);
  private servicioService = inject(ServicioService);
  private cdr = inject(ChangeDetectorRef);
  private toastController = inject(ToastController);

  categories: any[] = [
    {
      "name": "manicures",
      "image": "assets/images/category/9.png"
    },
    {
      "name": "pedicures",
      "image": "assets/images/category/10.png"
    }
  ];

  constructor() {
    const today = new Date();
    const day = ('0' + today.getDate()).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();

    this.minDate = `${year}-${month}-${day}`;
  }

  // Este método se ejecuta cada vez que se entra en la vista
  async ionViewWillEnter() {
    this.segment = 'book';
    this.resetDate(); // Limpia las fechas y slots seleccionados
    this.resetIonDatetime(); // Resetea el ion-datetime al estado inicial

    try {
      await this.getUserByToken();
      this.getUserAppointment(this.userEmail); // Carga las citas del usuario
      this.cdr.detectChanges(); // Asegura que la vista esté actualizada
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
    }
  }


  // Método para resetear la fecha seleccionada
  resetDate() {
    this.cdr.detectChanges();
    this.previusselectedDate = null; // Resetea la fecha seleccionada previamente
    this.selectedDate = null; // Limpia la fecha seleccionada
    this.selectedSlot = null; // Limpia el slot seleccionado
    this.formattedSlot = []; // Limpia los slots formateados
  }

  // Método para reiniciar ion-datetime
  resetIonDatetime() {
    if (this.datePicker) {
      this.datePicker.value = ''; // Limpia el valor del datetime
      this.datePicker.reset(); // Resetea el estado del componente
      this.cdr.detectChanges(); // Fuerza la detección de cambios en la vista
    }
  }

  onDateChange(event: any) {
    // Verifica si el evento tiene un valor válido antes de continuar
    if (!event || !event.detail || !event.detail.value) {
      return; // Salir del método si el evento no tiene datos
    }

    const newSelectedDate = this.formatDate(event.detail.value); // Formatea la nueva fecha seleccionada

    if (this.previusselectedDate === newSelectedDate) {
      // Si la misma fecha es seleccionada, resetea el componente
      this.previusselectedDate = null;
      this.selectedDate = null;
      this.selectedSlot = null; // Deselecciona el slot seleccionado
      this.formattedSlot = []; // Limpia los slots visualmente
      this.resetIonDatetime(); // Reinicia el ion-datetime
      return;
    }

    // Si es una nueva fecha, actualiza los valores
    this.previusselectedDate = newSelectedDate;
    this.selectedDate = newSelectedDate;
    this.selectedSlot = null; // Reinicia el slot seleccionado

    // Carga los horarios disponibles para la nueva fecha seleccionada
    this.loadAvailableSlots(this.previusselectedDate);
  }



  async loadAvailableSlots(selectedDate: string) {
    this.isLoading = true;
    this.availableSlots = [];
    this.formattedSlot = [];

    try {
      // Espera a que la respuesta del servicio se resuelva
      const slots = await this.appointmentService.loadAvailableSlots(selectedDate).toPromise();
      this.availableSlots = slots;

      const allSlots = ['10:00:00', '13:00:00', '15:00:00', '17:00:00'];
      allSlots.forEach(slot => {
        const isAvailable = this.availableSlots.includes(slot);
        const formattedSlot = this.convertTo12HourFormat(slot);
        this.formattedSlot.push({ time: formattedSlot, isAvailable });
      });
    } catch (error) {
      console.error('Error loading slots:', error);
    } finally {
      // Asegúrate de que isLoading sea false al terminar, ya sea que haya éxito o error
      this.isLoading = false;
    }
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
  }

  formatDate(date: string): string {
    return date.split('T')[0]; // Extrae solo la parte de la fecha "YYYY-MM-DD"
  }

  getUserByToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.authService.getUserByToken(token).subscribe(
          (response: any) => {
            this.userId = response.id;
            this.userEmail = response.email;
            resolve(); // Llamamos a resolve cuando se obtenga la respuesta
          },
          (error) => {
            console.error('Error al obtener el cliente:', error);
            reject(error); // Llamamos a reject en caso de error
          }
        );
      } else {
        console.log('Token no found');
        reject('Token no found');
      }
    });
  }

  async getUserAppointment(userId: string) {
    this.upcomingAppointments = [];
    this.completedAppointments = [];
    this.cancelledAppointments = [];

    try {
      const appointments = await this.appointmentService.getUserAppointments(userId).toPromise();
      if (!appointments || appointments.length === 0) {
        return; // Salir de la función si no hay citas
      }

      const now = new Date(); // Obtener la fecha y hora actual

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
    this.router.navigate(['e-receipt']);
  }

  review(appointmentId: string | undefined) {
    if (!appointmentId) {
      console.error('appointmentId is undefined or null');
      return;
    }
    this.router.navigate([`/tabs/review/${appointmentId}`]);
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
        this.router.navigate(['cancel-booking']);
      }
    });
    await modal.present();

  }

  onBack() {
    this.location.back();
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

      this.router.navigate(['/tabs/services-list'], {
        queryParams: {
          user: this.userEmail,
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
