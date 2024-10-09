import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.developpment';
import { UserService } from '../../user/shared/services/user.service';
import { Observable } from 'rxjs';
import { Statistic } from '../models/statistic.interface';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private http: HttpClient = inject(HttpClient);
  private userService: UserService = inject(UserService);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _USER: string = environment._USER;
  private readonly _STATS: string = environment._STATS;
  private readonly _INVOICE: string = environment._INVOICE;

  getStatsByUserId$(year: number): Observable<Statistic> {
    this.userService.initialize();
    return this.http.get<Statistic>(`${this._BASE_URL}${this._USER}${this._STATS}${this._INVOICE}/${this.userService.id}/${year}`);
  }
}
