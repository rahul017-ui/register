import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthInterceptor } from './auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './user component/register/register.component';
import { LoginComponent } from './user component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule ,HTTP_INTERCEPTORS} from "@angular/common/http";
import { TaskComponent } from './task component/Add task/task.component';
import {MatTableModule} from '@angular/material/table';
import { TaskDetailsComponent } from './task component/task-details/task-details.component';
import { TaskDashboardComponent } from './task component/task-dashboard/task-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    TaskComponent,
    TaskDetailsComponent,
    TaskDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatToolbarModule
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
