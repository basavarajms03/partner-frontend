import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.scss'],
  providers: [LoadingComponent]
})
export class EstimationComponent implements OnInit {

  params;
  estimationForm: FormGroup;
  itemInfo;
  edit = false;
  editId_info;
  total = 0;
  estimation_id;
  notification_count;
  admin = false;
  startWork = false;
  resultInfo;

  constructor(private actRouter: ActivatedRoute, private apiService:
    ApiService, private loading: LoadingComponent, private createAlert: AlertController,
    private router: Router) {
  }


  ionViewWillEnter() {
    this.ngOnInit();
  }

  async ngOnInit() {

    this.params = this.actRouter.snapshot.params;

    this.estimationForm = new FormGroup({
      itemName: new FormControl(null, [Validators.required, Validators.min(3), Validators.max(50)]),
      price: new FormControl(null, [Validators.required])
    });

    let createLoading = await this.loading.loading();
    (createLoading).present();

    let parmInfo;
    parmInfo = {
      email: localStorage.getItem('email'),
      product_id: this.params._id
    };

    this.apiService.post('/v1/dashboard/get-estimation', parmInfo).subscribe(res => {
      createLoading.dismiss();
      this.itemInfo = res['data'][0];
      this.resultInfo = res['data'];
      if (this.itemInfo) {
        this.total = this.itemInfo.items.reduce((sum, prop) => +sum + +prop.price, 0);
      }
    });

    //To get the notifications information
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

  async onSubmit() {

    if (!this.edit) {
      let createLoading = await this.loading.loading();
      createLoading.present();

      let parmaInfo = {
        email: localStorage.getItem('email'),
        product_id: this.params._id,
        total: this.total + this.estimationForm.value.price,
        items: [{
          itemName: this.estimationForm.value.itemName,
          price: this.estimationForm.value.price
        }]
      };

      this.apiService.post('/v1/dashboard/add-estimation', parmaInfo).subscribe(res => {
        createLoading.dismiss();
        if (res['code'] == "200") {
          this.estimation_id = res['data']._id;
          this.estimationForm.reset();
          this.ngOnInit();
        }
      });
    } //Edition Will Be Start From Below
    else {
      let createLoading = await this.loading.loading();
      createLoading.present();

      let parmaInfo = {
        "email": localStorage.getItem('email'),
        "_id": this.editId_info,
        "product_id": this.params._id,
        "update": {
          "items.$.itemName": this.estimationForm.value.itemName,
          "items.$.price": this.estimationForm.value.price
        }
      };

      this.apiService.post('/v1/dashboard/update-estimation', parmaInfo).subscribe(res => {
        createLoading.dismiss();

        this.estimation_id = res['data']._id;
        console.log("estimation_id", this.estimation_id);

        this.edit = false;
        this.editId_info = "";

        if (res['code'] == "200") {
          this.estimationForm.reset();
          this.ngOnInit();
        }
      });
    }

  }

  itemEdit(itemName, price, _id) {
    this.edit = true;
    this.editId_info = _id;
    let formData = {
      itemName: itemName,
      price: price
    }
    this.estimationForm.setValue(formData);
  }

  editCancel() {
    this.editId_info = "";
    this.edit = false;
    this.estimationForm.reset();
  }

  async deleteItem(_id) {

    let createLoading = await this.loading.loading();
    createLoading.present();

    let parmaInfo = {
      "email": localStorage.getItem('email'),
      "_id": _id,
      "product_id": this.params._id,
    };

    this.apiService.post('/v1/dashboard/delete-estimation', parmaInfo).subscribe(res => {
      createLoading.dismiss();
      if (res['code'] == "200") {
        this.estimationForm.reset();
        this.ngOnInit();
      }
    });
  }

  async finalSubmission() {
    let createLoading = await this.loading.loading();
    createLoading.present();

    let parmaInfo = {
      filter: {
        "email": localStorage.getItem('email'),
        "product_id": this.params._id
      },
      estimation_id: this.estimation_id,
      flag: "final_est",
      created_email: this.params.created_email,
      update: {
        finalSubmission: true
      }
    };

    this.apiService.post('/v1/dashboard/updateOne', parmaInfo).subscribe(res => {
      createLoading.dismiss();
      if (res['code'] == "200") {
        this.estimationForm.reset();
        this.ngOnInit();
      }
    });
  }

  async promptAlert() {
    let createAlert = this.createAlert.create({
      header: "Alert!",
      subHeader: "Once you click on submit estimation, You are not able to change the estimation",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Confirm",
          handler: () => this.finalSubmission()
        }
      ]
    });
    (await createAlert).present();
  }

  async startworkorder() {

    let parms = {
      filter: {
        assignee_email: this.itemInfo.email,
        _id: this.itemInfo.product_id
      },
      created_email: this.itemInfo.email,
      estimation_id: this.itemInfo._id,
      update: {
        startWork: true,
        status: "Start Work"
      }
    }

    let createLoading = await this.loading.loading();
    (createLoading).present();

    this.apiService.post('/v1/dashboard/startworkorder', parms).subscribe(res => {
      createLoading.dismiss();
      if (res['code'] == "200") {
        this.router.navigate(['/tabs/dashboard']);
      }
    });

  }

  logout() {
    this.router.navigate(['/authentication/logout/true']);
  }

}
