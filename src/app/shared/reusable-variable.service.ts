import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReusableVariableService {

  constructor() { }

  get phoneNumber(): Number {
    return Number(localStorage.getItem('phoneNumber'));
  }

  get email(): string {
    return localStorage.getItem('email');
  }

  get getEmployeeTypes(): Array<string> {
    return Array(localStorage.getItem('employeeTypes'));
  }
}
