import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProgramComponent } from './program/program.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'program', component: ProgramComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'booking/:id', component: BookingComponent },
  { path: 'detail/:id', component: MovieDetailComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
