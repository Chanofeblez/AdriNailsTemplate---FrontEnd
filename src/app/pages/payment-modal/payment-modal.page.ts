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
  private locationId: string = 'LVP1EHWFCX2NX';

  private modalController = inject(ModalController);
  private navParams       = inject( NavParams );
  private paymentService  = inject( PaymentService );
  private router          = inject( Router );

  constructor() {
    this.title = this.navParams.get('title');
    this.idCourse = this.navParams.get('idCourse');
    this.amount = this.navParams.get('amount');
    this.customerId = this.navParams.get('customerId');

  }

  async ngOnInit() {
    try {
      if (!window.Square) {
        throw new Error('Square.js failed to load properly');
      }
      this.payments = window.Square.payments('sq0idp-zVPdHkA_l-DgpgQwq7cJmA', this.locationId);
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
    // Logic to send the token to your server and process the payment
    try {
      const response = await this.paymentService.processPayment(token, this.amount, this.customerId, this.locationId, this.idCourse).toPromise();
      console.log("response",response);
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

    } catch (error:any) {
      console.error('Payment failed:', error.error);
      console.log('this.amount:', this.amount);
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
