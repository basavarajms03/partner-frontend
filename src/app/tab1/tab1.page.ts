import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { ApiService } from '../shared/api.service';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [LoadingComponent]
})
export class Tab1Page implements OnInit {

  constructor(private apiService: ApiService, private loading: LoadingComponent) { }
  result;

  async ngOnInit() {

    let params = { email: localStorage.getItem('email') };
    let loading = await this.loading.loading();
    loading.present();

    this.apiService.post("/v1/dashboard/get-raise-request", params).subscribe(async res => {
      loading.dismiss();
      this.result = res['data'];
    });

  }

  gotoNext($event) {
    console.log("Event Target Information", $event);
  }
}
