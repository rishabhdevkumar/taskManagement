import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { country, countryFilter } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private api: ApiService
  ) { }

  async country_all(){ 
    let data = await this.api.post("/country/getall",{}) 
    return data;
  }
// -------------- update country service ----------------

  async country_update(c: country){ 
    let data = await this.api.post("/country/update", c) 
    return data;
  }


  async search( c : countryFilter){
    let data = await this.api.post("/country/search",c);
    return data;

  }

  

}
