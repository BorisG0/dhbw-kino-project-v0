import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProgramComponent } from './program/program.component';

const routes: Routes = [
  { path: 'program', component: ProgramComponent}
];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
