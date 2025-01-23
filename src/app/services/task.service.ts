import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { task } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private api: ApiService
  ) { }

 // /  --------------- add fn -------------

    async add(t: task ){ 
      let data = await this.api.post("/task/add",t) 
      return data;
    }

    // ------------- getall fn -------------
    async getall(){
      let data = await this.api.post("/task/getall");
      return data;
    }

}
