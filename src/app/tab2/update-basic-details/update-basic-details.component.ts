import { AlertComponent } from './../../shared/alert/alert.component';
import { LoadingComponent } from './../../shared/loading/loading.component';
import { ApiService } from './../../shared/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-basic-details',
  templateUrl: './update-basic-details.component.html',
  styleUrls: ['./update-basic-details.component.scss'],
  providers: [LoadingComponent, AlertComponent]
})
export class UpdateBasicDetailsComponent implements OnInit {
  basicupdationform: FormGroup;
  basicDetails = {};
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
  constructor(private apiService: ApiService, private router: Router,
    private alertCtrl: AlertComponent, private loadingtrl: LoadingComponent) {
    this.basicupdationform = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required]),
      email: new FormControl(null),
      employeeType: new FormControl(null, [Validators.required]),
      adharCard: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.loadBasicDetails();
  }

  async loadBasicDetails() {
    let loading = await this.loadingtrl.loading();
    loading.present();
    let params = { phoneNumber: localStorage.getItem('phoneNumber'), "registrationType": "Worker" };
    this.apiService.post('/v1/auth/profile', params).subscribe(response => {
      if (response['data']) {
        loading.dismiss();
        this.basicupdationform.patchValue(response['data']);
      } else {
        loading.dismiss();
        this.alertCtrl.createAlert('Warning', 'Please try again letter!')
      }
    });
  }

  async onSubmit() {
    let loadingCtrl = await this.loadingtrl.loading();
    loadingCtrl.present();

    let params = {
      filter: { phoneNumber: localStorage.getItem('phoneNumber') },
      update: this.basicupdationform.value
    }

    this.apiService.post('/v1/dashboard/updateuser', params).subscribe(response => {
      if (response['code'] == 200) {
        loadingCtrl.dismiss();
        localStorage.setItem('phoneNumber', this.basicupdationform.value.phoneNumber);
        this.alertCtrl.createAlert('Success', 'User basic details updated successfully');
        this.router.navigate(['tabs/profile']);
      } else {
        loadingCtrl.dismiss();
        this.alertCtrl.createAlert('Error!', 'Something went wrong! Please try again');
        this.router.navigate(['tabs/profile']);
      }
    });
  }

}
