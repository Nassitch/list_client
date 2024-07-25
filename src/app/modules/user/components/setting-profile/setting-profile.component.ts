import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { catchError, Observable, of, Subscription, tap } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { assertFormControl } from '../../../shared-components/utils/assert-form-control.util';
import { environment } from '../../../../../environments/environment.developpment';
import { UserInfo } from '../../models/user-info.interface';
import { ToastService } from '../../../shared-components/services/toast.service';
import { ImageService } from '../../../shared-components/services/image.service';
import { ConfirmModalComponent } from '../../../shared-components/components/confirm-modal/confirm-modal.component';
import { ConfirmModalService } from '../../../shared-components/services/confirm-modal.service';

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.css'],
})
export class SettingProfileComponent implements OnInit {
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;

  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private confirmModalService = inject(ConfirmModalService);
  public imageService = inject(ImageService);

  private profileSubscription$: Subscription | null = null;
  profile$!: Observable<any>;
  avatars$!: Observable<string[]>;
  picture: string = '';
  textBtn: string = 'Enregistrer';

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.userService.initialize();

    this.profile$ = this.userService.getUserProfile$();

    this.profileSubscription$ = this.profile$.subscribe((profile) => {
      if (profile) {
        this.picture = profile.picture,
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

  ngAfterViewInit(): void {
    this.confirmModalService.setModalComponent(this.confirmModal);
  }

  handleConfirmSubmission(response: { confirmed: boolean, action: 'save' | 'delete' }): void {
    if (response.action === 'save') {

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
    };
    
    if (response) {
      this.userService.putUserProfile$(userInfo).pipe(
        catchError((error) => {
          this.toastService.error('Erreur lors de la modification de votre compte.');
          console.error('Error updating user profile', error);
          return of(null);
        })
      ).subscribe((response) => {
        if (response) {
          this.toastService.success('Vos données sont bien enregistrées.');
          this.userService.upToDateProfile(userInfo);
        }
      });
    }
  }
  }

  onSubmit(): void {
    this.confirmModalService.save();
  }

  ngOnDestroy(): void {
    if (this.profileSubscription$) {
      this.profileSubscription$.unsubscribe();
    }
  }
}