import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoadingComponent, AlertComponent]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private apiService: ApiService, private alert: AlertComponent,
    private loadingCtrl: LoadingComponent, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  async onSubmit() {

    let loading = await this.loadingCtrl.loading();
    loading.present();

    this.apiService.post('/v1/auth/login', this.form.value).subscribe(response => {
      if (response['code'] === 200) {

        localStorage.setItem('Token', response['token']);
        localStorage.setItem('name', response['data'].name);
        localStorage.setItem('email', response['data'].email);
        localStorage.setItem('phoneNumber', response['data'].phoneNumber);

        if (response['data'].email === "naduvinamanimanjunath@gmail.com") {
          localStorage.setItem('admin', "true");
        }

        loading.dismiss();
        this.form.reset();
        this.router.navigate(['/tabs']);
      }
    }, (error) => {
      if (error['status'] === 401) {
        loading.dismiss();
        this.form.reset();
        this.alert.createAlert('User', "User Does Not Exist! Please Register and Try Again");
      }
    });
  }
}
