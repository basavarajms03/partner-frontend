import { AlertComponent } from './../../shared/alert/alert.component';
import { LoadingComponent } from './../../shared/loading/loading.component';
import { ApiService } from './../../shared/api.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
  providers: [LoadingComponent, AlertComponent]
})
export class VerifyOTPComponent implements OnInit {
  verifyOTPForm: FormGroup;
  verificationId: any;
  userNumber: any;

  constructor(private actRoute: ActivatedRoute, private apiService: ApiService, private loading: LoadingComponent,
    private alertCtrl: AlertComponent, private router: Router) {
    this.verifyOTPForm = new FormGroup({
      otp: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit() {
    this.userNumber = this.actRoute.snapshot.params.mobileNumber;
    this.sendOTP();
  }

  async sendOTP() {
    /*** send the otp to user number */
    let verifier = new firebase.auth.RecaptchaVerifier('recaptch-container', { size: 'invisible' });
    let params = { phoneNumber: this.userNumber.substr(3), "registrationType": "Worker" };

    let loading = await this.loading.loading();
    loading.present();

    this.apiService.post('/v1/auth/profile', params).subscribe(profileData => {
      loading.dismiss();
      if (profileData['data'].userVerified) {
        this.alertCtrl.createAlert('Warning!', "Your account already verified, please login!");
        this.router.navigate(['/authentication/login']);
      } else {
        firebase.auth().signInWithPhoneNumber(this.userNumber, verifier).then(data => {
          this.verificationId = data.verificationId
        }).catch(error => {
          console.log(error)
        });
      }
    });
  }

  async verifyOTP() {
    let loading = await this.loading.loading();
    loading.present();

    let otp = this.verifyOTPForm.value.otp.toString();
    let otpParameters = {
      phoneNumber: this.userNumber.substr(3),
      "registrationType": "Worker"
    }
    let credentials = firebase.auth.PhoneAuthProvider.credential(this.verificationId, otp);
    firebase.auth().signInWithCredential(credentials).then(successResponse => {
      if (successResponse) {
        this.apiService.post('/v1/auth/verifyotp', otpParameters).subscribe(data => {
          loading.dismiss();
          this.router.navigate(['/authentication/login']);
        });
      }
    }).catch(error => {
      if (error.code === 400) {
        this.alertCtrl.createAlert('Error', 'OTP is not valid, Please enter valid OTP.');
        loading.dismiss();
      }
    });
  }

}
