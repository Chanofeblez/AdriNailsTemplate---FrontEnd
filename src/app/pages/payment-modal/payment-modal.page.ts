import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Payments, payments } from '@square/web-sdk';
import { PaymentService } from 'src/app/services/payment.service';

declare var Square: any;

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit, AfterViewInit {

  private payments: any;
  private card: any;
  amount: number;
  sourceId: string;
  customerId: string;
  private locationId: string = 'L05J2ZG1FMA4X';

  private modalController = inject(ModalController);
  private navParams = inject( NavParams );
  private paymentService = inject( PaymentService );

  constructor() {
    this.amount = this.navParams.get('amount');
    this.customerId = this.navParams.get('customerId');
  }

  async ngOnInit() {
    console.log('Amount to charge:', this.amount);
    try {
      if (!window.Square) {
        throw new Error('Square.js failed to load properly');
      }
      this.payments = window.Square.payments('sandbox-sq0idb-zUxfDz2eqpyMIMWpmQci0w', this.locationId);
      await this.initializeCard(this.payments);
      console.log('Square PaymentForm initialized successfully. ---');

      // Add the event listener here, since the initialization of card is done
      document.getElementById('card-button')?.addEventListener('click', async (event) => {
        console.log('Square  ---');
        event.preventDefault();
        try {
          const result = await this.card.tokenize();
          if (result.status === 'OK') {
            this.processPayment(result.token); // Llama a processPayment con el token
          } else {
            console.error('Failed to tokenize card:', result.errors);
          }
        } catch (error) {
          console.error('Tokenization failed:', error);
        }
      });

    } catch (error) {
      console.error('Failed to initialize Square PaymentForm:', error);
    }
  }

  ngAfterViewInit(): void {
  }

  private async initializeCard(payments: any) {
    const card = await payments.card();
    await card.attach('#card-container');
    this.card = card;
  }


  private async processPayment(token: string) {
    console.log('Payment token:', token);
    // Logic to send the token to your server and process the payment
    try {
      const response = await this.paymentService.processPayment(token, this.amount, this.customerId, this.locationId).toPromise();
      console.log('Payment successful:', response);
      this.modalController.dismiss({
        status: 'success',
        payment: response
      });
    } catch (error) {
      console.error('Payment failed:', error);
      this.modalController.dismiss({
        status: 'failure',
        error: error
      });
    }
  }


  dismiss(type: any) {
    this.modalController.dismiss(type, 'ok');
  }

}
