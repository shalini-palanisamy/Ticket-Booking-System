import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { SignInComponent } from './auth/signIn/signIn.component';
import { LogInComponent } from './auth/logIn/logIn.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { LoadingSpinnerComponent } from './loadingSpinner/loadingSpinner.component';
import { ViewBusComponent } from './viewBus/viewBus.component';
import { SearchComponent } from './viewBus/search/search.component';
import { BusSeatsComponent } from './viewBus/BusSeats/BusSeats.component';
import { BookingSeatComponent } from './viewBus/BookingSeats/BookingSeat.component';
import { BookingSummaryComponent } from './viewBus/BookingSummary/BookingSummary.component';

const appRoutes: Routes = [
  { path: '', component: HeaderComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children: [{ path: 'logIn', component: LogInComponent }],
  },
  { path: 'signIn', component: SignInComponent },
  { path: 'viewBus', component: ViewBusComponent },
  { path: 'busSeats', component: BusSeatsComponent },
  { path: 'bookingSeat', component: BookingSeatComponent },
  { path: 'bookingStatus', component: BookingSummaryComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignInComponent,
    AuthComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    ViewBusComponent,
    SearchComponent,
    BusSeatsComponent,
    BookingSeatComponent,
    BookingSummaryComponent
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
