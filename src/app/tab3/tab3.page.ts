import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [LoadingComponent]
})
export class Tab3Page implements OnInit {

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

}
