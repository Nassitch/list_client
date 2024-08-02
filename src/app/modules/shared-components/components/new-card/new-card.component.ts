import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-card',
  standalone: true,
  imports: [],
  templateUrl: './new-card.component.html',
  styleUrl: './new-card.component.css'
})
export class NewCardComponent {

  @Input() public wordMale: boolean = true;
  @Input() public word!: string;
  @Input() public path?: string;

  @Output() public newShopEvent = new EventEmitter();

  private router = inject(Router);

  navigateTo(path: string): void {
    this.newShopEvent.emit();
    this.router.navigate([path]);
  }

  newShop(): void {
    this.newShopEvent.emit();
  }
}
