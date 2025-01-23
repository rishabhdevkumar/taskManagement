import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DestrictService {

  constructor(
    private api: ApiService
  ) { }

  async destrict_all() {
    return await this.api.post("/destrict/getall", {});
  }

  async user_destrict_by_type(state_id: any) {
    return await this.api.post(`/destrict/get_destrict_by_id/${state_id}`, {});
  }

}
