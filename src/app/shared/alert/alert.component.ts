import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  constructor(private alert: AlertController) { }

  ngOnInit() {}

  async createAlert(header, subTitle) {
    let alert = await this.alert.create({
      header: header,
      subHeader: subTitle,
      buttons: [
        {
          text: "Ok",
          role: "cancel"
        }
      ]
    });

    alert.present();
  }

}
