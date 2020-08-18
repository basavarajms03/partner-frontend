import { Component, OnInit } from "@angular/core";
import { ApiService } from "../shared/api.service";
import { LoadingComponent } from "../shared/loading/loading.component";
import { Router } from "@angular/router";
import { workorderModel } from "./workorder.model";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
  providers: [LoadingComponent],
})
export class Tab1Page implements OnInit {
  notification_count: Number = 0;
  admin = false;
  result: workorderModel[] = [];
  status: String = "new";
  segment = "requests";
  constructor(
    private apiService: ApiService,
    private loading: LoadingComponent,
    private router: Router
  ) {}

  ionViewWillEnter() {
    let statuses = {
      requests: { filter: { status: "New", startWork: false } },
      pending: {
        filter: {
          status: { $nin: ["New", "Completed"] },
          assignee_email: localStorage.getItem("email"),
        },
      },
      completed: {
        filter: {
          status: "Completed",
          assignee_email: localStorage.getItem("email"),
        },
      },
    };
    let params = statuses[this.segment];
    this.checkWorkorders(params);
  }

  async ngOnInit() {}

  async checkWorkorders(event) {
    let loading = await this.loading.loading();

    loading.present();
    this.apiService
      .post("/v1/dashboard/get-raise-request", event)
      .subscribe(async (res) => {
        loading.dismiss();
        this.result = res["data"];
      });
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
    let params = {};
    if (this.segment === "requests") {
      params["filter"] = {
        status: "New",
        startWork: false,
      };
    }
    if (this.segment === "pending") {
      params["filter"] = {
        status: {
          $nin: ["New", "Completed"],
        },
        assignee_email: localStorage.getItem("email"),
      };
    }
    if (this.segment === "completed") {
      params["filter"] = {
        status: "Completed",
        assignee_email: localStorage.getItem("email"),
      };
    }
    this.checkWorkorders(params);
  }

  logout() {
    this.router.navigate(["/authentication/logout/true"]);
  }
}
