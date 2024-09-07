import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = `${base_url}/api/courses`; // Asegúrate de que esta URL sea la correcta para tu backend


  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCourseById(courseId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${courseId}`);
  }

  getCourseVideos(courseId: string, userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${courseId}/videos?userId=${userId}`);
  }

  verifyPayment(courseId: string, userId: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/api/payments/verify?courseId=${courseId}&userId=${userId}`);
  }
}
