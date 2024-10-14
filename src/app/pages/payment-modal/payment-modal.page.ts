import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  idCourse: string;
  amount: number;
  sourceId: string;
  customerId: string;
  title: string;
  private locationId: string = 'L05J2ZG1FMA4X';

  private modalController = inject(ModalController);
  private navParams       = inject( NavParams );
  private paymentService  = inject( PaymentService );
  private router          = inject( Router );

  constructor() {
    this.title = this.navParams.get('title');
    this.idCourse = this.navParams.get('idCourse');
    console.log("this.idCourse",this.idCourse);
    this.amount = this.navParams.get('amount');
    this.customerId = this.navParams.get('customerId');
  }

  async ngOnInit() {
    console.log('Amount to charge:', this.amount);
    try {
      console.log('Band 1');
      if (!window.Square) {
        throw new Error('Square.js failed to load properly');
      }
      console.log('Band 2', this.locationId);
      this.payments = window.Square.payments('sandbox-sq0idb-zUxfDz2eqpyMIMWpmQci0w', this.locationId);
      console.log('Band 3', this.payments);
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
      console.log('token', token);
      console.log('this.id', this.idCourse);
      console.log('this.amount', this.amount);
      console.log('this.customerId', this.customerId);
      console.log('this.locationId', this.locationId);
      const response = await this.paymentService.processPayment(token, this.amount, this.customerId, this.locationId, this.idCourse).toPromise();
      console.log('Payment successful:', response);

      this.modalController.dismiss({
        status: 'success',
        payment: response
      });

      // Redirige al usuario a /tabs/courses-details después del pago exitoso
      this.router.navigate(['/tabs/courses-details'], {
        queryParams: {
          id: this.idCourse,  // Por ejemplo, el ID del curso
          amount: this.amount,
          customerId: this.customerId
        }
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
