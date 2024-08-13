import { Component, inject, OnInit } from '@angular/core';
import { DeviceService } from '../../modules/shared-components/services/device.service';
import { StorageService } from '../../core/services/storage.service';
import { Technologies } from '../../models/technologies.interface';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  openSkills: boolean = false;
  unRoll: string = '../../../assets/icons/unroll.svg';
  roll: string = '../../../assets/icons/roll.svg';

  technologiesCardList: Technologies[] = [
    {
      picture: '../../../../../assets/technologies/angular.svg',
      title: 'Angular',
      version: '17.1',
    },
    {
      picture: '../../../../../assets/technologies/spring.svg',
      title: 'Spring',
      version: '3.2',
    },
    {
      picture: '../../../../../assets/technologies/mysql.svg',
      title: 'MySQL',
      version: '8.0',
    },
    {
      picture: '../../../../../assets/technologies/figma.svg',
      title: 'Figma',
      link: 'https://www.figma.com/design/6CLUN6xnQdw82yCelfYspa/List.?node-id=0-1&t=HdxDYmbB9iyVgd0U-0',
    },
    {
      picture: '../../../../../assets/technologies/github.svg',
      title: 'GitHub',
      link: 'https://github.com/Nassitch/list_client',
      secondLink: 'https://github.com/Nassitch/list_server',
    },
    {
      picture: '../../../../../assets/technologies/apache.svg',
      title: 'Apache',
      version: '2.4',
    },
    {
      picture: '../../../../../assets/technologies/nginx.svg',
      title: 'Nginx',
      version: '1.27',
    },
  ];

  hardSkillList: string[] = [
    'Synchronisation automatique',
    'Sécurisé',
    'PWA',
    'Installable',
    'Gratuit',
    'MVC',
    'Standalone',
    'Modules',
    'Charts'
  ];

  seeOrHideSkills(): boolean {
    return this.openSkills = !this.openSkills;
  }
}
