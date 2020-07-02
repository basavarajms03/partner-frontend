import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertComponent } from '../shared/alert/alert.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [AlertComponent, LoadingComponent]
})
export class Tab2Page implements OnInit {

  category = "personal";
  changePassword: FormGroup;
  profileData: any;
  notification_count: any;

  constructor(private alert: AlertComponent, private loading: LoadingComponent, private apiService: ApiService,
    private router: Router) { }

  async ngOnInit() {
    this.changePassword = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confPassword: new FormControl(null, [Validators.required])
    });

    this.changePassword.addControl('email', new FormControl(localStorage.getItem('email')));
    let params = { email: localStorage.getItem('email') };

    let loading = await this.loading.loading();
    loading.present();

    this.apiService.post('/v1/auth/profile', params).subscribe(profileData => {
      loading.dismiss();
      this.profileData = profileData['data'];
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

  segmentChange(event) {
    this.category = event.detail.value;
  }

  async onSubmit() {
    let loading = await this.loading.loading();
    loading.present();

    if (this.changePassword.value.password !== this.changePassword.value.confPassword) {
      loading.dismiss();
      this.alert.createAlert("Error", "Both Passwords Must Be Same");
    } else {
      this.apiService.post("/v1/auth/changePassword", this.changePassword.value).subscribe(res => {
        loading.dismiss()
        if (res['code'] === 200) {
          this.changePassword.reset();
          this.alert.createAlert('Success', res['message']);
        } else {
          this.changePassword.reset();
          this.alert.createAlert('Error', res['message']);
        }
      });
    }
  }

  logout() {
    this.router.navigate(['/authentication/logout/true']);
  }
}
