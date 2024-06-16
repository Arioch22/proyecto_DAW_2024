import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationsService {

  constructor() { }
}

export function validateCategory(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validOptions = ['individual', 'company'];
    const value = control.value;
    if (validOptions.includes(value)) {
      return null;
    } else {
      return { invalidCategory: true };
    }
  };
}

export function validateIVA(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validOptions = [1, 2, 3, 4];
    const value = control.value;
    if (validOptions.includes(value)) {
      return null;
    } else {
      return { invalidCategory: true };
    }
  };
}

export function maxDateValidator(today: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && value > today) {
      return { maxDate: true }; // Ajusta la clave del error a 'maxDate'
    }
    return null;
  };
}
