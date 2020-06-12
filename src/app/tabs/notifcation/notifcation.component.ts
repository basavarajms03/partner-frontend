import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { charSet } from "./notification.constants";

@Component({
  selector: 'app-notifcation',
  templateUrl: './notifcation.component.html',
  styleUrls: ['./notifcation.component.scss'],
  providers: [LoadingComponent]
})
export class NotifcationComponent implements OnInit {
  notifications: any;
  background = "navy";
  code;

  constructor(private apiService: ApiService, private loading: LoadingComponent) { }

  async ngOnInit() {

    let loading = await this.loading.loading();
    loading.present();

    let notificationParams = {
      "filter": {
        "email": {
          "$in": [localStorage.getItem('email')]
        }
      }
    };

    this.apiService.post('/v1/dashboard/getall-notification', notificationParams).subscribe(res => {
      loading.dismiss();
      this.code = charSet;
      this.notifications = res['data'];
    });

  }

}
