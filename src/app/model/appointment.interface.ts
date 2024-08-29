import { Customer } from "./customer.interface";
import { Servicio, ServicioVariant } from "./manicure-service.interface";

export interface Appointment {
  id?: string;
  customerEmail: string; // El email del cliente, en lugar del objeto Customer
  serviceName: string; // ID del servicio, en lugar del objeto Servicio
  serviceVariantIds: string[]; // Lista de IDs de las variantes de servicio, en lugar de objetos ServicioVariant
  appointmentDate: string; // Fecha de la cita en formato 'yyyy-MM-dd'
  appointmentTime: string; // Hora de la cita en formato 'HH:mm:ss'
  totalCost: number; // Costo total de la cita
  status: AppointmentStatus; // Estado de la cita
}

export enum AppointmentStatus {
  PENDING   = 'PENDING',
  UPCOMING  = 'UPCOMING',
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED'
}

