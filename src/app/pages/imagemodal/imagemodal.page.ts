import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-imagemodal',
  templateUrl: './imagemodal.page.html',
  styleUrls: ['./imagemodal.page.scss'],
})
export default class ImageModalPage implements OnInit {

  @Input() imageData: string;  // Recibe el Uint8Array

  private modalController = inject(ModalController);

  constructor() {
  }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }


}
