import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstimateRoutingModule } from './estimate-routing.module';
import { EstimateListComponent } from './estimate-list/estimate-list.component';
import { EstimateDetailsComponent } from './estimate-details/estimate-details.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EstimateListComponent,
    EstimateDetailsComponent
  ],
  imports: [
    CommonModule,
    EstimateRoutingModule,
    ReactiveFormsModule
  ]
})
export class EstimateModule { }
