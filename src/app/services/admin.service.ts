import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { admin } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private api: ApiService
  ) { }

 // /  ---------------  admin add fn -------------

    async add(a: admin ){ 
      let data = await this.api.post("/admin/add",a) 
      return data
    }
  
    // --------------- admin authenticate -------------
  
    async authenticate(
      email: string,
      password: string) {
      let body = {
        email: email,
        password: password
      }
      let data = await this.api.post("/admin/authenticate", body)
      return data;
  
    }

}


