import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { ApiService } from 'src/app/shared/api.service';
import { workorderModel } from 'src/app/tab1/workorder.model';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
  providers: [LoadingComponent]
})
export class MoreInfoComponent implements OnInit {

  result: workorderModel[] = [];
  created_time;
  notification_count = 0;
  assignwork = false;

  constructor(private actRouter: ActivatedRoute, private router: Router, private loadingController: LoadingComponent, private apiService: ApiService) { }

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

  logout() {
    this.router.navigate(['/authentication/logout/true']);
  }

}
