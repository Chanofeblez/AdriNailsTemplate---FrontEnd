import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute) {}

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
    if (!this.selectedFile || !this.reviewText || !this.rating) {
      alert("Please fill out the review, select a rating, and upload a photo.");
      return;
    }

    const formData = new FormData();
    formData.append('reviewText', this.reviewText);
    formData.append('rating', this.rating.toString());
    formData.append('photo', this.selectedFile);

    this.appointmentService.addReview(this.appointmentId, formData).subscribe(
      (response: any) => {
        console.log("Review submitted successfully:", response);
      },
      (error: any) => {
        console.error("Error submitting review:", error);
      }
    );
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

