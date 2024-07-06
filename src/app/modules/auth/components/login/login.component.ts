import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { LoginData } from '../../../../models/login-data.interface';
import { Router } from '@angular/router';
import { AuthRequest } from '../../models/auth-request.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { assertFormControl } from '../../../shared-components/utils/assert-form-control.util';
import { ToastService } from '../../../shared-components/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginResult$?: Observable<LoginData>;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastService = inject(ToastService);

  email: string = '';
  password: string = '';

  formGroup!: FormGroup;

  textBtn: string = 'Se connecter';

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  getFormControl(name: string): FormControl {
    return assertFormControl(this.formGroup.get(name), name);
  }

  onSubmit = () => {
    const user: AuthRequest = {
      email: this.formGroup.get('email')?.value,
      password: this.formGroup.get('password')?.value,
    };

    this.loginResult$ = this.authService.login$(user);

    this.loginResult$.subscribe((result) => {
      if (result.success) {
        this.toastService.show('Connexion réussie', 'Succès', 'success');
        this.authService.getCurrentUser().subscribe((currentUser) => {
          if (currentUser) {
            if (currentUser.userId) {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/register']);
            }
          } else {
            console.error('User ID is undefined', currentUser);
          }
        });
      } else {
        this.toastService.show(result.message, 'Erreur', 'error');
        console.error(result.message);
      }
    });
  };
}
