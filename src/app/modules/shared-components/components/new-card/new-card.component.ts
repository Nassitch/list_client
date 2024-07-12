import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-card',
  standalone: true,
  imports: [],
  templateUrl: './new-card.component.html',
  styleUrl: './new-card.component.css'
})
export class NewCardComponent {

  @Input() path!: string;
  @Input() wordMale: boolean = true;
  @Input() word!: string;

  private router = inject(Router);

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
