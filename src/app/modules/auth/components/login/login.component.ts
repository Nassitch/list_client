import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private authService = inject(AuthService);
  
  email: string = '';
  password: string = '';
  
  textBtn: string = "Se connecter"
  
onSubmit = () => {
  console.log("click");
  console.log("userName: " + this.email);
  console.log("password: " + this.password);

  this.authService.login$(this.email, this.password)
      .subscribe(
        response => {
          console.log("Réponse du serveur:", response);
        },
        error => {
          console.error("Erreur lors de la connexion:", error);
        }
      );
}
}
