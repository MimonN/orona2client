import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemUpsert } from 'src/app/interfaces/cart-item/cart-item-upsert.model';
import { Product } from 'src/app/interfaces/product/product.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CartService } from 'src/app/shared/services/cart.service';
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
  cartItem: CartItemUpsert;

  constructor(private route: ActivatedRoute, private productRepo: ProductRepositoryService,
    private cartRepo: CartService, private authService: AuthenticationService, private router: Router) {}

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
    if(this.authService.isUserAuthenticated()){
      this.cartItem = {
        productId: this.productDetails.id,
        count: this.form.value.quantity,
        username: this.authService.getUsername()
      };
      this.cartRepo.upsertCartItem(this.cartItem);
      console.log(this.cartItem);
    } else {
      this.router.navigate(['authentication/login']);
      console.log("???");
    }
    
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  };

}


