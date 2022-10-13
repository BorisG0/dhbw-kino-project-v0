import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProgramComponent } from './program/program.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './header/header.component';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import { SeatComponent } from './seat/seat.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {InfoComponent} from './info/info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RegistrationComponent } from './registration/registration.component';
//import { NgSelectModule } from '@ng-select/ng-select';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieClickableComponent } from './movie-clickable/movie-clickable.component';
import { EmployeeProgramComponent } from './employee-program/employee-program.component';
import { EventsComponent } from './events/events.component';
import {MatTableModule} from '@angular/material/table';
import { NewMovieComponent } from './new-movie/new-movie.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';






@NgModule({
  declarations: [
    AppComponent,
    ProgramComponent,
    DashboardComponent,
    MovieDetailComponent,
    MessagesComponent,
    HeaderComponent,
    BookingComponent,
    LoginComponent,
    SeatComponent,
    RegistrationComponent,
    InfoComponent,
    MovieClickableComponent,
    EmployeeProgramComponent,
    EventsComponent,
    NewMovieComponent
 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatRadioModule,
    MatGridListModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    //NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
