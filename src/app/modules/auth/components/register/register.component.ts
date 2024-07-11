import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { catchError, Observable, of, Subscription, switchMap } from 'rxjs';
import { UserService } from '../../../user/shared/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { assertFormControl } from '../../../shared-components/utils/assert-form-control.util';
import { UserInfo } from '../../../user/models/user-info.interface';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared-components/services/toast.service';
import { UserToken } from '../../../../models/user-token.interface';
import { environment } from '../../../../../environments/environment.developpment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastService = inject(ToastService);

  formGroup!: FormGroup;

  picture: string = '';
  textBtn: string = 'Enregistrer';

  avatars$!: Observable<string[]>;
  registerSubscription$: Subscription = new Subscription();
  private _BASE_URL: string = environment._BASE_URL;
  private _PUBLIC: string = environment._PUBLIC;
  private _UPLOAD: string = environment._UPLOAD;
  private _READ: string = environment._READ;
  private _AVATAR: string = environment._AVATAR;
  protected _URL_IMG: string = `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ}${this._AVATAR}`;

  ngOnInit() {
    this.avatars$ = this.userService.getAvatars$();

    this.formGroup = this.fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
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
  }

  getFormControl(name: string): FormControl {
    return assertFormControl(this.formGroup.get(name), name);
  }

  takeAvatar(avatar: string): void {
    this.picture = avatar;
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      Object.keys(this.formGroup.controls).forEach((key) => {
        const control = this.formGroup.get(key);
        control?.markAsTouched();
      });
      return;
    }

        const userInfo: UserInfo = {
          firstName: this.formGroup.get('firstName')?.value,
          lastName: this.formGroup.get('lastName')?.value,
          picture: this.picture,
          address: this.formGroup.get('address')?.value,
          city: this.formGroup.get('city')?.value,
          zipCode: this.formGroup.get('zipCode')?.value,
          loginId: this.authService.currentUserId.getValue(),
        };

        console.log(userInfo);

        
    this.registerSubscription$ = this.authService.register$(userInfo).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastService.show('Votre inscription à été validé avec succès.', 'Succès', 'success');
          this.router.navigate(['/home']);
        } else {
          this.toastService.show("Erreur lors de l'inscription", 'Erreur', 'error');
        }
      },
      error: (error) => {
        console.error("Erreur lors de l'inscription:", error);
        this.toastService.show("Erreur lors de l'inscription", 'Erreur', 'error');
      }
    });
      }

      ngOnDestroy(): void {
        this.registerSubscription$.unsubscribe();
      }
  
}