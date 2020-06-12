import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { ApiService } from '../shared/api.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ChartComponent, ApexLegend, ApexPlotOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [LoadingComponent]
})

export class Tab1Page implements OnInit {
  notification_count: any;
  @ViewChild("chart", { static: false }) chart: ChartComponent;
  admin = false;
  public chartOptions: Partial<{
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    legend: ApexLegend;
    plotOptions: ApexPlotOptions;
  }>;

  constructor(private apiService: ApiService, private loading: LoadingComponent) { }
  result;

  async ngOnInit() {

    if (localStorage.getItem('admin') === "true") {
      this.admin = true;
    } else {
      this.admin = false;
    }

    this.chartOptions = {
      series: [0, 0, 1],
      chart: {
        type: "donut",
        width: 270
      },
      labels: ["Pending", "Assigned", "Completed", "Rejected"],
      responsive: [
        {
          breakpoint: 3000,
          options: {
            legend: {
              position: "right",
            }
          }
        }
      ],
      legend: {
        horizontalAlign: 'center',
        onItemClick: {
          toggleDataSeries: false
        },
        onItemHover: {
          highlightDataSeries: false
        }
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              total: {
                formatter: (w) => {
                  return w.w.globals.series[w.seriesIndex]
                }
              }
            }
          }
        }
      }
    };

    let params;
    if (!this.admin) {
      params = {
        filter: {
          assignee_email: localStorage.getItem('email')
        },
        limit: 2,
        skip: 0
      };
    } else {
      params = {
        filter: {
          acknowledge_email: localStorage.getItem('email')
        },
        limit: 2,
        skip: 0
      };
    }
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
