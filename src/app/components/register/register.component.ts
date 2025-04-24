import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailValidatorService } from 'src/app/validators/email-validator.service';
import { UsernamelValidatorService } from 'src/app/validators/username-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private emailValidator: EmailValidatorService,
    private usernameValidatorService: UsernamelValidatorService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', Validators.required, [this.usernameValidatorService]],
      email: ['', [Validators.required, Validators.email], [this.emailValidator]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  register() {

    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        data => {

          this.authService.setToken(data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          this.authService.usuario = data.user;
          this.authService.logued = true;
          this.authService.loggedIn.next(true);
          this.router.navigate(['/main/home']);

        },
        err => {
          console.error(err);
        }
      );
    } else {
    }
  }

  getErrorMessage(controlName: string) {

    const errors: any = this.registerForm.get(controlName)?.errors;

    if (errors?.required) return 'Campo Requerido';
    if (errors?.email) return 'Correo Invalido';
    if (errors?.emailExists) return 'Este correo ya existe';
    if (errors?.usernameExists) {
      return 'Este usuario ya existe'
    }
    else{
      return ''
    }

  }

  formInvalid(form: string) {
    return this.registerForm.get(form)?.invalid && this.registerForm.get(form)?.touched 
  }

}
