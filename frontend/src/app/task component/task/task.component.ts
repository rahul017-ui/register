import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../task.service';
import { UserService } from '../../user.service';
import { task } from 'src/app/model/task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: task[] | undefined;
  isUpdate = false
  userId: any

  taskForm!:FormGroup
  // taskForm = new FormGroup({
  //   pincode: new FormControl('',Validators.required),
  //   task: new FormControl('')
  // })
  constructor(private formBuilder: FormBuilder,private taskService: TaskService, private router: Router, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTask()
    this.taskForm=this.formBuilder.group({
      pincode:['',Validators.required],
      task:['',Validators.required]
    })  
  }

  onCreateTask() {
    this.taskForm.controls['pincode'].clearValidators(); 
    this.taskForm.controls['task'].clearValidators(); 
    this.taskService.createTask(this.taskForm.value).subscribe(res => {
      this.toastr.success('Task Created', 'Success!');
      this.taskForm.reset();
      this.getTask()
    })
  }

  onLogout() {
    this.toastr.success('Logout successfully', 'Success!');
    this.userService.removeAuthToken();
    this.router.navigate(['/login']);
  }
  onDelete(id: any) {

    this.taskService.deleteTask(id).subscribe((res) => {
      this.toastr.success('Task Deleted', 'Success!');
      this.getTask()
    })
  }

  patchValue(task: any) {
    this.taskForm.patchValue({
      pincode: task.pincode,
      task: task.task
    })
    this.userId = task._id
    this.isUpdate = true
  }
  getTask() {
    this.taskService.getTasks().subscribe((res) => {
      this.tasks = res;
    }
    )
  }
  onUpdate(id: any) {
    this.taskForm.controls['pincode'].clearValidators(); 
    this.taskForm.controls['task'].clearValidators(); 
    let data = this.taskForm.value
    this.taskService.updateTask(data, id).subscribe((res) => {
      this.toastr.success('Updated successfully', 'Success!');
      this.taskForm.reset()
      console.log(res)
      this.getTask()
      this.isUpdate = false
    })
  }

  get taskFormControl() {
    return this.taskForm.controls;
  }

}
