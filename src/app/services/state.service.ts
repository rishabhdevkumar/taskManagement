import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { state, stateFilter } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor( 
    private api: ApiService
  ) { }

// ------------ state getall -----------------

  async state_all() {
    return await this.api.post("/state/getall", {});
  }

// ---------- state get by country id service --------

  async student_state_by_type(country_id: any) {
    return await this.api.post(`/state/get_state_by_id/${country_id}`, {});
  }

// -------------- update state  ----------------
  
    async state_update(s: state){ 
      let data = await this.api.post("/state/update", s) 
      return data;
    }

// ---------------- search state --------------

  async search( s : stateFilter){
      let data = await this.api.post("/state/search",s);
      return data;
  
    }

}
