import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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

  protected isStatic: boolean = true;

  ngOnInit(): void {
    this.isStatic = this.type === 'static';
  }
}
