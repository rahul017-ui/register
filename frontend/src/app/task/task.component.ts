import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
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
  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

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
}
