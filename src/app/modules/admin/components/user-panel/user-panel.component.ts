import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../user/shared/services/user.service';
import { Observable } from 'rxjs';
import { UserInfo } from '../../../user/models/user-info.interface';
import { ImageService } from '../../../shared-components/services/image.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { assertFormControl } from '../../../shared-components/utils/assert-form-control.util';
import { ToastService } from '../../../shared-components/services/toast.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css'
})
export class UserPanelComponent implements OnInit {

  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  public imageService = inject(ImageService);

  userList$!: Observable<UserInfo[]>;
  avatars$!: Observable<string[]>;

  picture!: string;
  textBtn: string = "Enregistrer";

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.userList$ = this.userService.getAllUserProfile$();

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
      this.toastService.error('Veuillez sélectionner un avatar.');
      return false;
    }
    return true;
  }

  onSubmit(): void {}
}
