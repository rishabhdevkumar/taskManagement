import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdminLoginPage implements OnInit {

  constructor(
    private ut: UtilService,
    private as: AdminService,
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
      let d = await this.as.authenticate(this.email, this.password)
      if(!d.ok){
        this.ut.toast(d.msg)
        await this.ut.hide_loader()
      }
      else{
        localStorage.setItem('admin', JSON.stringify(d.data))
        localStorage.setItem('token', d.token)
        await this.ut.hide_loader()
        this.rt.navigate(['/admin-dashboard'])
      }
    }
  }

}
