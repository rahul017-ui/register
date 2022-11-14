import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  ROOT_URL: string = environment.URL


  constructor(private http:HttpClient) { }

  createtask(data:any){
    return this.http.post<any>(`${this.ROOT_URL}/api/v1/tasks/add`, data);
  }

  gettask(id:any){
    return this.http.get<any>(`${this.ROOT_URL}/api/v1/tasks//gettasklist/${id}`)

  }

}
