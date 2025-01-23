import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private rt: Router
  ) { }
  
  async post(path: string, body: any={}, type: string="JSON") {
    try {
      // Prepare headers, excluding Content-Type for FormData
      let headers: any = {
        "Authorization": localStorage.getItem("token") || ""
      };
  
      // Only add Content-Type if the body is not FormData
      if (type == "JSON") {
        headers["Content-Type"] = "application/json";
      }
  
      let res = await fetch(environment.api_url + path, {
        method: "POST",
        headers: headers,
        body: type=="JSON" ? JSON.stringify(body): body
      });
  
      if (!res.ok) {
        return { ok: false, status: res.status, msg: "Something went wrong" };
      } else {
        let data: any = null;
        switch(type){
          case "JSON":
            data = await res.json()
          break;
          case "Blob":
            data = await res.blob()
          break;
        }
        if( typeof data === "object" && !data.ok && data.type == "LOGIN" ){
          this.logout();
          return data;
        }else return data;
      }
    } catch (e) {
      return { ok: false, error: e, msg: "Something went wrong" };
    }
  }



  async post_form(path: string, body: FormData, type: string="JSON") {
    try {
      let headers: any = {
        "Authorization": localStorage.getItem("token") || ""
      };
  
      if (type == "JSON") {
        headers["Content-Type"] = "application/json";
      }
  
      let res = await fetch(environment.api_url + path, {
        method: "POST",
        headers: headers,
        body: body
      });
  
      if (!res.ok) {
        return { ok: false, status: res.status, msg: "Something went wrong" };
      } else {
        let data: any = null;
        switch(type){
          case "JSON":
            data = await res.json()
          break;
          case "Blob":
            data = await res.blob()
          break;
        }
        if( typeof data === "object" && !data.ok && data.type == "LOGIN" ){
          this.logout();
          return data;
        }else return data;
      }
    } catch (e) {
      return { ok: false, error: e, msg: "Something went wrong" };
    }
  }


  async isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload()
  }
}
