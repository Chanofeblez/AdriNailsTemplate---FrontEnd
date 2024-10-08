import { Component, inject, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

declare var SqPaymentForm: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent  implements OnInit {

  paymentForm: any;

  public paymentService = inject(PaymentService);

  ngOnInit(): void {
    this.paymentForm = new SqPaymentForm({
      applicationId: 'your-square-application-id',
      inputClass: 'sq-input',
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: '**** **** **** ****'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: 'Postal'
      },
      callbacks: {
        cardNonceResponseReceived: (errors: any[], nonce: string, cardData: any) => {
          if (errors) {
            console.error('Encountered errors:', errors);
            return;
          }
          // Send the nonce to the backend for payment processing
          this.processPayment(nonce);
        }
      }
    });
    this.paymentForm.build();
  }

  onGetCardNonce(): void {
    this.paymentForm.requestCardNonce();
  }

  processPayment(nonce: string): void {
    const amount = this.getCourseAmount();
    const customerId = this.getCustomerId();
    const locationId = 'your-location-id';

    this.paymentService.processPayment(nonce, amount, customerId, locationId)
    .subscribe((response: any) => {  // Tipado explícito
        console.log('Payment successful:', response);
      }, (error: any) => {  // Tipado explícito
        console.error('Payment failed:', error);
      });
  }

  getCourseAmount(): number {
    // Implementa la lógica para obtener el monto del curso
    return 5;  // Un ejemplo de dónde podrías obtenerlo
  }

  getCustomerId(): string {
    // Implementa la lógica para obtener el ID del cliente
    return "this.customer.id";  // Un ejemplo de dónde podrías obtenerlo
  }

}
