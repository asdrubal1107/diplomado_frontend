import { NgModule }                                       from '@angular/core';
import { BrowserModule }                                  from '@angular/platform-browser';
import { BrowserAnimationsModule }                        from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }               from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule }            from '@angular/common/http';

import { AppRoutingModule }                               from './app-routing.module';
import { AppComponent }                                   from './app.component';
import { RegisterComponent }                              from './components/register/register.component';
import { LoginComponent }                                 from './components/login/login.component';

import { ToastrModule }                                   from 'ngx-toastr';

import { LoadingInterceptor }                             from './interceptor/loading-interceptor';
import { JwtInterceptor }                                 from './interceptor/jwt-interceptor';

import { HeaderComponent }                                from './components/header/header.component';
import { LoadingComponent }                               from './components/loading/loading.component';
import { MainComponent }                                  from './components/main/main.component';
import { SidebarComponent }                               from './components/sidebar/sidebar.component';
import { ProfileComponent }                               from './components/profile/profile.component';

import { DataGridComponent }                              from './widgets/data-grid/data-grid.component';
import { ModalComponent }                                 from './widgets/modal/modal.component';
import { UsersComponent }                                 from './components/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    LoadingComponent,
    MainComponent,
    SidebarComponent,
    ModalComponent,
    ProfileComponent,
    DataGridComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    ModalComponent,
    DataGridComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
