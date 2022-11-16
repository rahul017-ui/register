import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  ROOT_URL: string = environment.URL


  constructor(private http: HttpClient) { }

  createTask(data: any) {
    return this.http.post<any>(`${this.ROOT_URL}/api/v1/tasks/add`, data);
  }

  getTasks() {
    return this.http.get<any>(`${this.ROOT_URL}/api/v1/tasks/getalltaskss`)
  }


  deleteTask(id: any) {
    return this.http.delete<any>(`${this.ROOT_URL}/api/v1/tasks/deletetask/${id}`)
  }

  updateTask(data: any, id: any) {
    return this.http.put<any>(`${this.ROOT_URL}/api/v1/tasks/updatetask/${id}`, data)
  }

}
