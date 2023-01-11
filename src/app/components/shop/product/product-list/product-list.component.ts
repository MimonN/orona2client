import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product/product.model';
import { ProductRepositoryService } from 'src/app/shared/services/product-repository.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  productList: Product[];

  constructor(private productRepo: ProductRepositoryService) {}

  ngOnInit() {
    this.productRepo.getAllProducts()
    .subscribe({
      next: (response) => {
        this.productList = response;
      }});
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  };
}
