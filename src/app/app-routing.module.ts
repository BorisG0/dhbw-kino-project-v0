import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProgramComponent } from './program/program.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const routes: Routes = [
  { path: 'program', component: ProgramComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: MovieDetailComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
