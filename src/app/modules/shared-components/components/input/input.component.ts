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
  styleUrl: './input.component.css',
})
export class InputComponent implements OnInit {

  @ViewChild('inputField') inputField!: ElementRef;
  @Input() public autocomplete: string = 'off';
  @Input({ required: true }) public control!: FormControl;
  @Input({ required: true }) public controlName: string = '';
  @Input() public controlType: ControlType = '';
  @Input() public debounce: number = 400;
  @Input() public inputClass: string = '';
  @Input() public label?: string;
  @Input() public labelClass: string = '';
  @Input() public placeholder: string = '';
  @Input() public type: InputType = 'text';
  @Input() public disabled: boolean = false;

  @Output() public valueChange: EventEmitter<string> = new EventEmitter<string>();


  private readonly handleFormErrorService: HandleFormErrorService = inject(HandleFormErrorService);

  isPasswordVisible: boolean = false;
  isPasswordField: boolean = false;

  unViewIcon: string = "../../../../assets/icons/un-view.svg";
  viewIcon: string = "../../../../assets/icons/view.svg";

  ngOnInit(): void {
    this.isPasswordField = this.type === 'password';
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.type = this.isPasswordVisible ? 'text' : 'password';
  }

  focusInput(): void {
    this.inputField.nativeElement.focus();
  }

  get showError(): boolean {
    return this.control.invalid && this.control.touched;
  }

  get errorMessage(): string | undefined {
    return this.handleFormErrorService.getErrorMessage(this.control);
  }
}
