import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ChartsModule } from "ng2-charts";
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../shared/api.service';
import { NgApexchartsModule } from "ng-apexcharts";
import { MoreInfoComponent } from '../tab3/more-info/more-info.component';
import { EstimationComponent } from '../tab3/estimation/estimation.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page },
    { path: 'more-info/:id', component: MoreInfoComponent },
    { path: 'estimate', component: EstimationComponent }]),
    ChartsModule,
    HttpClientModule,
    NgApexchartsModule
  ],
  declarations: [Tab1Page, MoreInfoComponent, EstimationComponent],
  providers: [ApiService]
})
export class Tab1PageModule { }
