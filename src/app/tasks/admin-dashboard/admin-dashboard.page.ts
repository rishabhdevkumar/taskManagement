import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { admin, country, countryFilter, destrict, state, stateFilter, task, user, userFilter } from 'src/app/interfaces';
import { UtilService } from 'src/app/services/util.service';
import { CountryService } from 'src/app/services/country.service';
import { StateService } from 'src/app/services/state.service';
import { TaskService } from 'src/app/services/task.service';
import { ToastController } from '@ionic/angular'
import { DestrictService } from 'src/app/services/destrict.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class AdminDashboardPage implements OnInit {
  users: user[] = [];  
  filteredUsers: user[] = [];  
  // searchTerm: string = ''; 
  newUser: user = {};
  selectedUser: user ={}

  countries: country[] = [];
  filteredcountry: country[] = [];
  newcountry: country = {};
  selectedcountry: country ={}
  states: state[] = [];
  filteredstate: state[] = [];
  newstate: state = {};
  selectedstate: state ={}
  destricts: destrict[] = [];
  filtereddestrict: destrict[] = [];
  newdestrict: destrict = {};
  selecteddestrict: destrict ={}
 
  tasks: task[] = [];
  filtertasks: task[] = [];

  filter: any = {
    country_id: 0,
    state_id: 0,
    destrict_id: 0,
    status: 0
  };

  add: user = {
    name: '',
    email: '',
    password: '',
    dob: '',
    phone: '',
    address: '',
  };

  a: task = {
    name: '',
    description: '',
  };

  selectedDate: string = "";

  constructor(
    private us: UserService,
    private api: ApiService,
    private ut: UtilService,
    private cs: CountryService,
    private ss: StateService,
    private ds: DestrictService,
    private ts: TaskService,
    private rt: Router,
    private Tc: ToastController
  ) {}

  self : admin = {};

  ngOnInit() {
    this.self = JSON.parse(localStorage.getItem('admin') || "{}")
    console.log(this.self)

    this.loadAllUsers();
    this.loadAllTasks();
    // this.loadCountries();
    this.loadAllCountry();
    this.loadAllstate();
    // this.loadstates();
    // this.loaddestrict();
    this.loadAlldestricts();
    this.search()
  }
//-----------  To ---- Navigate ---- another ---- section --------------

  currentStep: number = 1;

  navigateToSteps(step: number) {
    this.currentStep = step;
  }

// ---------- users ------ all ---- functions ---- and ----- methods  ------------ -->
  getTotalRegisteredUsers(): number {
    return this.users.length; 
  }
  logout(){
    this.api.logout()
  }
// ----------------- add user ------------ -->
    async submit() {
      if (
        !this.add.name ||
        !this.add.email ||
        !this.add.password ||
        !this.add.dob ||
        !this.add.phone ||
        !this.add.address
      ) {
        this.ut.toast('ALL FIELDS ARE REQUIRED');
      } else {
        await this.ut.show_loader('Adding...');
        await this.us.add(this.add);
        await this.ut.hide_loader();
        await this.ut.toast('user Added successfully!');
      }
    }
  // --------------- user saerch ----------
  u: userFilter = {
    id : '0',
    rc: 20,
    page: 1,
    name: '',
    email: ''
  }
  uses: user[] = []
  async src() {
    let data: any[] = await this.us.search(this.u)
    if (data.length == 0) {


    } else {
      this.uses = data;
    }
  }
  stus() {
    this.c.page = 1
    this.src()
  }
// ----------  getall  -----------

  async loadAllUsers() {
    try {
      this.users = await this.us.getall();
      this.filteredUsers = [...this.users];
      console.log('Loaded users:', this.users);
    } catch (error) {
      console.error('Error loading users:', error);
      this.ut.toast('Failed to load users. Please try again.');
    }
  }

