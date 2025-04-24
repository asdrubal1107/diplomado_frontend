import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;

  formInvalid: boolean = false;

  constructor(private authService:AuthService,
              private fb: FormBuilder,
              private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]], 
    });

  }

  ngOnInit(): void {}
  
  login(){

    this.authForm.markAllAsTouched();

    if (this.authForm.valid) {

      this.authService.login(this.authForm.value).subscribe(data=>{
         
          this.authService.setToken(data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          this.formInvalid = false;
          this.authService.usuario = data.user;
          this.authService.logued = true;
          this.authService.loggedIn.next(true);
          this.router.navigate(['/main/home']);
      },
      error => {
        console.log(error)
        this.formInvalid = true; 
      });

    }
    else {
      this.formInvalid = true
    }

  }

}
