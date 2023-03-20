import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/interfaces/cart-item/cart-item.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  username: string;
  cartItemsList: CartItem[] = [];
  itemsPrice: number = 0;
  tax: number = 0;
  orderTotal: number = 0;

  constructor(private authService: AuthenticationService, private cartRepo: CartService, private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.cartRepo.getCartItemsByUsername(this.username)
    .subscribe({
      next: (resp) => {
        this.cartItemsList = resp;
        this.total();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addOne(id: number) {
    let item = this.cartItemsList.find(x => x.id === id);
    item.count += 1;
    this.itemsPrice += item.product.price;
    this.taxCalculator(this.itemsPrice);
    this.orderTotalCalculator(this.itemsPrice, this.tax);
  }

  minusOne(id: number) {
    let item = this.cartItemsList.find(x => x.id === id);
    if(item.count === 1){
      this.remove(id);
    } else {
      item.count -= 1;
      this.itemsPrice -= item.product.price;
      this.taxCalculator(this.itemsPrice);
      this.orderTotalCalculator(this.itemsPrice, this.tax);
    }
  }

  remove(id: number) {
    this.cartRepo.deleteCartItem(id)
    .subscribe({
      next: () => {
        this.resetPage();
        this.toastr.success("Item removed from you cart");
      }
    })
  }

  saveAll() {
    this.cartRepo.updateCartItems(this.cartItemsList)
      .subscribe({
        next: () => {
          this.toastr.success("Changes saved");
        }, 
        error: (err) => {
          console.log(err);
        }
      })
  }

  total() {
    for(let item of this.cartItemsList){
      this.itemsPrice += item.count * item.product.price;
    }
    this.taxCalculator(this.itemsPrice);
    this.orderTotalCalculator(this.itemsPrice, this.tax);
  }

  taxCalculator(price: number) {
   this.tax = price * 0.0875;
  }

  orderTotalCalculator(itemsPrice: number, tax: number) {
    this.orderTotal = itemsPrice + tax;
  }

  public createImgPath = (serverPath: string) => {
    return `${environment.baseApiUrl}/${serverPath}`;
  }

  public navigateToShop = () => {
    this.router.navigate(['/shop/product/list']);
  }

  resetPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/shop/cart']);
  }
}
