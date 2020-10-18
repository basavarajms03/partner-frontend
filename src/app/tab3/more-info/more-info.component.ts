import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { ApiService } from 'src/app/shared/api.service';
import { workorderModel } from 'src/app/tab1/workorder.model';
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx/index";

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
  providers: [LoadingComponent, PhotoViewer]
})
export class MoreInfoComponent implements OnInit {

  result: workorderModel[] = [];
  created_time;
  notification_count = 0;
  assignwork = false;

  constructor(private actRouter: ActivatedRoute,
    private photoViewer: PhotoViewer,
    private router: Router, private loadingController: LoadingComponent, private apiService: ApiService) { }

  async ngOnInit() {
  }

  ionViewWillEnter() {
    this.getSpecificWorkorder();
  }

  async getSpecificWorkorder() {
    let params = {
      filter: {
        _id: this.actRouter.snapshot.params.id
      }
    };

    let loading = await this.loadingController.loading();

    (loading).present();
    this.apiService.post("/v1/dashboard/get-raise-request", params).subscribe(async res => {
      loading.dismiss();
      this.result = res['data'];
    });
  }

  async startWorkorder() {
    let params = {
      filter: {
        _id: this.result[0]._id
      },
      flag: 'inProgress',
      user_email: this.result[0].created_email,
      created_email: this.result[0].assignee_email,
      update: {
        status: "In-Progress"
      },
    }

    let createLoading = await this.loadingController.loading();
    (createLoading).present();

    this.apiService.post('/v1/dashboard/startworkorder', params).subscribe(res => {
      createLoading.dismiss();
      if (res['code'] == "200") {
        this.getSpecificWorkorder()
      }
    });
  }

  async completeWork() {

    let params = {
      filter: {
        _id: this.result[0]._id
      },
      flag: 'Completed',
      user_email: this.result[0].created_email,
      created_email: this.result[0].assignee_email,
      update: {
        status: "Completed"
      },
    }

    let createLoading = await this.loadingController.loading();
    (createLoading).present();

    this.apiService.post('/v1/dashboard/startworkorder', params).subscribe(res => {
      createLoading.dismiss();
      if (res['code'] == "200") {
        this.getSpecificWorkorder()
      }
    });

  }

  logout() {
    this.router.navigate(['/authentication/logout/true']);
  }

  seeFullImage(event) {
    this.photoViewer.show(event, this.result[0].problemType, { share: true });
  }
}
