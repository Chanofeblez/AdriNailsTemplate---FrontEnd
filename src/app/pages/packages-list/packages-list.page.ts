/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UtilService } from 'src/app/services/util.service';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { PaymentModalPage } from '../payment-modal/payment-modal.page';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.page.html',
  styleUrls: ['./packages-list.page.scss'],
})

export class PackagesListPage implements OnInit {

  paidCourses: number[] = []; // Aquí almacenamos los IDs de los cursos pagados
  courses: any[] = [];
  userEmail: string;
  userId: string;
  isLoggedIn: boolean = false; // Cambia a true cuando el usuario está logueado

  private courseService = inject(CourseService);
  public util = inject(UtilService);
  public paymentService = inject(PaymentService);
  public authService = inject(AuthService);
  public modalController = inject(ModalController);
  private toastController = inject(ToastController);
  private navCtrl = inject(NavController);

  constructor() { }

  async ngOnInit() {
    // Verificar si el usuario está logueado
    this.checkLoginStatus();

    // Obtener todos los cursos primero
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      console.log("Cursos", this.courses);
    });
    try {
      // Llamar al método que maneja la obtención del usuario por token y esperar que termine
      await this.getUserByToken();
      // Ahora que ya tenemos el userId desde getUserByToken, obtenemos los cursos pagados usando el userId
      if (this.userId) {
        this.courseService.getPaidCourses(this.userId).subscribe((courses: number[]) => {
          this.paidCourses = courses;
          console.log("paidCourses", this.paidCourses);
        }, error => {
          console.error("Error obteniendo los cursos pagados:", error);
        });
      } else {
        console.error("UserId no está definido");
      }
    } catch (error) {
      console.error('Error en ngOnInit:', error);
    }
  }

  async ionViewDidEnter() {
    console.log("ionViewDidEnter-Cursos executed");
    // Verificar si el usuario está logueado
    this.checkLoginStatus();
    await this.getUserByToken();
  }

  async getUserByToken(): Promise<void> {
    const token = localStorage.getItem('authToken');
    console.log('Token', token);

    if (token) {
      return this.authService.getUserByToken(token).toPromise().then((response: any) => {
        console.log('Customer:', response);
        // Ahora response es un objeto Customer completo
        this.userId = response.id; // O maneja cualquier campo necesario
        console.log('Customer ID:', this.userId);
      }).catch(error => {
        console.error('Error al obtener el cliente:', error);
        throw error;
      });
    } else {
      return Promise.reject('Token no encontrado');
    }
  }


  async buyCourse(item: any) {
    console.log("item", item);
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
    const idCourse = item.id;
    console.log("idCourse", idCourse);
    const amount = item.price;
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

        // Solo redirigir si el pago fue exitoso
        const param: NavigationExtras = {
          queryParams: {
            id: item.id,
            name: item.title,
            image: item.imagePath,
            description: item.description,
            pdfPath: item.pdfPath,
            videoPath: item.videoPath
          }
        };
        // Redirige solo después de un pago exitoso
        this.util.navigateToPage('/tabs/courses-details', param);
      } else {
        console.error('Payment failed', dataReturned.data.error);
        // Mostrar un mensaje o alerta indicando que el pago falló
        this.presentPaymentFailedToast(); // Puedes implementar este método para notificar el error
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

  async presentPaymentFailedToast() {
    const toast = await this.toastController.create({
      message: 'Payment failed. Please try again or contact support.',
      duration: 3000,  // Duración del toast en milisegundos
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
    this.util.onBack();
  }

  onPayment() {
    this.util.navigateToPage('select-slot');
  }

  onCourseSelected(course: any) {
    console.log("course.descripcion", course.description);
    const param: NavigationExtras = {
      queryParams: {
        id: course.id,
        name: course.title,
        image: course.imagePath,
        description: course.description,
        pdfPath: course.pdfPath,
        videoPath: course.videoPath
      }
    };
    this.util.navigateToPage('/tabs/courses-details', param);
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
