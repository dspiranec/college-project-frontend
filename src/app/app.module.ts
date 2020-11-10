import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SuccessComponent } from './success/success.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import { MovieLoaderComponent } from './components/loader/movie-loader/movie-loader.component';
import { UserLoaderComponent } from './components/loader/user-loader/user-loader.component';
import { LoginLoaderComponent } from './components/loader/login-loader/login-loader.component';
import { RegisterLoaderComponent } from './components/loader/register-loader/register-loader.component';

import { MovieService } from './services/movie.service';
import { UserService } from './services/user.service';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';

import { MovieLoaderInterceptor } from './interceptors/movie-loader.interceptor';
import { UserLoaderInterceptor } from './interceptors/user-loader.interceptor';
import { LoginLoaderInterceptor } from './interceptors/login-loader.interceptor';
import { RegisterLoaderInterceptor } from './interceptors/register-loader.interceptor';
import { AuthExpiredInterceptor } from './interceptors/auth-expired.inteceptor';


@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieDetailComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForbiddenComponent,
    PageNotFoundComponent,
    SuccessComponent,
    AdminDashboardComponent,
    MovieLoaderComponent,
    UserLoaderComponent,
    LoginLoaderComponent,
    RegisterLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    MovieService,
    { provide: HTTP_INTERCEPTORS, useClass: MovieLoaderInterceptor, multi: true },
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: UserLoaderInterceptor, multi: true },
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: LoginLoaderInterceptor, multi: true },
    RegisterService,
    { provide: HTTP_INTERCEPTORS, useClass: RegisterLoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthExpiredInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
