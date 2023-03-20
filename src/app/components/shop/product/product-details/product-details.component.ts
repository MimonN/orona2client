import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartItemUpsert } from 'src/app/interfaces/cart-item/cart-item-upsert.model';
import { Product } from 'src/app/interfaces/product/product.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductRepositoryService } from 'src/app/shared/services/product-repository.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  productDetails: Product;
  count: number = 1;
  cartItem: CartItemUpsert;

  constructor(private route: ActivatedRoute, private productRepo: ProductRepositoryService,
    private cartRepo: CartService, private authService: AuthenticationService, private router: Router,
    private toastr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = parseInt(params.get('id'));

        if (this.id) {
          this.productRepo.getProductById(this.id).subscribe({
            next: (response) => {
              this.productDetails = response;
              this.spinner.hide();
            },
          });
        }
      },
    });
  }

  addOne() {
    this.count += 1;
  }

  minusOne() {
    if(this.count === 1) {
      this.count = 1;
    } else {
      this.count -=1;
    }
  }

  addToCart() {
    if(this.authService.isUserAuthenticated()){
      this.cartItem = {
        productId: this.productDetails.id,
        count: this.count,
        username: this.authService.getUsername()
      };
      this.cartRepo.upsertCartItem(this.cartItem);
      this.toastr.success("Item added to your cart");
      this.count = 1;
    } else {
      this.router.navigate(['authentication/login']);
    }
    
  }

  public createImgPath = (serverPath: string) => {
    return `${environment.baseApiUrl}/${serverPath}`;
  };

}


