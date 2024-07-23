import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../user/shared/services/user.service';
import { BehaviorSubject, Observable, Subscription, switchMap, tap } from 'rxjs';
import { UserInfo } from '../../../user/models/user-info.interface';
import { ImageService } from '../../../shared-components/services/image.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { assertFormControl } from '../../../shared-components/utils/assert-form-control.util';
import { ToastService } from '../../../shared-components/services/toast.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css'
})
export class UserPanelComponent implements OnInit, OnDestroy {
  private refreshUserProfile$ = new BehaviorSubject<void>(undefined);

  private adminService = inject(AdminService);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  public imageService = inject(ImageService);

  userList$!: Observable<UserInfo[]>;
  avatars$!: Observable<string[]>;
  
  userProfile$: Subscription = new Subscription();
  putUserProfile$: Subscription = new Subscription();
  deleteUserProfile$: Subscription = new Subscription();
  
  profileId: number = 0;
  profileLoginId: number = 0;
  picture!: string;
  textBtn: string = "Enregistrer";
  
  formGroup!: FormGroup;

  ngOnInit(): void {
    this.userList$ = this.refreshUserProfile$.pipe(
      switchMap(() => this.userService.getAllUserProfile$())
    )
    

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

  getProfile(id: number): void {
    this.userProfile$ = this.adminService.getUserProfileById$(id)
    .pipe(tap(user => this.fillForm(user))).subscribe();
  }

  fillForm(user: UserInfo): void {
    this.profileId = user.id!;
    this.profileLoginId = user.loginId!;
    this.picture = user.picture;
    this.formGroup.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      zipCode: user.zipCode
    })
  }

  private validateAvatar(): boolean {
    if (!this.picture) {
      this.toastService.error('Veuillez sélectionner un avatar.');
      return false;
    }
    return true;
  }

  onDelete(id: number): void {
    if (this.profileId !== 0) {
      this.deleteUserProfile$ = this.adminService.deleteUser$(id).subscribe({
        next: () => {
          this.toastService.success("L'utilisateur à bien été supprimé.");
          this.profileId = 0;
          this.refreshUserProfile$.next();
        },
        error: (error) => this.toastService.error("Un erreur est survenue lors de la suppression.")
      })
    } else {
      this.toastService.error("Vous devez séléctionner un utilisateur.");
    }
  }

  onSubmit(): void {
    const userProfile: UserInfo = {
      firstName: this.formGroup.get('firstName')?.value,
      lastName: this.formGroup.get('lastName')?.value,
      picture: this.picture,
      address: this.formGroup.get('address')?.value,
      city: this.formGroup.get('city')?.value,
      zipCode: this.formGroup.get('zipCode')?.value,
    };
    this.putUserProfile$ = this.adminService.editUserProfile$(this.profileId, userProfile)
    .subscribe({
      next: () => {
        this.toastService.success("Le profile d'utilisateur à bien été modifié.");
        this.profileId = 0;
        this.refreshUserProfile$.next();
      },
      error: (error) => 
        this.toastService.error("Une erreur est survenue lors de la modification du profile.")
    })
  }

  ngOnDestroy(): void {
    this.userProfile$.unsubscribe();
  }
}
