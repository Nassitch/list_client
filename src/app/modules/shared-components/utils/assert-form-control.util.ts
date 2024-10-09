import {AbstractControl, FormControl} from "@angular/forms";

export function assertFormControl(control: AbstractControl | null, name: string): FormControl {
    if (control instanceof FormControl) {
      return control;
    } else {
      throw new Error(`Le contrôle '${name}' n'est pas un FormControl ou est null.`);
    }
  }
