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

  getalltask(){
    return this.http.get<any>(`${this.ROOT_URL}/api/v1/users/getalltaskss`)  }


    deletetask(){
      return this.http.delete<any>(`${this.ROOT_URL}/api/v1/tasks/deletetask`)
    }

    updatetask(id:any){
      return this.http.put<any>(`${this.ROOT_URL}/api/v1/tasks/updatetask/${id}`,id)
    }

}
