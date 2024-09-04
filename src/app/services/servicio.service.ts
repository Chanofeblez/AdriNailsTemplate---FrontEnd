import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Servicio } from '../model/manicure-service.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private apiUrl = `${base_url}/api/services`;

  private http = inject(HttpClient);

  constructor() { }

  // Método para obtener todos los servicios
  getAllServicios(): Observable<Servicio[]> {
    console.log(this.http.get<Servicio[]>(this.apiUrl));
    return this.http.get<Servicio[]>(this.apiUrl);
  }

  // Método para obtener un servicio por su ID
  getServicioById(id: string): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/${id}`);
  }

  getServicioByName(name: string): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/by-name`, { params: { name } });
  }

  // Método para obtener la URL de la imagen basado en el nombre del servicio
  getServiceImageUrl(serviceName: string): Observable<string> {
    return this.getServicioByName(serviceName).pipe(
      map(servicio => servicio.imagePath)  // Suponiendo que el DTO tiene una propiedad imageUrl
    );
  }
}
