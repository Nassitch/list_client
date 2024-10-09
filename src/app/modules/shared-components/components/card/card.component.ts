import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CardType } from '../../models/card.type';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { Router } from '@angular/router';

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
  @Input() public editPath: string = "/";
  @Input() public onDelete?: () => void;
  @Input() public isActive: boolean = false;
  @Output() public cardSelected: EventEmitter<{ id: number, content: string}> = new EventEmitter<{ id: number, content: string}>();

  private router: Router = inject(Router);

  checked: string = "../../../../../assets/icons/check.svg";
  unChecked: string = "../../../../../assets/icons/uncheck.svg";

  protected isStatic: boolean = true;

  ngOnInit(): void {
    this.isStatic = this.type === 'static';
  }

  onCardSelected(): void {
    this.isActive = !this.isActive;
    this.cardSelected.emit({ id: this.id, content: this.content });
  }

  edit(id: number): void {
    this.router.navigate([this.editPath + id])
  }

  delete(): void {
    if (this.onDelete) {
      this.onDelete();
    }
  }
}
