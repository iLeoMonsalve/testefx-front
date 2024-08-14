import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule], // Agrega CommonModule aquí
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private apiUrl = 'http://localhost:8080/api/v1/record';
  records: any[] = []; // Declarar la variable records
  showTable: boolean = false;

  selectedFile: File | null = null;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }

  // Este método captura el archivo seleccionado
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Captura el primer archivo seleccionado
  }

  // Este método maneja la carga del archivo al servidor
  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile); // Añadir el archivo a FormData

      // Enviar el archivo al servidor
      this.http.post<any[]>(this.apiUrl, formData).subscribe(
        response => {
          this.records = response;
          console.log('File upload successful', response);
          alert('Archivo cargado exitosamente');
          // Forzar la detección de cambios
          this.cd.detectChanges();
        },
        error => {
          console.error('File upload failed', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }

  onConsult() { 
    this.showTable = true; 
  }

}