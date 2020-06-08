import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
  providers: [LoadingComponent]
})
export class MoreInfoComponent implements OnInit {

  options;
  result;
  created_time;
  notification_count = 0;

  constructor(private actRouter: ActivatedRoute, private loadingController: LoadingComponent, private apiService: ApiService) { }

  async ngOnInit() {
    let loading = await this.loadingController.loading();
    loading.present();
    this.options = this.actRouter.snapshot.paramMap.get('id');
    let params = { _id: this.options };
    this.apiService.post("/v1/dashboard/get-raise-request", params).subscribe(async res => {
      loading.dismiss();
      this.result = res['data'][0];
      this.created_time = new Date(res['data'][0].createdAt);
      console.log("Workorder information", this.result);
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
