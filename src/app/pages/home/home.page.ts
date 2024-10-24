/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/model/customer.interface';
import { Servicio } from 'src/app/model/manicure-service.interface';
import { ServicioService } from '../../services/servicio.service';
import { Post } from 'src/app/model/post.interface';

register();
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  userId: string;
  userName: string; // Aquí almacenaremos el nombre del usuario
  customer: Customer; // Aquí almacenaremos la información completa del cliente
  greeting: string;

  services : Servicio[] = [];

  private authService     = inject(AuthService);
  private router          = inject(Router);
  private servicioService = inject(ServicioService);

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 3,
  };

  posts: Post[] = [
    {
      imagePath: 'assets/images/extras/complicatedDEN.jpg',
      serviceName: 'Manicure Deluxe',
      description: 'A luxurious manicure experience with the best products.'
    },
    {
      imagePath: 'assets/images/avatar/pedicureRuso1.jpg',
      serviceName: 'Pedicure Spa',
      description: 'Relaxing pedicure with foot massage and exfoliation.'
    },
    {
      imagePath: 'assets/images/extras/cateye.jpeg',
      serviceName: 'Gel Polish',
      description: 'Long-lasting gel polish with a shiny finish.'
    },
  ];

  constructor() {
  }

  async ionViewDidEnter() {
    this.loadServices();
    this.userId = "";
   await this.getUserByToken(); // Aquí puedes volver a cargar los datos si es necesario
    this.setGreeting();
  }

//  ngOnInit() {
//    console.log("ngOnInit executed once");
//    this.loadServices();
//  }
//
//  ionViewWillEnter() {
//    this.userId = "";
//    console.log("ionViewWillEnter executed every time view is entered");
//    this.getToken(); // Aquí puedes volver a cargar los datos si es necesario
//    this.setGreeting();
//  }

  loadServices() {
    this.servicioService.getAllServicios().subscribe(
      (data: Servicio[]) => {
        this.services = data;

        // Aleatorizar el arreglo de servicios
      this.services = this.services.sort(() => Math.random() - 0.5);
      },
      (error) => {
        console.error('Error loading services:', error);
      }
    );
  }

  getUserByToken() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.getUserByToken(token).subscribe(
        (response: any) => {
          this.userName = response.name;
          // Ahora response es un objeto Customer completo
          this.userId = response.id; // O maneja cualquier campo necesario
        },
        (error) => {
          console.error('Error al obtener el cliente:', error);
        }
      );
    } else {
      console.log('Token no Found');
    }
  }


  resetUserId(){
    this.userId = "";
  }

  getCustomerByEmail(email: string) {
    this.authService.getCustomerByEmail(email).subscribe(
      (customer: Customer) => {
        this.customer = customer;
        this.userName = customer.name;
        console.log('Nombre completo:', this.userName); // Asume que `name` es un atributo de tu modelo `Customer`
      },
      (error) => {
        console.error('Error fetching customer by email', error);
      }
    );
  }

  setGreeting() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      this.greeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      this.greeting = 'Good Afternoon';
    } else if (currentHour >= 18 && currentHour < 22) {
      this.greeting = 'Good Evening';
    } else {
      this.greeting = 'Good Night';
    }
  }

  onSalonList(category: string) {
    console.log("OnSalonList", category);
    this.router.navigate(['/tabs/gallery'], { queryParams: { type: category } });
  }

 // onSalonInfo(index: number) {
 //   const param: NavigationExtras = {
 //     queryParams: {
 //       id: index
 //     }
 //   };
 //   this.util.navigateToPage('salon-info', param);
 // }

//  onNotification() {
//    this.util.navigateToPage('login');
//  }
//
//  onBookmarks() {
//    this.util.navigateToPage('bookmarks');
//  }

}
