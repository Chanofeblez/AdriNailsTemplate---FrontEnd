/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { PaymentService } from 'src/app/services/payment.service';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { PaymentModalPage } from '../payment-modal/payment-modal.page';
import { Course } from 'src/app/model/course.interface';

@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.page.html',
  styleUrls: ['./packages-list.page.scss'],
})

export class PackagesListPage{

  paidCourses: number[] = []; // Aquí almacenamos los IDs de los cursos pagados
  courses: any[] = [];
  userEmail: string;
  userId: string;
  isLoggedIn: boolean = false; // Cambia a true cuando el usuario está logueado
  isLoading: boolean = false; // Variable para controlar el loading

  private courseService = inject(CourseService);
  public router = inject(Router);
  public paymentService = inject(PaymentService);
  public authService = inject(AuthService);
  public modalController = inject(ModalController);
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController);
  private navCtrl = inject(NavController);

  constructor() { }

  async ionViewDidEnter() {
    try {
      // Mostrar el loading
      this.showLoading();

      // Verificar si el usuario está logueado
      this.checkLoginStatus();

      // Obtener todos los cursos
      this.courseService.getCourses().subscribe(data => {
        this.courses = data;
        this.hideLoading(); // Ocultar el loading cuando los cursos se cargan
      });

      // Llamar al método que maneja la obtención del usuario por token y esperar que termine
      await this.getUserByToken();

      // Ahora que ya tenemos el userId desde getUserByToken, obtenemos los cursos pagados usando el userId
      if (this.userId) {
        this.courseService.getPaidCourses(this.userId).subscribe(
          (courses: number[]) => {
            this.paidCourses = courses;
          },
          error => {
            console.error("Error obteniendo los cursos pagados:", error);
          }
        );
      } else {
        console.error("UserId no está definido");
      }
    } catch (error) {
      console.error('Error en ionViewDidEnter:', error);
      //this.hideLoading(); // Ocultar el loading en caso de error
    }
  }

  ionViewWillLeave() {
    // Cierra el loading si aún está activo al salir de la pantalla
    console.log("CERRAR");
    this.hideLoading();
  }

  async showLoading() {
    if (!this.isLoading) {
      this.isLoading = true;
      const loading = await this.loadingController.create({
        message: 'Loading courses...',
        spinner: 'circles',
      });
      await loading.present();
    }
  }

  async hideLoading() {
    if (this.isLoading) {
      this.isLoading = false;
      try {
        await this.loadingController.dismiss();
      } catch (error) {
        console.error("Error al cerrar el loading:", error);
      }

    }
  }


  async getUserByToken(): Promise<void> {
    const token = localStorage.getItem('authToken');

    if (token) {
      return this.authService.getUserByToken(token).toPromise().then((response: any) => {
        // Ahora response es un objeto Customer completo
        this.userId = response.id; // O maneja cualquier campo necesario
      }).catch(error => {
        console.error('Error al obtener el cliente:', error);
        throw error;
      });
    } else {
      return Promise.reject('Token no encontrado');
    }
  }

  async buyCourse(course: Course) {
    console.log("item",course);
    // Verificar si el usuario no está logueado
    if (!this.isLoggedIn) {
      await this.presentLoginToast(); // Mostrar el toast para que el usuario inicie sesión
      return;
    }

    // No es necesario obtener nuevamente el userId si ya está disponible
    if (!this.userId) {
      console.error('No se encontró el userId');
      return;
    }

    // Prepara los datos para el modal de pago
    const idCourse = course.id;
    const amount = course.price;
    const customerId = this.userId;


    // Abre el modal de pago
    const modal = await this.modalController.create({
      component: PaymentModalPage,
      cssClass: 'bookmark-modal',
      componentProps: {
        title: "Pay Course",
        idCourse: idCourse,
        amount: amount,
        customerId: customerId
      },
    });

    // Manejo del resultado del modal
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data.status === 'success') {
        console.log('Payment successful', dataReturned.data.payment);

         // Mostrar un toast de éxito de pago
    this.presentPaymentSuccessToast();

    console.log("item.videoPath", course.videoPaths);

        // Solo redirigir si el pago fue exitoso
        const param: NavigationExtras = {
          queryParams: {
            id: course.id,
            name: course.title,
            image: course.imagePath,
            description: course.description,
            pdfPaths: JSON.stringify(course.pdfPaths),
            videoPaths: JSON.stringify(course.videoPaths)
          }
        };
        // Redirige solo después de un pago exitoso
        this.router.navigate(['/tabs/courses-details'], param);
      } else {
        console.error('Payment failedd', dataReturned.data.error.error);
        // Mostrar un mensaje o alerta indicando que el pago falló
        this.presentPaymentFailedToast(dataReturned.data.error.error); // Puedes implementar este método para notificar el error
      }
    });

    return await modal.present();
  }

  async presentPaymentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Payment successful!',
      duration: 2000,  // El toast desaparecerá después de 2 segundos
      color: 'success',
      position: 'bottom'  // Puedes cambiar la posición a 'top', 'middle' o 'bottom'
    });
    toast.present();
  }

  async presentPaymentFailedToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3500,  // Duración del toast en milisegundos
      position: 'bottom',  // Posición del toast (puede ser 'top', 'middle', 'bottom')
      color: 'danger',  // Color del toast (puedes usar 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', etc.)
    });
    toast.present();
  }

  async presentLoginToast() {
    const toast = await this.toastController.create({
      message: 'You need to be logged in to proceed. Do you want to login?',
      duration: 5000,
      buttons: [
        {
          text: 'Login',
          handler: () => {
            this.navCtrl.navigateForward('/login'); // Redirige a la página de login
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // Cierra el toast y no hace nada
          handler: () => {
            console.log('User canceled login');
          }
        }
      ]
    });
    await toast.present();
  }

  onBack() {
    //this.util.onBack();
  }

  onPayment() {
    this.router.navigate(['select-slot']);
  }

  onCourseSelected(course: Course) {
    const param: NavigationExtras = {
      queryParams: {
        id: course.id,
        name: course.title,
        image: course.imagePath,
        description: course.description,
        pdfPaths: JSON.stringify(course.pdfPaths),
      videoPaths: JSON.stringify(course.videoPaths)
      }
    };
    this.router.navigate(['/tabs/courses-details'], param);
  }

  // Método para verificar si el cliente está logueado
  checkLoginStatus() {
    this.authService.isLoggedIn().subscribe(isLogged => {
      this.isLoggedIn = isLogged; // Aquí asignas el valor booleano
    }, error => {
      console.error('Error checking login status:', error);
      this.isLoggedIn = false; // En caso de error, lo manejas adecuadamente
    });
  }

  // Método que verifica si un curso ha sido pagado
  isCoursePaid(course: any): boolean {
    return this.paidCourses.some((paidCourse: any) => paidCourse.id === course.id);
  }
}
