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
  cartItemsList: CartItem[];

  constructor(private authService: AuthenticationService, private cartRepo: CartService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.cartRepo.getCartItemsByUsername(this.username)
    .subscribe({
      next: (resp) => {
        this.cartItemsList = resp;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addOne(id: number) {
    let item = this.cartItemsList.find(x => x.id === id);
    item.count += 1;
  }

  minusOne(id: number) {
    let item = this.cartItemsList.find(x => x.id === id);
    if(item.count === 1){
      this.remove(id);
    } else {
      item.count -= 1;
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

  save() {
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

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  }
}
