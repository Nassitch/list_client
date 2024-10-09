import { Component, Input } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {

  @Input() public state: boolean = true;

  constructor(private loaderService: LoaderService) {
    this.isLoading$ = this.loaderService.loading$;
  }

  isLoading$: Observable<boolean>;
}
