import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../modules/user/shared/services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StatisticService } from '../../modules/shared-components/services/statistic.service';
import { Statistic } from '../../modules/shared-components/models/statistic.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  private userService = inject(UserService);
  private router = inject(Router);
  private statService = inject(StatisticService);

  profile$!: Observable<any>;
  statistics$!: Observable<Statistic>;

  titleLandingMsg: string = "Bienvenue sur List.";
  descriptionLandingMsg: string = "Vous pouvez desormais vous faire une liste, enregistrer une facture et vérifier vos statistiques, tout ça à l'infinis !";


  ngOnInit(): void {
    this.userService.initialize();
    this.profile$ = this.userService.getUserProfile$();
    this.statistics$ = this.statService.getStatsByUserId$(new Date().getFullYear());
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

}