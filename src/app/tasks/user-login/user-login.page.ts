import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from 'src/app/services/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class UserLoginPage implements OnInit {

  constructor(
    private ut: UtilService,
    private us: UserService,
    private rt: Router
  ) { }

  ngOnInit() {
  }

  email: string = ""
  password: string = ""
  async login() {
    if( !this.email || !this.password ) {
      this.ut.toast("Please enter email and password")
    }else{
      await this.ut.show_loader("Authenticating...")
      let d = await this.us.authenticate(this.email, this.password)
      if(!d.ok){
        this.ut.toast(d.msg)
        await this.ut.hide_loader()
      }
      else{
        localStorage.setItem('user', JSON.stringify(d.data))
        localStorage.setItem('token', d.token)
        await this.ut.hide_loader()
        this.rt.navigate(['/user-dashboard'])
      }
    }
  }

  
  passwordVisible: boolean = false;  // Default state (password hidden)

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

}
