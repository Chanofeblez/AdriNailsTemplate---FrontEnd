/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Image } from 'src/app/model/image.interface';
import { ImageService } from 'src/app/services/image.service';
import { UtilService } from 'src/app/services/util.service';
import ImageModalPage from '../imagemodal/imagemodal.page';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  //All Chat Page
  segment: any = 'manicure';

  //Load Image
  imageList: Image[] = [];
  manicureImages: Image[] = [];
  pedicureImages: Image[] = [];

  //Save Image
  selectedFile: File | null = null;
  imageType: string = '';
  imageTitle: string = 'Default Title';

  public util             = inject(UtilService);
  private imageService    = inject(ImageService);
  private alertController = inject(AlertController);
  private router          = inject(ActivatedRoute);
  private modalController = inject(ModalController);
  private loadingController = inject(LoadingController);

  constructor() {
    this.segment = 'manicure';
  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.segment = params['type'] ? params['type'] : 'manicure';
    });
    this.loadImages();
  }

  //Load Image
  loadImages() {
    // Mostrar el loader antes de iniciar la carga
    this.presentLoading().then((loading) => {
      this.imageService.getAllImages().subscribe(
        (images: Image[]) => {
          // Vaciar las listas antes de llenarlas de nuevo
          this.manicureImages = [];
          this.pedicureImages = [];

          this.imageList = images;
          this.imageList.forEach((image, index) => {
            const base64Data = image.data; // El data ya está en Base64
            const imageUrl = `data:${image.contentType};base64,${base64Data}`;
            this.imageList[index].imageUrl = imageUrl;
            // Filtrar por tipo
            if (image.type === 'Manicure') {
              this.manicureImages.push(this.imageList[index]);
            } else if (image.type === 'Pedicure') {
              this.pedicureImages.push(this.imageList[index]);
            }
          });

          // Ocultar el loader cuando las imágenes hayan cargado
          this.dismissLoading(loading);
        },
        (error) => {
          console.error('Error loading images', error);
          // Ocultar el loader en caso de error también
          this.dismissLoading(loading);
        }
      );
    });
  }


  //Save Image
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      console.log("Titulo", this.imageTitle);
      console.log("Type", this.imageType);
      console.log("File", this.selectedFile);
      this.uploadImage(this.imageTitle, this.imageType, this.selectedFile);
    }
  }

  private uploadImage(title: string, type: string, image: File) {
    this.imageService.uploadImage(title, type, image).subscribe(
      async (response:any) => {
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Image uploaded successfully!',
          buttons: ['OK']
        });
        await alert.present();
        this.loadImages();
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'There was a problem uploading the image.',
          buttons: ['OK']
        });
        console.log("image error",error.message);
        console.error("image error11",error);
        await alert.present();
      }
    );
  }

  //All Chat Page
  segmentChanged() {
    console.log(this.segment);
  }

  onInbox(index: number, name: any) {
    const param: NavigationExtras = {
      queryParams: {
        id: index
      }
    };
    this.util.navigateToPage('chats', param);
  }

  async openImageModal(imageUrl: string) {
    if (!imageUrl) {
      console.error('El valor de imageUrl es undefined o null.');
      return;
    }
    const modal = await this.modalController.create({
      component: ImageModalPage,
      componentProps: { imageData: imageUrl },
      backdropDismiss: true, // Permitir cerrar el modal al tocar fuera
    });
    // Presentar el modal
    await modal.present();

    // Acceder directamente al elemento modal
    modal.classList.add('transparent-modal'); // Añadir la clase CSS personalizada
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading images...',
      spinner: 'bubbles', // Puedes cambiar el tipo de spinner ('lines', 'bubbles', etc.)
    });
    await loading.present();
    return loading;
  }

  async dismissLoading(loading: HTMLIonLoadingElement) {
    await loading.dismiss();
  }

}
