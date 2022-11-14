import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskForm = new FormGroup({
    pincode: new FormControl('', Validators.required),
    task: new FormControl('', Validators.required)
  })
  constructor(private taskService: TaskService,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
  }
  oncreatetask() {
    this.taskService.createtask(this.taskForm.value).subscribe(res => {
      this.taskForm.reset();
    })
  }
  get taskFormControl() {
    return this.taskForm.controls;
  }


  onlogout(){
    this.userService.removeAuthToken();
    this.router.navigate(['/login']);

  }


}
