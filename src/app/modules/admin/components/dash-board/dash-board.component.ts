import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {

  private router = inject(Router);


  navigateTo(path: string): void {
    this.router.navigate([path]);  
  }
}
