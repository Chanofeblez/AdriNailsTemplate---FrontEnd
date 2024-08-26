import { Customer } from "./customer.interface";
import { Servicio, ServicioVariant } from "./manicure-service.interface";

export interface Appointment {
  id: string;
  user: Customer; // Tipo según tu modelo de usuario
  date: string;
  time: string;
  serviceName: Servicio;
  variantes: ServicioVariant[]; // Tipo según tus variantes
  totalCost: number;
  status: AppointmentStatus;
}

export enum AppointmentStatus {
  PENDING   = 'PENDING',
  UPCOMING  = 'UPCOMING',
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED'
}
