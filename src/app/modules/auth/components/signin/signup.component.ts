import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthRequest } from '../../models/auth-request.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../shared-components/validators/password-match.validator';
import { assertFormControl } from '../../../shared-components/utils/assert-form-control.util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  newUser$?: Observable<AuthRequest>;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  formGroup!: FormGroup;

  protected textBtn: string = "S'inscrire";

  ngOnInit() {
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

  onSubmit() {
    if (this.formGroup.invalid) {
      Object.keys(this.formGroup.controls).forEach((key) => {
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

    this.newUser$ = this.authService.signup$(newUser);

    this.newUser$.subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate(['/register']);
        } else {
          console.error('User ID is undefined');
        }
      },
      error: (error) => {
        console.error("Erreur lors de la création de l'utilisateur", error);
      },
    });
  }
}