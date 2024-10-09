import { Injectable } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class HandleFormErrorService {
  public getErrorMessage(
    control: FormControl | FormArray | null
  ): string | undefined {
    if (!control?.errors) {
      return undefined;
    }

    const key: string = Object.keys(control.errors)[0];
    const error = control.getError(key);

    switch (key) {
      case 'minlength': {
        return `La longueur minimum est de ${error.requiredLength} caractères.`;
      }

      case 'maxlength': {
        return `La longueur maximum est de ${error.requiredLength} caractères.`;
      }

      case 'email': {
        return "Le format de l'email est invalide.";
      }

      case 'required': {
        return 'Le champ est requis.';
      }

      case 'pattern': {
        return "Le format n'est pas valide.";
      }

      default: {
        if (typeof error === 'string') {
          return error;
        }
        const data: string = JSON.stringify(error);
        throw new Error(`Unrecognized validator key: ${key} - Data: ${data}`);
      }
    }
  }
}
