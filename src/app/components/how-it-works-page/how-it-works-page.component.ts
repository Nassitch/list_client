import { Component } from '@angular/core';
import { HowItWorks } from '../../models/how-it-works.interface';

@Component({
  selector: 'app-how-it-works-page',
  templateUrl: './how-it-works-page.component.html',
  styleUrl: './how-it-works-page.component.css',
})
export class HowItWorksPageComponent {
  stepCardList: HowItWorks[] = [
    {
      title: 'Panier',
      description:
        'Avant de faire vos courses, ouvrez un panier, ajouter les articles souhaités, il sera ensuite sauvegardé. Une fois vos achats terminé, vous pouvez valider votre panier.',
      step: 1,
    },
    {
      title: 'Facture',
      description:
        'Après être passé à la caisse vous pouvez enregistrer un facture lié au panier precédement enregistrer, cela vous permet de garder un trace de vos courses hebdomadaires.',
      step: 2,
    },
  ];
}
