import { Component, OnInit } from "@angular/core";
import { ApiService } from "../shared/api.service";
import { LoadingComponent } from "../shared/loading/loading.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
  providers: [LoadingComponent],
})
export class Tab3Page implements OnInit {
  notification_count: Number = 0;
  paymentData;

  constructor(
    private apiService: ApiService,
    private loading: LoadingComponent,
    private actRouter: ActivatedRoute,
    private router: Router
  ) {}

  async ionViewWillEnter() {
    let loading = await this.loading.loading();

    loading.present();

    let paymentInfo = {
      assignee_email: localStorage.getItem("email"),
    };

    this.apiService
      .post("/v1/dashboard/getPaymentInformation", paymentInfo)
      .subscribe((res) => {
        loading.dismiss();
        this.paymentData = res["data"];
      });
  }

  async ngOnInit() {}

  logout() {
    this.router.navigate(["/authentication/logout/true"]);
  }
}
