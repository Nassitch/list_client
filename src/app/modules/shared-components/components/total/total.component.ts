import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../../../item/models/item.interface';

@Component({
  selector: 'app-total',
  standalone: true,
  imports: [],
  templateUrl: './total.component.html',
  styleUrl: './total.component.css'
})
export class TotalComponent implements OnChanges {

  @Input() public items!: Item[];
  
  total: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.total = this.items.length;
  }
}
