import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  providers: [LoadingComponent, AlertComponent]
})
export class CreateAccountComponent implements OnInit {

  employeeTypes = [
    {
      name: "Saloon For Women",
      value: "Saloon For Women"
    },
    {
      name: "Saloon For Men",
      value: "Saloon For Men"
    },
    {
      name: "Cleaning and Pest Control",
      value: "Cleaning and Pest Control"
    },
    {
      name: "Massage At Home",
      value: "Massage At Home"
    },
    {
      name: "AC Service and Reair",
      value: "AC Service and Reair"
    },
    {
      name: "Electrician",
      value: "Electrician"
    },
    {
      name: "Plumber",
      value: "Plumber"
    },
    {
      name: "Carpenters",
      value: "Carpenters"
    },
    {
      name: "Painting",
      value: "Painting"
    }
  ];
  accountForm: FormGroup;
  enableEmpType = false;

  constructor(private apiService: ApiService, private loadingCtrl: LoadingComponent,
    private router: Router, private alert: AlertComponent) { }

  ngOnInit() {
    this.accountForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required]),
      email: new FormControl(null),
      employeeType: new FormControl(null),
      address: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      registrationType: new FormControl(null),
      confirmPassword: new FormControl(null, [Validators.required])
    });
  }

  checkRegType(value) {
    if (value === "Employee") {
      this.enableEmpType = true;
      this.accountForm.controls['employeeType'].setValidators(Validators.required);
    } else {
      this.enableEmpType = false;
      this.accountForm.controls['employeeType'].clearValidators();
      this.accountForm.controls['employeeType'].setValue(null);
    }
  }

  async onSubmit() {

    /*** Enable loading here */
    let loading = await this.loadingCtrl.loading();
    loading.present();
    if (this.accountForm.value.password === this.accountForm.value.confirmPassword) {
      this.apiService.post('/v1/auth/createUser', this.accountForm.value).subscribe(async response => {
        if (response['code'] === 200) {
          /** Disable Loading */
          loading.dismiss();
          this.accountForm.reset();
          this.router.navigate(['/authentication/login']);
        } else {
          /** Disable Loading */
          this.alert.createAlert("Exist", response['message']);
          loading.dismiss();
        }
      });
    } else {
      loading.dismiss();
      this.alert.createAlert("Passwords Mismatch", "Both Passwords Must Be Same");
    }
  }

}
