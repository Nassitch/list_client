import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../../user/shared/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { assertFormControl } from '../../../shared-components/utils/assert-form-control.util';
import { UserInfo } from '../../../user/models/user-info.interface';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared-components/services/toast.service';
import { ImageService } from '../../../shared-components/services/image.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private toastService: ToastService = inject(ToastService);
  public imageService: ImageService = inject(ImageService);

  formGroup!: FormGroup;

  picture: string = '';
  textBtn: string = 'Enregistrer';

  avatars$!: Observable<string[]>;
  registerSubscription$: Subscription = new Subscription();

  ngOnInit(): void {
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
      Object.keys(this.formGroup.controls).forEach((key: string): void => {
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

    this.registerSubscription$ = this.authService
      .register$(userInfo)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.toastService.success('Votre inscription à été validé avec succès.');
            this.router.navigate(['/home']);
          } else {
            this.toastService.error("Erreur lors de l'inscription");
          }
        },
        error: (): void => {
          this.toastService.error("Erreur lors de l'inscription");
        },
      });
  }

  ngOnDestroy(): void {
    this.registerSubscription$.unsubscribe();
  }
}
