import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild("barCanvas", { static: true }) barCanvas: ElementRef;

  barChart: Chart;

  difference = new Date().getTime() - new Date(2020, 2, 28, 21, 25, 0, 0).getTime();

  Difference_In_Days = this.difference / (1000 * 3600 * 24);
  dateInfo;

  constructor() { }

  ngOnInit() {

    if (this.Difference_In_Days >= 7 && this.Difference_In_Days < 31) {
      this.dateInfo = this.difference / (1000 * 3600 * 24 * 7);
      this.dateInfo = Math.floor(this.dateInfo) + ' Weeks ago';
    } else if (this.Difference_In_Days >= 31 && this.Difference_In_Days < 365) {
      let daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      this.dateInfo = this.Difference_In_Days / daysInMonth;
      this.dateInfo = Math.floor(this.dateInfo) + ' Months ago';
    } else if (this.Difference_In_Days >= 365) {
      this.dateInfo = this.Difference_In_Days / 365;
      this.dateInfo = Math.floor(this.dateInfo) + ' Years ago';
    } else if (this.Difference_In_Days >= 0 && this.Difference_In_Days < 1) {
      this.dateInfo = this.difference / (1000 * 3600);
      this.dateInfo = Math.floor(this.dateInfo) + ' Hours Ago'
    } else {
      this.dateInfo = Math.floor(this.Difference_In_Days) + ' Days Ago';
    }


    console.log(this.Difference_In_Days);

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Requests",
            data: [10, 3, 5, 2, 3, 1, 10, 3, 5, 2, 3, 1],
            backgroundColor: [
              "rgba(255, 99, 132)",
              "rgba(54, 162, 235)",
              "rgba(255, 206, 86)",
              "rgba(75, 192, 192)",
              "rgba(153, 102, 255)",
              "rgba(255, 159, 64)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1,
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontFamily: "verdana",
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontFamily: "verdana",
              }
            }
          ]
        }
      }
    });
  }
}
