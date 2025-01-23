import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { user, userFilter } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService
  ) { }

  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

    // /  --------------- add fn -------------

    async add(u: user ){ 
      let data = await this.api.post("/user/add",u) 
      return data;
    }

    // ------------- getall fn -------------
    async getall(){
      let data = await this.api.post("/user/getall");
      return data;
    }
  
    // --------------- authenticate -------------
  
    async authenticate(
      email: string,
      password: string) {
      let body = {
        email: email,
        password: password
      }
      let data = await this.api.post("/user/authenticate", body)
      return data;
  
    }
    // ------------------ user update ----------------
     async user_update(u: user){ 
        let data = await this.api.post("/user/update", u) 
        return data;
      }

    // ------------- user search -------------------
    async search( u : userFilter){
        let data = await this.api.post("/user/search",u);
        return data;
    
      }

      async update_profile_self(image: Blob){
        let fd = new FormData()
        fd.append("profile",image)
        let data = await this.api.post_form("/user/update_profile_self",fd);
        return data
      }

      async get_profile_self(){
        let data = await this.api.post("/user/get_profile_self")
      }

}
