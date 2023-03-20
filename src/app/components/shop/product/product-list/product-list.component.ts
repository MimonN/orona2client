import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/interfaces/product/product.model';
import { ProductRepositoryService } from 'src/app/shared/services/product-repository.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  productList: Product[];
  baseApiUrl = environment.baseApiUrl;

  constructor(private productRepo: ProductRepositoryService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    
    this.productRepo.getAllProducts()
    .subscribe({
      next: (response) => {
        this.productList = response;
        this.spinner.hide();
      }});
  }

  public createImgPath = (serverPath: string) => {
    return `${environment.baseApiUrl}/${serverPath}`;
  };
}
