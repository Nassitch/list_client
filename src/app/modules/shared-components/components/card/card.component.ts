import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardType } from '../../models/card.type';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input() public type!: CardType;
  @Input() public imgContent?: string;
  @Input() public count?: number;
  @Input() public check!: string;
  @Input() public title!: string;
  @Input() public subTitle?: string;
  @Input() public onDelete?: () => void;
  @Input() public isActive: boolean = false;
  @Output() public cardSelected = new EventEmitter<void>();

  checked: string = "../../../../../assets/icons/check.svg";
  unChecked: string = "../../../../../assets/icons/uncheck.svg";

  protected isStatic: boolean = true;

  ngOnInit(): void {
    this.isStatic = this.type === 'static';
  }

  onCardSelected(): void {
    console.log("State of this card : ", this.isActive);
    this.isActive = !this.isActive;
    this.cardSelected.emit();
  }

  edit(): void {}

  delete(): void {
    if (this.onDelete) {
      this.onDelete();
    }
  }
}
