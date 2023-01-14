import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItemUpsert } from 'src/app/interfaces/cart-item/cart-item-upsert.model';
import { CartItem } from 'src/app/interfaces/cart-item/cart-item.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  public getCartItemsByUsername() {
    return this.http.get<CartItem[]>(this.baseApiUrl + '/api/CartItems/CartItemsByUserName');
  }

  public upsertCartItem(cartItemUpsert: CartItemUpsert) {
    console.log("message from cart repo");
    return this.http.post<CartItemUpsert>(this.baseApiUrl + '/api/CartItems/UpsertCartItem', cartItemUpsert)
    .subscribe();
  }

  public updateCartItems(cartItemsList: CartItem[]) {
    return this.http.put<CartItem[]>(this.baseApiUrl + '/api/CartItems/UpdateCartItems', cartItemsList);
  }

  public deleteCartItem(id: number) {
    return this.http.delete<CartItem>(this.baseApiUrl + '/api/CartItems/DeleteCartItem/' + id);
  }
}
