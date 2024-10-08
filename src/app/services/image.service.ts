import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../model/image.interface';
import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = `${base_url}/api/images`; // Asegúrate de que esta URL sea la correcta para tu backend

  private http = inject(HttpClient);

  constructor() { }

  getAllImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/all`);
  }

  uploadImage(title: string, type: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData, { responseType: 'text' });
  }
}
