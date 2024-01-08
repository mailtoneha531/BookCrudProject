import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from './_helpers';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertComponent } from './_components';
import { AddquoteComponent } from './quotes/addquote/addquote.component';
import { ListquoteComponent } from './quotes/listquote/listquote.component';
import { ThemeService } from './_services/theme.service';
//import { ListbookComponent } from './books/listbook/listbook.component';
//import { AddeditbookComponent } from './books/addeditbook/addeditbook.component';
//import { ListComponent } from './users/list/list.component';
//import { AddEditComponent } from './users/add-edit/add-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
