import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

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
  
    this.authService.signup$(this.pseudo, this.email, this.password)
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
