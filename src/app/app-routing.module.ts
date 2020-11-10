import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailComponent } from './components//movie-detail/movie-detail.component';
import { MovieComponent } from './components//movie/movie.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components//register/register.component';
import { ProfileComponent } from './components//profile/profile.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SuccessComponent } from './success/success.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminAuthGuardService } from './guards/admin-auth-guard.service';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'movies', component: MovieComponent},
  { path: 'movies/:id', component: MovieDetailComponent},
  { path: 'success', component: SuccessComponent},
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuardService]},
  { path: 'forbidden', component: ForbiddenComponent},
  { path: 'not-found', component: PageNotFoundComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
