export interface Course {
  id: string;
  title: string;
  imagePath: string;
  description: string;
  price: number; // Asegúrate de que coincida con BigDecimal en el backend
  pdfPaths: string[]; // Lista de rutas de PDF
  videoPaths: string[]; // Lista de rutas de videos
  status: 'ACTIVE' | 'INACTIVE'; // Enum que refleja el CourseStatus del backend
}
