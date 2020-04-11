import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ChartsModule } from "ng2-charts";
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../shared/api.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    ChartsModule,
    HttpClientModule
  ],
  declarations: [Tab1Page],
  providers: [ApiService]
})
export class Tab1PageModule {}
