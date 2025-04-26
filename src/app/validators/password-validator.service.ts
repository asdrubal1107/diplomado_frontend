import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService implements AsyncValidator {

  constructor(private http: HttpClient,
              private authService: AuthService 
  ) { }

  private apiUrl = environment.apiUrl;

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

      const password = control.value

      return this.http.post(`${this.apiUrl}/validations/checkPassword`, {password, userId: this.authService.usuario._id})
             .pipe(
              delay(1000),
              map(resp => {
                return (resp) ? {passwordNoExist: true} : null
              })
            );
  }


}
