import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { LoginData } from '../../../../models/login-data.interface';
import { Router } from '@angular/router';
import { AuthRequest } from '../../models/auth-request.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { assertFormControl } from '../../../shared-components/utils/assert-form-control.util';
import { ToastService } from '../../../shared-components/services/toast.service';
import {UserToken} from "../../../../models/user-token.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginResult$?: Observable<LoginData>;

  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private toastService: ToastService = inject(ToastService);

  email: string = '';
  password: string = '';

  formGroup!: FormGroup;

  textBtn: string = 'Se connecter';

  ngOnInit(): void {
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

  onSubmit = (): void => {
    const user: AuthRequest = {
      email: this.formGroup.get('email')?.value,
      password: this.formGroup.get('password')?.value,
    };

    this.loginResult$ = this.authService.login$(user);

    this.loginResult$.subscribe((result: LoginData): void => {
      if (result.success) {
        this.toastService.success('Connexion réussie');
        this.authService.getCurrentUser().subscribe((currentUser: UserToken | null): void => {
          if (currentUser) {
            if (currentUser.userId) {
              this.router.navigate(['/home']);
            } else if (currentUser.role === 'ROLE_ADMIN') {
              this.router.navigate(['/admin/dash-board']);
            } else {
              this.router.navigate(['/register']);
            }
          }
        });
      } else {
        this.toastService.error(result.message);
      }
    });
  };
}
