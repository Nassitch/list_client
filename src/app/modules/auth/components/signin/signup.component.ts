import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthRequest } from '../../models/auth-request.interface';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { passwordMatchValidator } from '../../../shared-components/validators/password-match.validator';
import { assertFormControl } from '../../../shared-components/utils/assert-form-control.util';
import { ToastService } from '../../../shared-components/services/toast.service';
import {LogMessageResponse} from "../../models/log-message-response.interface";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  newUser$?: Observable<LogMessageResponse>;

  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private toastService: ToastService = inject(ToastService);

  formGroup!: FormGroup;

  protected textBtn: string = "S'inscrire";

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      {
        pseudo: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  getFormControl(name: string): FormControl {
    return assertFormControl(this.formGroup.get(name), name);
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      Object.keys(this.formGroup.controls).forEach((key: string): void => {
        const control = this.formGroup.get(key);
        control?.markAsTouched();
      });
      return;
    }

    const newUser: AuthRequest = {
      pseudo: this.formGroup.get('pseudo')?.value,
      email: this.formGroup.get('email')?.value,
      password: this.formGroup.get('password')?.value,
    };

    this.newUser$ = this.authService.signup$(newUser); // Type approprié

    this.newUser$.subscribe({
      next: (response: LogMessageResponse): void => { // Utiliser le type correct ici
        if (response.success) {
          this.toastService.success('Votre compte a bien été créé.');
          this.router.navigate(['/login']); // Rediriger vers la page de connexion
        } else {
          this.toastService.error(response.message);
        }
      },
      error: (error): void => {
        this.toastService.error('Erreur lors de la création du compte.');
        console.error("Erreur lors de la création de l'utilisateur", error);
      },
    });
  }
}
