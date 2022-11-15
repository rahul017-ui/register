import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { tasks } from '../../model/task';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task: tasks[] | undefined;


  constructor(private taskService: TaskService) { }


  ngOnInit(): void {
    this.gettask()
  }
  gettask() {
    this.taskService.getalltask().subscribe((res) => {
      this.task = res;
      // console.log(this.task)

    }
    )
  }

}
