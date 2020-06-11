import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { ApiService } from 'src/app/shared/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  admin = false;
  assignwork = false;
  assignForm: FormGroup;

  constructor(private actRouter: ActivatedRoute, private loadingController: LoadingComponent, private apiService: ApiService) { }

  async ngOnInit() {

    this.admin = this.apiService.admin;

    let loading = await this.loadingController.loading();
    loading.present();
    this.options = this.actRouter.snapshot.paramMap.get('id');
    let params = {
      filter: { _id: this.options },
      sort: { updatedAt: -1 }
    };

    this.apiService.post("/v1/dashboard/get-raise-request", params).subscribe(async res => {
      loading.dismiss();
      this.result = res['data'][0];
      this.created_time = new Date(res['data'][0].createdAt);
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

  assignworkinfo() {
    this.assignwork = true;
    this.assignForm = new FormGroup({
      assignee_email: new FormControl(null, [Validators.required])
    });
  }

  cancelWork() {
    this.assignwork = false;
    this.ngOnInit();
  }

  async assignSubmit() {
    let loading = this.loadingController.loading();
    (await loading).present();
    let params = {
      filter: {
        _id: this.actRouter.snapshot.params.id
      },
      update: {
        status: "Active",
        assignee_email: this.assignForm.value.assignee_email
      }
    };

    this.apiService.post('/v1/dashboard/updateworkorder', params).subscribe(async resInfo => {
      await (await loading).dismiss();
      this.assignForm.reset();
      this.assignwork = false;
      this.ngOnInit();
    });
  }

  async rejectWork() {
    let loading = this.loadingController.loading();
    (await loading).present();
    let params = {
      filter: {
        _id: this.actRouter.snapshot.params.id,
        created_email: this.result.created_email
      },
      update: {
        status: "Rejected"
      }
    };

    this.apiService.post('/v1/dashboard/updateworkorder', params).subscribe(async resInfo => {
      await (await loading).dismiss();
      this.ngOnInit();
    });
  }

}
