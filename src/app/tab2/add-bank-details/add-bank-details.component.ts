import { LoadingComponent } from './../../shared/loading/loading.component';
import { AlertComponent } from './../../shared/alert/alert.component';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bank-details',
  templateUrl: './add-bank-details.component.html',
  styleUrls: ['./add-bank-details.component.scss'],
  providers: [AlertComponent, LoadingComponent]
})
export class AddBankDetailsComponent implements OnInit {

  bankForm: FormGroup;

  constructor(private apiService: ApiService, private alertCtrl: AlertComponent, private router: Router, private loadingCtrl: LoadingComponent) {
    this.bankForm = new FormGroup({
      bankName: new FormControl(null, [Validators.required]),
      nameasperbank: new FormControl(null, [Validators.required]),
      accountNo: new FormControl(null, [Validators.required]),
      ifscCode: new FormControl(null, [Validators.required])
    });
  }

  async ngOnInit() {
    let params = { phoneNumber: localStorage.getItem('phoneNumber') };
    let loading = await this.loadingCtrl.loading();
    loading.present();
    this.apiService.post('/v1/dashboard/getbankdetails', params).subscribe(response => {
      if (response['data'].bankDetails) {
        loading.dismiss();
        this.bankForm.patchValue(response['data'].bankDetails)
      }
    });
  }

  async onSubmit() {
    let updateParams = this.bankForm.value;
    updateParams['phoneNumber'] = localStorage.getItem('phoneNumber');
    let loading = await this.loadingCtrl.loading();
    loading.present();
    this.apiService.post('/v1/dashboard/addbankdetails', updateParams).subscribe(response => {
      if (response['code'] == 200) {
        loading.dismiss();
        this.alertCtrl.createAlert('Success', 'Bank details updated successfully');
        this.router.navigate(['tabs/profile']);
      } else {
        loading.dismiss();
        this.alertCtrl.createAlert('Error!', 'Something went wrong! Please try again');
        this.router.navigate(['tabs/profile']);
      }
    });
  }

}
