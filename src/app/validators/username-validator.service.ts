import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsernamelValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

      const userName = control.value

      return this.http.post(`${this.apiUrl}/validations/checkUsername`, {userName})
             .pipe(
              delay(1000),
              map(resp => {
                return (resp) ? {usernameExists: true} : null
              })
            );
  }


}
