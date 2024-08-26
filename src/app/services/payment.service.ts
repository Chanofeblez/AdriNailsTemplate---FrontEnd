import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);

  private apiUrl = `${base_url}/api/payments/charge`; // URL del endpoint de tu backend

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
