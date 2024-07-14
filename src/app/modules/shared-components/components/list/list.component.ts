import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../../item/models/item.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  @Input() public id!: number;
  @Input() public image!: string;
  @Input() public name!: string;
  @Input() public items!: Item[];
  @Input() public isUnroll: boolean = true;
  @Input() public allSelected: boolean = false;
  
  @Output() public selectedItemsChange = new EventEmitter<Item[]>();
  
  selectedItems: { [id: number]: boolean } = {};
  
  count: number = 0;
  unRoll: string = '../../../../../assets/icons/unroll.svg';
  roll: string = '../../../../../assets/icons/roll.svg';
  check: string = '../../../../../assets/icons/check.svg';
  unCheck: string = '../../../../../assets/icons/uncheck.svg';

  ngOnInit(): void {
    this.count = this.countItem(this.items);
    this.selectAllItems(this.allSelected);
    this.emitSelectItems();
  }

  countItem(items: Item[]): number {
    let howMuch: number = items.length;
    return howMuch;
  }

  toggleList(): boolean {
    return (this.isUnroll = !this.isUnroll);
  }

  toggleSelection(id: number): void {
    this.selectedItems[id] = !this.selectedItems[id];
    this.emitSelectItems();
  }

  selectAllItems(allSelected: boolean): void {
    if (allSelected) {
      for (let i = 0; i < this.items.length; i += 1) {
        this.selectedItems[this.items[i].id] = true;
      }
    }
  }

  isSelected(id: number): boolean {
    return !!this.selectedItems[id];
  }

  emitSelectItems(): void {
    const selectedItemsArray = this.items.filter(item => this.selectedItems[item.id]);
    this.selectedItemsChange.emit(selectedItemsArray);
  }
}
