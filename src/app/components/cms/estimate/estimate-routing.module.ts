import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimateDetailsComponent } from './estimate-details/estimate-details.component';
import { EstimateListComponent } from './estimate-list/estimate-list.component';

const routes: Routes = [
  {path: 'list', component: EstimateListComponent},
  {path: 'details/:id', component: EstimateDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstimateRoutingModule { }
