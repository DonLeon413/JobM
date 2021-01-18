import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import {AccountService} from './__services/account.service'
import {ISignInStorageService} from './__services/isigninstorage.service';
import {SignInLocalStorageService} from './__services/signinlocalstorage.service';
import {AuthenticationService} from './__services/authentication.service';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginInfoComponent} from './logininfo/logininfo.component';
import {LoginComponent} from './login/login.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ProfilesComponent} from './profiles/profiles.component';
import {AuthGuard} from './guards/auth.guard';
import {ENVIRONMENT} from './__services/environment.service';
import {environment} from '../environments/environment';
import { RegisterModalComponent } from './registermodal/register.modal.component';

import { JwtInterceptor } from './helpers/Jwt.Interceptor';
import { CORSInterceptor } from './helpers/CORS.Interceptor';

import { DataTablesModule } from 'angular-datatables';
import { DataTableDetailsComponent } from './datatabledetails/datatabledetails.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { UserModalComponent } from './usermodal/user.modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginInfoComponent,
    LoginComponent,
    ProfilesComponent,
    RegisterModalComponent,
    UserModalComponent,
    DataTableDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    CommonModule,
    DataTablesModule,

    MatTableModule,
    MatPaginatorModule,
    NoopAnimationsModule,
    MatSortModule
  ],
  providers: [
    AuthGuard,    
    AccountService,
    { provide: ISignInStorageService, useValue: new SignInLocalStorageService() },
    { provide: ENVIRONMENT, useValue: environment },
    AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CORSInterceptor,
          multi: true
      }
  ],
  entryComponents: [
    RegisterModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
