/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Image } from 'src/app/model/image.interface';
import { ImageService } from 'src/app/services/image.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  //All Chat Page
  segment: any = 'chats';

  //Load Image
  imageList: Image[] = [];

  //Save Image
  selectedFile: File | null = null;
  imageTitle: string = 'Default Title';

  public util             = inject(UtilService);
  private imageService    = inject(ImageService);
  private alertController = inject(AlertController);

  constructor() { }

  ngOnInit() {
    this.loadImages();
  }

  //Load Image
  loadImages() {
    this.imageService.getAllImages().subscribe(
        (images: Image[]) => {
            this.imageList = images;
            this.imageList.forEach((image, index) => {
                const base64Data = image.data; // El data ya está en Base64
                const imageUrl = `data:${image.contentType};base64,${base64Data}`;
                this.imageList[index].imageUrl = imageUrl;
            });
            console.info('Images', this.imageList);
        },
        (error) => {
            console.error('Error loading images', error);
        }
    );
}

  //Save Image
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      console.log("Titulo", this.imageTitle);
      console.log("File", this.selectedFile);
      this.uploadImage(this.imageTitle, this.selectedFile);
    }
  }

  private uploadImage(title: string, image: File) {
    this.imageService.uploadImage(title, image).subscribe(
      async (response:any) => {
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Image uploaded successfully!',
          buttons: ['OK']
        });
        await alert.present();
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

}
