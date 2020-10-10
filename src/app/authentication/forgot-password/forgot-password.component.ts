import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { ApiService } from 'src/app/shared/api.service';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [LoadingComponent, AlertComponent]
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  verifyOTPForm: FormGroup;
  verifier;
  verificationId;
  showVerifyForm = false;
  constructor(private fb: FormBuilder, private loadingCtrl: LoadingComponent, private alertCtrl: AlertComponent, private apiService: ApiService) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: [null, [Validators.required]]
    });
    this.verifyOTPForm = this.fb.group({
      otp: [null, [Validators.required]]
    });

    this.verifier = new firebase.auth.RecaptchaVerifier('recaptch-container', { size: 'invisible' });
  }

  async sendOTP() {
    let loading = await this.loadingCtrl.loading();
    loading.present();
    let params = { phoneNumber: this.forgotForm.value.email }
    this.apiService.post('/v1/auth/profile', params).subscribe(response => {
      if (response['data']) {
        this.showVerifyForm = true;
        loading.dismiss();
        this.forgotForm.controls['email'].disable();
        firebase.auth().signInWithPhoneNumber(`+91${this.forgotForm.value.email}`, this.verifier).then(data => {
          this.verificationId = data.verificationId;
        }).catch(error => {
          console.log("Error", error);
        });
      } else {
        loading.dismiss();
        this.alertCtrl.createAlert('Not valid!', 'Entered phone number is not valid please enter correctly!');
      }
    });
  }

  async verifyOTP() {
    let loading = await this.loadingCtrl.loading();
    loading.present();
    let otp = this.verifyOTPForm.value.otp.toString();
    let credentials = firebase.auth.PhoneAuthProvider.credential(this.verificationId, otp);
    console.log("OTP information", this.verificationId, otp);
    firebase.auth().signInWithCredential(credentials).then(successResponse => {
      if (successResponse) {
        loading.dismiss();
        this.alertCtrl.createAlert('Success!', 'Mobile number is verified!');
      }
    }).catch(error => {
      loading.dismiss();
      this.alertCtrl.createAlert('Invalid!', 'Invalid OTP');
    });
  }

}
