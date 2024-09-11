import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  appointment: any; // Declarar la propiedad appointment para almacenar los detalles

  selectedFile: File | null = null;
  reviewText: string = '';
  rating: number = 5;
  appointmentId: string; // Añadir esta propiedad para el ID de la cita

  private appointmentService = inject(AppointmentService);

  private route           = inject(ActivatedRoute);
  private toastController = inject(ToastController);
  private router          = inject(Router);

  constructor( ) {}

  ngOnInit() {
    // Obtener el ID del appointment desde la URL o alguna otra fuente
    this.appointmentId = this.route.snapshot.paramMap.get('appointmentId')!;
    console.log("this.appointmentId", this.appointmentId);

    // Obtener los detalles del appointment usando el servicio
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe(
      (data) => {
        this.appointment = data; // Asignar los detalles obtenidos
        console.log("this.appointment",this.appointment);
      },
      (error) => {
        console.error("Error fetching appointment details:", error);
      }
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.selectedFile = input.files[0];
    }
  }

  submitReview() {
    console.log("the review", this.reviewText);
    if (!this.selectedFile || !this.reviewText || !this.rating) {
      let missingFields = [];

      if (!this.reviewText) missingFields.push('Review');
      if (!this.rating) missingFields.push('Rating');
      if (!this.selectedFile) missingFields.push('Photo');

      alert(`Please fill out the following fields: ${missingFields.join(', ')}`);
      return;
    }

    const formData = new FormData();
    formData.append('reviewText', this.reviewText);
    formData.append('rating', this.rating.toString());
    formData.append('photo', this.selectedFile);

    this.appointmentService.addReview(this.appointmentId, formData).subscribe(
      async (response: any) => {
        console.log("Review submitted successfully:", response);

        // Mostrar el toast cuando la review se envía exitosamente
        const toast = await this.toastController.create({
          message: 'Review submitted successfully!',
          duration: 1500,  // Duración del toast en milisegundos
          position: 'top', // Posición del toast en la pantalla
          color: 'success' // Otras opciones de color: 'danger', 'primary', etc.
        });
        await toast.present();
        // Redirigir a /tabs/booking después de mostrar el toast
        toast.onDidDismiss().then(() => {
          this.router.navigate(['/tabs/booking']); // Redirige a la ruta deseada
        });
      },
      (error: any) => {
        console.error("Error submitting review:", error);

        // Mostrar el toast en caso de error
        this.showToast('Error submitting review', 'danger');
      }
    );
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,  // Duración en milisegundos
      position: 'top',
      color // El color puede ser 'success', 'danger', 'primary', etc.
    });
    await toast.present();
  }

  triggerCameraInput() {
    const cameraInput = document.getElementById('cameraInput') as HTMLInputElement;
    cameraInput.click();
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

}

