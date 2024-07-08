import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { catchError, Observable, of, Subscription, tap } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { assertFormControl } from '../../../shared-components/utils/assert-form-control.util';
import { environment } from '../../../../../environments/environment.developpment';
import { UserInfo } from '../../models/user-info.interface';
import { ToastService } from '../../../shared-components/services/toast.service';

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.css'],
})
export class SettingProfileComponent implements OnInit {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);

  private profileSubscription$: Subscription | null = null;
  profile$!: Observable<any>;
  avatars$!: Observable<string[]>;
  picture: string = '';
  textBtn: string = 'Enregistrer';

  private _BASE_URL: string = environment._BASE_URL;
  private _PUBLIC: string = environment._PUBLIC;
  private _UPLOAD: string = environment._UPLOAD;
  private _READ: string = environment._READ;
  private _AVATAR: string = environment._AVATAR;
  protected _URL_IMG: string = `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ}${this._AVATAR}`;

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.profile$ = this.userService.getUserProfile$();

    this.profileSubscription$ = this.profile$.subscribe((profile) => {
      if (profile) {
        this.formGroup.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
          address: profile.address,
          city: profile.city,
          zipCode: profile.zipCode,
        });
      }
    });

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
        Validators.minLength(5),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
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

  private validateAvatar(): boolean {
    if (!this.picture) {
      this.toastService.show('Veuillez sélectionner un avatar.', 'Erreur', 'error');
      return false;
    }
    return true;
  }
  
  onSubmit(): void {
    if (this.formGroup.invalid || !this.validateAvatar()) {
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
    };

    console.log(userInfo);

    this.userService.putUserProfile$(userInfo).pipe(
      catchError((error) => {
        this.toastService.show('Erreur lors de la modification de votre compte.', 'Erreur', 'error');
        console.error('Error updating user profile', error);
        return of(null);
      })
    ).subscribe((response) => {
      if (response) {
        this.toastService.show('Vos données sont bien enregistrées.', 'Succès', 'success');
      }
    });
  }
  
  ngOnDestroy(): void {
    if (this.profileSubscription$) {
      this.profileSubscription$.unsubscribe();
    }
  }

}
