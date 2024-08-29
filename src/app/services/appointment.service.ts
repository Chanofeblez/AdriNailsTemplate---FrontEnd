import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Appointment } from '../model/appointment.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LocalTime } from '../model/localtime.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = `${base_url}/api/appointments`; // Asegúrate de que este endpoint sea correcto
  private apiUrlSlot = `${base_url}/api/slots`;
  private http = inject(HttpClient);

  constructor() { }

  // Método para crear un appointment
  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointmentById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  getUserAppointments(userId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/user/${userId}`);
  }

  updateAppointment(id: string, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointment);
  }

  updateAppointmentStatus(appointmentId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${appointmentId}/status`, { status: status });
}

  deleteAppointment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  loadAvailableSlots(selectedDate: string): Observable<number[]> { // Asegúrate de que LocalTime[] sea el tipo correcto
    return this.http.get<number[]>(`${this.apiUrlSlot}/available`, {
      params: { date: selectedDate },
    });
  }

  reserveSlots(date: string, time: string): Observable<any> {
    const slot = { date, time };
    return this.http.post(`${this.apiUrlSlot}/reserve`, slot);
  }



}
