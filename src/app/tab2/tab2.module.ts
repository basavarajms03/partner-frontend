import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../shared/api.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [Tab2Page],
  providers: [ApiService]
})
export class Tab2PageModule {}
