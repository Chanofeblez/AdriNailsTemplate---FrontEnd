import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.page.html',
  styleUrls: ['./package-details.page.scss'],
})
export class PackageDetailsPage implements OnInit {
  name: string = '';
  image: string = '';
  description: string = '';
  pdfPaths: string[] = [];
  videoPaths: string[] = [];
  videoUrl: string = '';
  pdfUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((data: any) => {
      this.name = data.name;
      this.image = data.image;
      this.description = data.description;
      this.pdfPaths = JSON.parse(data.pdfPaths || '[]');
      this.videoPaths = JSON.parse(data.videoPaths || '[]');

      // Transformar la URL del video si es necesario
      if (this.videoPaths.length > 0) {
        this.videoUrl = this.videoPaths[0];
        if (this.videoUrl.includes('watch?v=')) {
          this.videoUrl = this.videoUrl.replace('watch?v=', 'embed/');
        }
      }
    });
  }

  viewPdf(language: 'english' | 'spanish') {
    let pdfUrl = '';
    if (language === 'english' && this.pdfPaths[0]) {
      pdfUrl = this.pdfPaths[0];
    } else if (language === 'spanish' && this.pdfPaths[1]) {
      pdfUrl = this.pdfPaths[1];
    }

    if (pdfUrl) {
      window.open(pdfUrl, '_blank'); // Abre el PDF en una nueva ventana o pestaña
    } else {
      console.error('No PDF URL found for the selected language');
    }
  }
}
