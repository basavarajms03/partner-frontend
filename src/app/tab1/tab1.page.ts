import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { ApiService } from '../shared/api.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ChartComponent, ApexFill } from 'ng-apexcharts';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [LoadingComponent]
})

export class Tab1Page implements OnInit {
  notification_count: any;
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  public chartOptions: Partial<{
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    fill: ApexFill;
  }>;

  constructor(private apiService: ApiService, private loading: LoadingComponent) { }
  result;

  async ngOnInit() {

    this.chartOptions = {
      series: [0, 0, 1],
      chart: {
        type: "donut",
        width: 300
      },
      labels: ["Assigned", "Pending", "Completed"],
      responsive: [
        {
          breakpoint: 3000,
          options: {
            legend: {
              position: "right"
            }
          }
        }
      ],
      fill: {
        colors: ['#F44336', '#E91E63', '#9C27B0']
      }
    };

    let params = { email: localStorage.getItem('email') };
    let loading = await this.loading.loading();
    loading.present();

    this.apiService.post("/v1/dashboard/get-raise-request", params).subscribe(async res => {
      loading.dismiss();
      this.result = res['data'];
    });

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

  gotoNext($event) {
    console.log("Event Target Information", $event);
  }
}
