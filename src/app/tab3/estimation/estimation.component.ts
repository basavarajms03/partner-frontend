import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.scss'],
})
export class EstimationComponent implements OnInit {

  params;

  constructor(private actRouter: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.actRouter.snapshot.queryParams;
  }

}
