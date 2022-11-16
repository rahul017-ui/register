import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './user component/login/login.component';
import { RegisterComponent } from './user component/register/register.component';
import { TaskDashboardComponent } from './task component/task-dashboard/task-dashboard.component';
import { TaskComponent } from './task component/task/task.component';

const routes: Routes = [
  { path: "", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "task", component: TaskDashboardComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
