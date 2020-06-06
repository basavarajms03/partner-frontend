import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { MoreInfoComponent } from './more-info/more-info.component';
import { EstimationComponent } from './estimation/estimation.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: Tab3Page },
      { path: 'more-info', component: MoreInfoComponent },
      { path: 'estimate', component: EstimationComponent }
    ])
  ],
  declarations: [Tab3Page, MoreInfoComponent, EstimationComponent]
})
export class Tab3PageModule { }
