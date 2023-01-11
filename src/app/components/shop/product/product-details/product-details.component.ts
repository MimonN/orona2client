import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product/product.model';
import { ProductRepositoryService } from 'src/app/shared/services/product-repository.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  id: number;
  productDetails: Product;
  @ViewChild('quantityForm') form: NgForm;

  constructor(private route: ActivatedRoute, private productRepo: ProductRepositoryService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = parseInt(params.get('id'));

        if (this.id) {
          this.productRepo.getProductById(this.id).subscribe({
            next: (response) => {
              this.productDetails = response;
            },
          });
        }
      },
    });
  }

  onSubmit() {
    
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  };

}


