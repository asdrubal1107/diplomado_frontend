import { NgModule }                                  from '@angular/core';
import { CommonModule }                              from '@angular/common';
import { RouterModule, Routes }                      from '@angular/router';

import { AuthGuard }                                 from 'src/app/guards/auth.guard';

import { MainComponent }                             from 'src/app/components/main/main.component';
import { HomeComponent }                             from 'src/app/components/home/home.component';
import { ProfileComponent }                          from 'src/app/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full' 
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MainModule { }
