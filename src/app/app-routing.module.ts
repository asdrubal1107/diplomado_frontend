import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
  },
  { path: '', 
    redirectTo: 'main' ,
    pathMatch: 'full' 
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
