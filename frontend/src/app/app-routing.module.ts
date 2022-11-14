import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {path:"",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"task",component:TaskComponent,canActivate: [LoginGuard]},
  {path:":id",component:TaskDetailsComponent,canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
