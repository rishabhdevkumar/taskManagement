import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { CountryService } from 'src/app/services/country.service';
import { UtilService } from 'src/app/services/util.service';
import { StateService } from 'src/app/services/state.service';
import { country, state, user } from 'src/app/interfaces';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class UserDashboardPage implements OnInit {

  filtercountry: country[] = [];
  filterstate: state[] = [];

  filter: any = {
    country_id: 0,
    state_id: 0,
  };

  constructor(
    private api: ApiService,
    private rt: Router,
    private us: UserService,
    private ut: UtilService,
    private cs:CountryService,
    private ss: StateService,
    private route: ActivatedRoute
  ) { }

  user:user  | null = null; 
  projectName: string = '';  

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData) as user;
      console.log(this.user);
    }
    
    this.loadCountry();
    this.loadStates();


    this.route.queryParams.subscribe(params => {
      this.projectName = params['name'] || 'Default Project Name';
    });
  }

  currentSteps: number = 1;

  navigateToSteps(step: number) {
    this.currentSteps = step;
    console.log('Navigated to step:', this.currentSteps);
  }
  

  // ----------------- country fn --------------

  co: country[] = [];
  async loadCountry() {
    this.co = await this.cs.country_all();
  }

  // -------------- state fn -----------------

  st: state[] = [];
  async loadStates() {
    this.st = await this.ss.state_all();
  }
  async load_state() {
    if (this.filter.country_id) {
      this.st = await this.ss.student_state_by_type(this.filter.country_id);
    }
  }

  // -------------------- change ---------- profile --------- fn ----------

  self: any = {}; // Use 'any' or define a proper User interface
  profile: string | null = "";

  async load() {
    try {
      this.self = await this.us.get_self();
      const profile_data = await this.us.get_profile_self();

      if (profile_data instanceof Blob) {
        this.profile = URL.createObjectURL(profile_data);
      } else {
        console.warn("Invalid profile data format");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }


  ngOnDestroy() {
    if (this.profile) {
      URL.revokeObjectURL(this.profile);
    }
  }

async change_profile(){
  let img = await this.ut.select_photo();
  await this.ut.show_loader("updating....")
  await this.us.update_profile_self(img.blob);
  await this.ut.hide_loader();
  await this.ut.toast("profile updated")
}

logout(){
  this.api.logout()
}

navigateToOption(option: number): void {
  console.log('Navigating to Option', option);
}


}
