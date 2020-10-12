import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { ApiService } from 'src/app/shared/api.service';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [LoadingComponent, AlertComponent]
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  phoneNumber;

  constructor(private apiService: ApiService,
    private router: Router,
    private loadingCtrl: LoadingComponent, private alertCtrl: AlertComponent, private actRouter: ActivatedRoute) {
    this.resetForm = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.phoneNumber = this.actRouter.snapshot.params['phoneNumber'];
  }

  async onSubmit() {
    let loading = await this.loadingCtrl.loading();
    loading.present();
    if (this.resetForm.value.password === this.resetForm.value.confirmPassword) {
      this.apiService.post('/v1/auth/resetpassword', { phoneNumber: this.phoneNumber, password: this.resetForm.value.password }).subscribe(data => {
        loading.dismiss();
        this.alertCtrl.createAlert('Success!', 'Password has been resetted successfully!');
        this.router.navigate(['/authentication/login']);
      });
    } else {
      loading.dismiss();
      this.alertCtrl.createAlert('Alert!', 'Passwords are not equal');
    }
  }

}
