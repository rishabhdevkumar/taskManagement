import { Injectable } from '@angular/core';
import {ToastController, LoadingController, AlertController} from '@ionic/angular'
import {ModalController} from '@ionic/angular/standalone'
import { PhotoSelectorPage } from '../tasks/photo-selector/photo-selector.page';
// import {AlertController} from '@ionic/angular/stan
// import { PhotoSelectorPage } from '../student-login/photo-selector/photo-selector.page';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private ts : ToastController,
    private lc: LoadingController,
    private ac: AlertController,
    private mc: ModalController
  ) { }

  async toast(msg:string){
    const t = await this.ts.create({
      message:msg,
      duration:2000
    })
    await t.present();
  }

  async show_loader(msg:string){
    const l = await this.lc.create({
      message:msg
    })
    await l.present();
  }

  async hide_loader(){
    await this.lc.dismiss()
  }

  async confirm(msg: string, yes: string = "Yes", no: string = "Cancel"){
    let c = await this.ac.create({
      message : msg,
      buttons : [
        {
          text : no,
          role : "no"
        },
        {
          text : yes,
          role : "yes"
        }
      ]
    })
    await c.present()
    let {role} = await c.onDidDismiss()
    return role;
  }

  async select_photo(aspect: number=5/5){
    let s = await this.mc.create({
      component: PhotoSelectorPage,
      componentProps : {
        aspect : aspect
      }
    })
    await s.present()
    let {data} = await s.onDidDismiss()
    return data;
  }

}
