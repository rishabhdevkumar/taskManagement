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

    // /  --------------- add service -------------

    async add(u: user ){ 
      let data = await this.api.post("/user/add",u) 
      return data;
    }

    // ------------- getall service -------------
    async getall(){
      let data = await this.api.post("/user/getall");
      return data;
    }
  
    // --------------- authenticate service-------------
  
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
    // ------------------ update service----------------
     async user_update(u: user){ 
        let data = await this.api.post("/user/update", u) 
        return data;
      }

    // ------------- search service-------------------
    async search( u : userFilter){
        let data = await this.api.post("/user/search",u);
        return data;
    
      }
    // ------------------ get self service -----------------
      async get_self() {
        try {
          let data = await this.api.post("/user/get_self", {});
          return Array.isArray(data) && data.length > 0 ? data[0] : null;
        } catch (error) {
          console.error("Error fetching user data:", error);
          return null;
        }
      }
    // -------------------- profile update service ------------------

      async update_profile_self(image: Blob) {
        try {
          let fd = new FormData();
          fd.append("profile", image);
          return await this.api.post_form("/user/update_profile_self", fd);
        } catch (error) {
          console.error("Error updating profile:", error);
          return null;
        }
      }
    
      // ---------------------- get [profile service ----------------]
      async get_profile_self() {
        try {
          let data = await this.api.fetch_blob("/user/get_profile_self");
          return data instanceof Blob ? data : null;
        } catch (error) {
          console.error("Error fetching profile image:", error);
          return null;
        }
      }
    
}
