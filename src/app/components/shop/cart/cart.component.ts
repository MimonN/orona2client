import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cart-item/cart-item.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CartService } from 'src/app/shared/services/cart.service';

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

  constructor(private authService: AuthenticationService, private cartRepo: CartService) {}

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
        window.location.reload();
      }
    })
  }

  saveAll() {
    this.cartRepo.updateCartItems(this.cartItemsList)
      .subscribe({
        next: (res) => {
          // here should be toastr alert
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
    return `https://localhost:5001/${serverPath}`;
  }
}
