import { ServicioVariant } from "./manicure-service.interface";

export interface Appointment {
  user: any; // Tipo según tu modelo de usuario
  date: string;
  time: string;
  serviceName: string;
  variantes: ServicioVariant[]; // Tipo según tus variantes
  totalCost: number;
}
