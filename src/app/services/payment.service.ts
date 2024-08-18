import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8081/api/payments/charge'; // URL del endpoint de tu backend

  constructor() { }

  processPayment(sourceId: string, amount: number, customerId: string, locationId: string): Observable<any> {
    const paymentRequest = {
      sourceId: sourceId,
      amount: amount,
      customerId: customerId,
      locationId: locationId
    };

    return this.http.post<any>(this.apiUrl, paymentRequest);
  }
}
