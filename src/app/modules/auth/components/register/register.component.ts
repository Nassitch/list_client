import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../../user/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private userService = inject(UserService);

  firstName: string = '';
  lastName: string = '';
  picture: string = '';
  address: string = '';
  city: string = '';
  zipCode: number = 0;
  textBtn: string = 'Enregistrer';

  avatars$!: Observable<string[]>;
  protected _URL_IMG: string =
    'http://localhost:8080/api/v1/public/upload/read/avatar/';

  ngOnInit(): void {
    this.avatars$ = this.userService.getAvatars$();
  }

  onSubmit(): void {
    console.log('Clicked !');
  }

  takeAvatar(avatar: string): void {
    this.picture = avatar;
    console.log(this.picture);
  }
}
