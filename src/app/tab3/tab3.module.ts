import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { MoreInfoComponent } from './more-info/more-info.component';
import { EstimationComponent } from './estimation/estimation.component';
import { NotifcationComponent } from '../tabs/notifcation/notifcation.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: Tab3Page },
      { path: 'notification', component: NotifcationComponent }
    ])
  ],
  declarations: [Tab3Page, NotifcationComponent]
})
export class Tab3PageModule { }
