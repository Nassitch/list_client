import { Component, Input } from '@angular/core';
import { Item } from '../../../item/models/item.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  @Input() public id!: number;
  @Input() public count!: number;
  @Input() public image!: string;
  @Input() public name!: string;
  @Input() public items!: Item[];

  isUnroll: boolean = true;
  unRoll: string = "../../../../../assets/icons/unroll.svg";
  roll: string = "../../../../../assets/icons/roll.svg";
  isChecked: boolean = false;
  check: string = "../../../../../assets/icons/check.svg";
  unCheck: string = "../../../../../assets/icons/uncheck.svg";

  toggleList(): boolean {
    console.log("Click");    
    return this.isUnroll = !this.isUnroll;
  }
}
