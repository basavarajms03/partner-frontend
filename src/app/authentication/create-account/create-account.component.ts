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
      name: "Water Supply",
      value: "Water Supply"
    },
    {
      name: "Mehandi",
      value: "Mehandi"
    },
    {
      name: "Car Or Bike Rapair",
      value: "Car Or Bike Repair"
    },
    {
      name: "Welder",
      value: "Welder"
    },
    {
      name: "Computer Service",
      value: "Computer Service"
    },
    {
      name: "Bore Well Service (Underground)",
      value: "Bore Well Service (Underground)"
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
    },
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
      employeeType: new FormControl(null, [Validators.required]),
      adharCard: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required])
    });
  }

  async onSubmit() {

    /*** Enable loading here */
    let loading = await this.loadingCtrl.loading();
    loading.present();
    if (this.accountForm.value.password === this.accountForm.value.confirmPassword) {
      let formValues = this.accountForm.value;
      formValues.registrationType = 'Worker';
      console.log("FormValues Information", formValues);
      this.apiService.post('/v1/auth/createUser', formValues).subscribe(async response => {
        if (response['code'] === 200) {
          /** Disable Loading */
          loading.dismiss();
          this.router.navigate(['/authentication/verify-otp', { mobileNumber: `+91${this.accountForm.value.phoneNumber}` }]);
          this.accountForm.reset();
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
