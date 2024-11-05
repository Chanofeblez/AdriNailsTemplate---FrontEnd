export interface Course {
  id: string;
  title: string;
  imagePath: string;
  description: string;
  pdfPaths: string[]; // Arreglo de strings
  videoPaths: string[]; // Arreglo de strings
}
