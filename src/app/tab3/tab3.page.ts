import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [LoadingComponent]
})
export class Tab3Page implements OnInit {
  notification_count: any;
  admin;

  constructor(private apiService: ApiService, private loading: LoadingComponent) { }
  result;

  async ngOnInit() {

    if (localStorage.getItem('admin') === "true") {
      this.admin = true;
    } else {
      this.admin = false;
    }

    let params;
    if (!this.admin) {
      params = {
        filter: {
          assignee_email: localStorage.getItem('email')
        }
      };
    } else {
      params = {
        filter: {
          acknowledge_email: localStorage.getItem('email')
        }
      };
    }

    let loading = await this.loading.loading();
    loading.present();

    this.apiService.post("/v1/dashboard/get-raise-request", params).subscribe(async res => {
      loading.dismiss();
      this.result = res['data'];
    });

    let notificationParams = {
      "filter": {
        "email": {
          "$in": [localStorage.getItem('email')]
        }
      }
    };

    this.apiService.post('/v1/dashboard/getall-notification', notificationParams).subscribe(res => {
      this.notification_count = res['data'].length;
    });

  }

}
