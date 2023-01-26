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

  public getCartItemsByUsername(username: string) {
    return this.http.get<CartItem[]>(this.baseApiUrl + '/api/CartItems/GetCartItemsByUserName/' + username);
  }

  public upsertCartItem(cartItemUpsert: CartItemUpsert) {
    return this.http.post<CartItemUpsert>(this.baseApiUrl + '/api/CartItems/UpsertCartItem', cartItemUpsert)
    .subscribe();
  }

  public updateCartItems(cartItemsList: CartItem[]) {
    return this.http.put<CartItem[]>(this.baseApiUrl + '/api/CartItems/UpdateCartItems', cartItemsList);
  }

  public deleteCartItem(id: number) {
    return this.http.delete<CartItem>(this.baseApiUrl + '/api/CartItems/DeleteCartItem/' + id);
  }

  public removeRange(cartItems: CartItem[]) {
    return this.http.delete<any>(this.baseApiUrl + '/api/CartItems/RemoveRange', {body: cartItems});
  }
}
