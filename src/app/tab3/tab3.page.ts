import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [LoadingComponent]
})
export class Tab3Page implements OnInit {
  notification_count: any;
  admin;

  constructor(private apiService: ApiService, private loading: LoadingComponent, private actRouter: ActivatedRoute,
    private router: Router) { }
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
        filter: {}
      };
    } else {
      params = {
        filter: {
          acknowledge_email: localStorage.getItem('email')
        }
      };
    }

    let parameters = this.actRouter.snapshot.params;
    if (parameters.event) {
      params.filter.status = parameters.event;
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

  logout() {
    this.router.navigate(['/authentication/logout/true']);
  }

}
