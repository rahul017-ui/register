import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { tasks } from '../../model/task';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task: tasks[] | undefined;

  constructor(private taskService: TaskService,private route:ActivatedRoute) { }


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

  onDelete(id:any){
    this.taskService.deletetask(id).subscribe((res)=>{
      console.log(res)
    })
  }
  
  onUpdate(){
    
  }
  // onUpdate(id:any){
  //   this.taskService.updatetask(id).subscribe((res)=>{

  //   })
  // }

}
