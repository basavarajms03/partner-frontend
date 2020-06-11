import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  result: any;

  constructor(private apiService: ApiService) {
    let params;

    if (!this.apiService.admin) {
      params = {
        filter: {
          assignee_email: localStorage.getItem('email'),
          status: "Active"
        }
      };
    } else {
      params = {
        filter: {
          acknowledge_email: localStorage.getItem('email'),
          status: "New"
        }
      };
    }

    this.apiService.post("/v1/dashboard/get-raise-request", params).subscribe(async res => {
      this.result = res['data'].length;
    });
  }

}
