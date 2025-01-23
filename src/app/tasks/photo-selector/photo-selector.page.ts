import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { ImageCroppedEvent,ImageCropperComponent } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-photo-selector',
  templateUrl: './photo-selector.page.html',
  styleUrls: ['./photo-selector.page.scss'],
  standalone: true,
  imports: [IonicModule, ImageCropperComponent ]
})
export class PhotoSelectorPage implements OnInit {

  @Input() aspect: number = 5/5

  imageChangedEvent: Event | null = null
  croppedImage: any = {}


  constructor(
    private mc: ModalController
  ) { }

  ngOnInit() {
  }

  fileChange(event: Event): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = {
      objectUrl: event.objectUrl,
      base64: event.base64,
      blob: event.blob
    };
  }
  close(withData: boolean = false){
    this.mc.dismiss(withData ? this.croppedImage : {})
  }


}
