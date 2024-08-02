import { Component } from '@angular/core';
import { Technologies } from '../../models/technologies.interface';

@Component({
  selector: 'app-credit-page',
  templateUrl: './credit-page.component.html',
  styleUrl: './credit-page.component.css'
})
export class CreditPageComponent {

  technologiesCardList: Technologies[] = [
    {
      picture: "../../../../../assets/technologies/angular.svg",
      title: "Angular",
      version: "17.1"
    },
    {
      picture: "../../../../../assets/technologies/ionic.svg",
      title: "Ionic",
      version: "7.1.3"
    },
    {
      picture: "../../../../../assets/technologies/spring.svg",
      title: "Spring",
      version: "3.2"
    },
    {
      picture: "../../../../../assets/technologies/figma.svg",
      title: "Figma",
      link: "https://www.figma.com/design/6CLUN6xnQdw82yCelfYspa/List.?node-id=0-1&t=HdxDYmbB9iyVgd0U-0",
    },
    {
      picture: "../../../../../assets/technologies/github.svg",
      title: "GitHub",
      link: "https://github.com/Nassitch/list_client",
      secondLink: "https://github.com/Nassitch/list_server"
    },
    {
      picture: "../../../../../assets/technologies/azure.svg",
      title: "Azure",
      version: "2024"
    }
  ]

}
