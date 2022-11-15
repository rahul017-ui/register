import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../task.service';
import { UserService } from '../../user.service';
import { tasks } from 'src/app/model/task';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: tasks[] | undefined;
  isUpdate=false
  userId:any
  

  taskForm = new FormGroup({
    pincode: new FormControl('', Validators.required),
    task: new FormControl('', Validators.required)
  })
  constructor(private taskService: TaskService,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.gettask()

    
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
  onDelete(id:any){
    this.taskService.deletetask(id).subscribe((res)=>{
      console.log(res)
    })
  }
  
  onUpdate(task:any){
    this.taskForm.patchValue({
    pincode:task.pincode ,
    task:task.task
    })
    this.userId = task._id
    this.isUpdate=true
console.log(this.userId)
  }
  gettask() {
    this.taskService.getalltask().subscribe((res) => {
      this.task = res;
      // console.log(this.task)

    }
    )
  }
   Update(id:any){
    let data = this.taskForm.value
    this.taskService.updatetask(data,id).subscribe((res)=>{
console.log(res)
this.gettask()

    })}
  

}
