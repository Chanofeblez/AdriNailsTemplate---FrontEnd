import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.page.html',
  styleUrls: ['./package-details.page.scss'],
})
export class PackageDetailsPage {
  name: string = '';
  image: string = '';
  description: string = '';
  pdfPaths: string[] = [];
  videoPaths: string[] = [];
  videoUrls: SafeResourceUrl[] = [];
  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private courseService: CourseService
  ) { }

  ionViewDidEnter() {
    // Realiza una única suscripción a `queryParams`
    this.routeSubscription = this.route.queryParams.subscribe((data: any) => {
      this.name = data.name;
      this.image = data.image;
      this.description = data.description;
      this.pdfPaths = data.pdfPaths ? JSON.parse(data.pdfPaths) : [];
      this.videoPaths = data.videoPaths ? JSON.parse(data.videoPaths) : [];

        console.log("this.pdfPaths", this.pdfPaths);
        console.log("item.videoPaths", this.videoPaths);

        // Generar URLs seguras para cada video
        this.videoUrls = this.videoPaths.map((videoPath) => {
            if (videoPath.includes('watch?v=')) {
                videoPath = videoPath.replace('watch?v=', 'embed/');
                console.log("videoPath", videoPath);
            }
            return this.sanitizer.bypassSecurityTrustResourceUrl(videoPath);
        });
    });
}

  ionViewWillLeave() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
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
