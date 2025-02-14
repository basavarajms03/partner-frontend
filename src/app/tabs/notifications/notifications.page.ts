import { Component } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { charSet } from "../notifications/notification.constants";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  providers: [LoadingComponent]
})
export class NotificationsPage {

  notifications: any;
  socket: any;
  colorStyles = {
    background: '#cce5ff',
    color: '#004085'
  };
  code;

  constructor(private apiService: ApiService, private loading: LoadingComponent) {
    this.socket = this.apiService.initSocket;
    this.socket.on('notification', data => {
      console.log("Notification information", data);
    });
  }

  async ionViewWillEnter() {

    let loading = await this.loading.loading();
    loading.present();

    let notificationParams = {
      "filter": {
        "email": {
          "$in": [localStorage.getItem('email')]
        }
      },
      sort: { updatedAt: -1 }
    };

    this.apiService.post('/v1/dashboard/getall-notification', notificationParams).subscribe(res => {
      loading.dismiss();
      this.code = charSet;
      this.notifications = res['data'];
    });

  }

}
