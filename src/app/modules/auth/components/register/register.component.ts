import { Component, OnInit, inject } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { UserService } from '../../../user/shared/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { assertFormControl } from '../../../shared-components/utils/assert-form-control.util';
import { UserInfo } from '../../../user/models/user-info.interface';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared-components/services/toast.service';
import { UserToken } from '../../../../models/user-token.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastService = inject(ToastService);

  formGroup!: FormGroup;

  picture: string = '';
  textBtn: string = 'Enregistrer';

  avatars$!: Observable<string[]>;
  protected _URL_IMG: string = 'http://localhost:8080/api/v1/public/upload/read/avatar/';

  ngOnInit() {
    console.log('ngOnInit called');

    this.avatars$ = this.userService.getAvatars$();

    this.formGroup = this.fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
    });

    console.log('FormGroup initialized', this.formGroup);
  }

  getFormControl(name: string): FormControl {
    return assertFormControl(this.formGroup.get(name), name);
  }

  takeAvatar(avatar: string): void {
    this.picture = avatar;
    console.log(this.picture);
  }

  onSubmit(): void {
    console.log('Clicked!');

    if (!this.formGroup) {
      console.error('FormGroup is not initialized');
      return;
    }

    if (this.formGroup.invalid) {
      Object.keys(this.formGroup.controls).forEach((key) => {
        const control = this.formGroup.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.authService.getCurrentUser().pipe(
      switchMap((user: UserToken | null) => {
        if (!user || !user.loginId) {
          console.error('User not authenticated or loginId not found');
          return of(null);
        }

        const userInfo: UserInfo = {
          firstName: this.formGroup.get('firstName')?.value,
          lastName: this.formGroup.get('lastName')?.value,
          picture: this.picture,
          address: this.formGroup.get('address')?.value,
          city: this.formGroup.get('city')?.value,
          zipCode: this.formGroup.get('zipCode')?.value,
          loginId: user.loginId,
        };

        console.log(userInfo);

        return this.authService.register$(userInfo).pipe(
          catchError((error) => {
            this.toastService.show('Erreur lors de la création du compte.', 'Erreur', 'error')
            console.error('Error registering user', error);
            return of(null);
          })
        );
      })
    ).subscribe((response) => {
      if (response) {
        this.toastService.show('Vos données sont bien enregistrées.', 'Succès', 'success');
        this.router.navigate(['/']);
        console.log('User registered successfully', response);
      }
    });
  }
}