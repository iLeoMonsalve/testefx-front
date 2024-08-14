import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public apiUrl = 'http://localhost:8080/api/v1/user/login';
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }
  
  async onLogin() {
    console.log("entra en login");

    const body = { 
      "username": this.username, 
      "password":  this.password 
    };

    const urlLogin = this.apiUrl + `?username=${this.username}&password=${this.password}`;

    console.log("url ", urlLogin)

    this.http.get<any>(urlLogin).subscribe(
      response => {
        // Maneja la respuesta aquí
        console.log('Login successful', response);
        if (response === true){
          this.router.navigate(['/home']);
        }
      },
      error => {
        // Maneja el error aquí
        console.error('Login failed', error);
      }
    );
    return true;
  }



}
