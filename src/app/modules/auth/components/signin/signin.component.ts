import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  private authService = inject(AuthService);

  protected pseudo: string = '';
  protected email: string = '';
  protected password: string = '';
  protected passwordTwo: string = '';
  
  protected textBtn: string = "S'inscrire";

  onSubmit = () => {
    console.log("click");
    console.log("userName: " + this.email);
    console.log("password: " + this.password);
  
    this.authService.signin$(this.pseudo, this.email, this.password)
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
