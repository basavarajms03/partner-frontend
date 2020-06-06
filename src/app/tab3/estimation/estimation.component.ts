import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';

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

  constructor(private actRouter: ActivatedRoute, private apiService:
    ApiService, private loading: LoadingComponent) {
  }

  async ngOnInit() {

    this.params = this.actRouter.snapshot.paramMap.get('_id');

    this.estimationForm = new FormGroup({
      itemName: new FormControl(null, [Validators.required, Validators.min(3), Validators.max(50)]),
      price: new FormControl(null, [Validators.required])
    });

    let createLoading = await this.loading.loading();
    (createLoading).present();

    let parmInfo = {
      email: localStorage.getItem('email'),
      product_id: this.params
    };

    this.apiService.post('/v1/dashboard/get-estimation', parmInfo).subscribe(res => {
      createLoading.dismiss();
      this.itemInfo = res['data'][0];
    });
  }

  async onSubmit() {

    if (!this.edit) {
      let createLoading = await this.loading.loading();
      createLoading.present();

      let parmaInfo = {
        email: localStorage.getItem('email'),
        product_id: this.params,
        items: [{
          itemName: this.estimationForm.value.itemName,
          price: this.estimationForm.value.price
        }]
      };

      this.apiService.post('/v1/dashboard/add-estimation', parmaInfo).subscribe(res => {
        createLoading.dismiss();
        if (res['code'] == "200") {
          this.estimationForm.reset();
          this.ngOnInit();
        }
      });
    } //Edition Will Be Start From Below
    else {
      let createLoading = await this.loading.loading();
      createLoading.present();

      this.edit = false;
      this.editId_info = "";

      let parmaInfo = {
        "email": localStorage.getItem('email'),
        "_id": this.editId_info,
        "product_id": this.params,
        "update": {
          "items.$.itemName": this.estimationForm.value.itemName,
          "items.$.price": this.estimationForm.value.price
        }
      };

      this.apiService.post('/v1/dashboard/update-estimation', parmaInfo).subscribe(res => {
        createLoading.dismiss();
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
      "product_id": this.params,
    };

    this.apiService.post('/v1/dashboard/delete-estimation', parmaInfo).subscribe(res => {
      createLoading.dismiss();
      if (res['code'] == "200") {
        this.estimationForm.reset();
        this.ngOnInit();
      }
    });
  }

}
