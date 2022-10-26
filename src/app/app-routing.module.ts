import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProgramComponent } from './program/program.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { BookingComponent } from './booking/booking.component';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { EmployeeProgramComponent } from './employee-program/employee-program.component';
import { EventsComponent } from './events/events.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { ConfirmComponent } from './confirm/confirm.component';


const routes: Routes = [
  { path: 'program', component: ProgramComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'booking/:id', component: BookingComponent },
  { path: 'detail/:id', component: MovieDetailComponent},
  { path: 'info', component: InfoComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'emprogram', component: EmployeeProgramComponent},
  { path: 'confirm', component: ConfirmComponent},
  { path: 'events/:id', component: EventsComponent},
  { path: 'editEvents/:miD/:eId', component: EventsComponent},
  { path: 'newMovie', component: NewMovieComponent},
  { path: 'overview', component: ConfirmComponent},



];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes),
      RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})]
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
