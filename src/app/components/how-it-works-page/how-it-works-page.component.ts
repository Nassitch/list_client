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
        'Avant de faire vos courses, ouvrez un panier et ajoutez les articles souhaités ; il sera ensuite sauvegardé. Une fois vos achats terminé, vous pouvez valider votre panier.',
      step: 1,
    },
    {
      title: 'Panier',
      description:
        'Ajoutez, supprimez et modifiez votre panier selon les article dont vous avez besoin.',
      step: 2,
    },
    {
      title: 'Panier',
      description:
        "Une fois terminé vous pouvez valider votre panier pour qu'il soit sauvegardé et lié à votre compte.",
      step: 3,
    },
    {
      title: 'Facture',
      description:
        'Après être passé à la caisse vous pouvez enregistrer une facture lié au panier precédement enregistrer, cela vous permet de garder un trace de vos courses hebdomadaires.',
      step: 4,
    },
    {
      title: 'Facture',
      description:
        "Supprimez un panier ou une facture à n'importe quel moment, si vous avez commit une faute par exemple",
      step: 5,
    },
    {
      title: 'Facture',
      description:
        "Recommencer ce processus en illimité.",
      step: 6,
    },
  ];
}
