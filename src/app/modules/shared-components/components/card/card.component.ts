import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardType } from '../../models/card.type';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, DateFormatPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input() public id!: number;
  @Input() public type!: CardType;
  @Input() public content!: string;
  @Input() public imgContent?: string;
  @Input() public isCompleted?: boolean;
  @Input() public count?: number;
  @Input() public check!: string;
  @Input() public title?: string;
  @Input() public date?: string;
  @Input() public subTitle?: string;
  @Input() public onDelete?: () => void;
  @Input() public isActive: boolean = false;
  @Output() public cardSelected = new EventEmitter<{ id: number, content: string}>();

  checked: string = "../../../../../assets/icons/check.svg";
  unChecked: string = "../../../../../assets/icons/uncheck.svg";

  protected isStatic: boolean = true;

  ngOnInit(): void {
    this.isStatic = this.type === 'static';
  }

  onCardSelected(): void {
    this.isActive = !this.isActive;
    console.log("State of this card : ", this.isActive);
    this.cardSelected.emit({ id: this.id, content: this.content });
  }

  edit(): void {}

  delete(): void {
    if (this.onDelete) {
      this.onDelete();
    }
  }
}