// ------------- update ------------- -->
  is_add_open: boolean=false;

  open_add(){
    this.is_add_open=true;
  }
  close_add(){
    this.is_add_open=false;
  }

  is_open: boolean=false;
  async is_modal_add_open(){
    this.newUser.name="",
    this.newUser.email=""
    this.is_open=true
 }

  async updateUser() {
    if (!this.selectedUser) return;

    try {
      const response = await this.us.user_update(this.selectedUser); 
      if (response.ok) {
        this.ut.toast('User updated successfully!');
        this.loadAllUsers(); 
        this.is_open = false;
        this.selectedUser; 
      } else {
        this.ut.toast(' updating user.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      this.ut.toast('Error updating user. Please try again.');
    }
  }
  
  async editUser(user: user) {
    this.selectedUser = { ...user }; 
    this.is_add_open = true; 
 }

// -------------- tasks ------ ALL ---- fn ---- and --- methods ----------- -->

  // ------------------- add tasks  -----------------
  async task_submit() {
    console.log('Task data:', this.a);
  
    if (!this.a.name || !this.a.description) {
      this.ut.toast('ALL FIELDS ARE REQUIRED');
    } else {
      await this.ut.show_loader('Adding...');
      const response = await this.ts.add(this.a);
      console.log('Task add response:', response);
      await this.ut.hide_loader();
      await this.ut.toast('Task Added successfully!');
    }
  }
  
// --------- task getall --------- -->
  async loadAllTasks() {
    try {
      this.tasks = await this.ts.getall();
      this.filtertasks = [...this.tasks];
      console.log('Loaded tasks:', this.tasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      this.ut.toast('Failed to load tasks. Please try again.');
    }
  }

   // -------------- calculate --------- -->
   Totalgiventask(): number {
    return this.tasks.length; 
  }
 
// -------------- country ------- search --------------------- -->
  c: countryFilter = {
    id : '0',
    rc: 20,
    page: 1,
    name: '',
    code: ''
  }
  co: country[] = []
  async search() {
    let data: any[] = await this.cs.search(this.c)
    if (data.length == 0) {


    } else {
      this.co = data;
    }
  }
  status() {
    this.c.page = 1
    this.search()
  }

  async loadAllCountry() {
    try {
      this.countries = await this.cs.country_all();
      this.filteredcountry = [...this.countries];
      console.log('Loaded countries:', this.countries);
    } catch (error) {
      console.error('Error loading country:', error);
      this.ut.toast('Failed to load country. Please try again.');
    }
  }
  // ------------- country --------- Update ------------------
  is_countryadd_open: boolean=false;

  open_country_add(){
    this.is_countryadd_open=true;
  }
  close_country_add(){
    this.is_countryadd_open=false;
  }

  is_country_open: boolean=false;
  async is_modal_countryadd_open(){
    this.newcountry.code="",
    this.newcountry.name=""
    this.is_country_open=true
 }

  async updatecountry() {
    if (!this.selectedcountry) return;

    try {
      const response = await this.cs.country_update(this.selectedcountry); 
      if (response.ok) {
        this.ut.toast('Country updated successfully!');
        this.loadAllCountry(); 
        this.is_country_open = false;
        this.selectedcountry; 
      } else {
        this.ut.toast(' updating country.');
      }
    } catch (error) {
      console.error('Error updating country:', error);
      this.ut.toast('Error updating country. Please try again.');
    }
  }
  
  async editcountry(Country: country) {
    this.selectedcountry = { ...Country }; 
    this.is_countryadd_open = true; 
 }
  //-------------- state -------- search  -------------------- -->

  s: stateFilter = {
    id : '0',
    rc: 20,
    page: 1,
    name: '',
    short_name: ''
  }
  st: state[] = [];
  async srch() {
    let data: any[] = await this.ss.search(this.s)
    if (data.length == 0) {

    } else {
      this.st = data;
    }
  }
  statues() {
    this.s.page = 1
    this.srch()
  }

  // async loadstates() {
  //   try {
  //     this.st = await this.ss.state_all();
  //     this.filteredstate = this.st;
  //     console.log(this.filteredstate);
  //   } catch (error) {
  //     console.error('Error loading countries:', error);
  //   }
  // }

  async loadAllstate() {
    try {
      this.states = await this.ss.state_all();
      this.filteredstate = [...this.states];
      console.log('Loaded states:', this.states);
    } catch (error) {
      console.error('Error loading state:', error);
      this.ut.toast('Failed to load state. Please try again.');
    }
  }

// ----------------- state ------------ update ------------- -->
  is_stateadd_open: boolean=false;

  open_state_add(){
    this.is_stateadd_open=true;
  }
  close_state_add(){
    this.is_stateadd_open=false;
  }

  is_state_open: boolean=false;
  async is_modal_stateadd_open(){
    this.newstate.name="",
    this.newstate.short_name=""
    this.is_state_open=true
 }

  async updatestate() {
    if (!this.selectedstate) return;

    try {
      const response = await this.ss.state_update(this.selectedstate); 
      if (response.ok) {
        this.ut.toast('State updated successfully!');
        this.loadAllstate(); 
        this.is_state_open = false;
        this.selectedstate; 
      } else {
        this.ut.toast(' updating states.');
      }
    } catch (error) {
      console.error('Error updating state:', error);
      this.ut.toast('Error updating state. Please try again.');
    }
  }
  
  async editstate(State: state) {
    this.selectedstate = { ...State }; 
    this.is_stateadd_open = true; 
 }
  // ------------------ destrict ------------ fn -------------- -->

  des: destrict[] = [];

  async loaddestrict() {
    try {
      this.des = await this.ds.destrict_all();
      this.filtereddestrict = this.des;
      console.log(this.filtereddestrict);
    } catch (error) {
      console.error('Error loading destricts:', error);
    }
  }

  async loadAlldestricts() {
    try {
      this.destricts = await this.ds.destrict_all();
      this.filtereddestrict = [...this.destricts];
      console.log('Loaded destricts:', this.destricts);
    } catch (error) {
      console.error('Error loading destricts:', error);
      this.ut.toast('Failed to load destrict. Please try again.');
    }
  }


// -------------------- change ---------- profile --------- fn ----------
async change_profile(){
  let image = await this.ut.select_photo();
  console.log(image);
}
  
}
