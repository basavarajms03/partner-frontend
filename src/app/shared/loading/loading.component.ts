import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  constructor(private loadingController: LoadingController) { }

  ngOnInit() {}

  async loading() {

    let loading = await this.loadingController.create({
      message: "Please Wait...",
      showBackdrop: true,
      spinner: "lines-small"
    });

    return loading;

  }

}
