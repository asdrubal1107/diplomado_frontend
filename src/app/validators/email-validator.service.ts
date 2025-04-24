import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

      const email = control.value

      return this.http.post(`http://localhost:3000/api/validations/checkEmail`, {email})
             .pipe(
              delay(1000),
              map(resp => {
                return (resp) ? {emailExists: true} : null
              })
            );
  }


}
