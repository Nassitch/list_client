import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ControlType, InputType } from '../../models/input.type';
import { CommonModule } from '@angular/common';
import { HandleFormErrorService } from '../../services/handle-form-error.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit {
  
  @ViewChild('inputField') inputField!: ElementRef;
  @Input() public autocomplete = 'off';
  @Input({ required: true }) public control!: FormControl;
  @Input({ required: true }) public controlName = '';
  @Input() public controlType: ControlType = '';
  @Input() public debounce = 400;
  @Input() public inputClass = '';
  @Input() public label?: string;
  @Input() public labelClass = '';
  @Input() public placeholder = '';
  @Input() public type: InputType = 'text';
  @Input() public disabled = false;

  @Output() public valueChange = new EventEmitter<string>();


  private readonly handleFormErrorService = inject(HandleFormErrorService);

  isPasswordVisible: boolean = false;
  isPasswordField: boolean = false;

  ngOnInit() {
    this.isPasswordField = this.type === 'password';
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.type = this.isPasswordVisible ? 'text' : 'password';
  }

  focusInput():void {
    this.inputField.nativeElement.focus();
  }

  get showError(): boolean {
    return this.control.invalid && this.control.touched;
  }

  get errorMessage(): string | undefined {
    return this.handleFormErrorService.getErrorMessage(this.control);
  }
}
