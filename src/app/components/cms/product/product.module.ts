import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { FormsModule } from '@angular/forms';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { CommonModule } from '@angular/common';
import { ProductUpdateComponent } from './product-update/product-update.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule
  ]
})
export class ProductModule { }
