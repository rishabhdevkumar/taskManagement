import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { user } from 'src/app/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

  reg: user = {
    name: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
    address: ""
  };

  emailError: string = '';

  constructor(
    private ut: UtilService,
    private us: UserService,
    private rt: Router
  ) { }

  ngOnInit() {
  }

  async register() {
    if (!this.reg.name || !this.reg.email || !this.reg.password || !this.reg.dob || !this.reg.phone|| !this.reg.address) {
       this.ut.toast("ALL FIELDS ARE REQUIRED");
    }else{await this.ut.show_loader("Adding...");
      await this.us.add(this.reg); 
      await this.ut.hide_loader()
      await this.ut.toast("Register successfully!");

    }
  }
// --------------------- email validation fn ---------------
  validateEmail() {
    const email = this.reg.email;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log( email );
    if (!emailPattern.test(email||"") ){
      this.emailError = 'Please enter valid email';
    } else {
      this.emailError = '';
    }
  }
// ------------ phone no validation fn ---------------
  onnumber() {
    this.reg.phone = this.reg.phone.replace(/[^0-9]/g, ''); 

    if (this.reg.phone.length > 10) {
      this.reg.phone = this.reg.phone.slice(0, 10);
    }
  }
  
// --------------- password validation fn ----------------
  password() {
    this.reg.password = this.reg.password.replace(/[^0-7]/g, ''); 
    // Restrict length to 10 digits
    if (this.reg.password.length > 7) {
      this.reg.password = this.reg.password.slice(0, 7);
    }
  }

}
