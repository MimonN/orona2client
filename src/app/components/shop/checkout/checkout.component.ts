import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/interfaces/cart-item/cart-item.model';
import { OrderDetailsCreate } from 'src/app/interfaces/order-details/order-details-create.model';
import { OrderHeaderCreate } from 'src/app/interfaces/order-header/order-header-create.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderControlService } from 'src/app/shared/services/order-control.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  username: string;
  cartItemList: CartItem[] = [];
  orderDetails: OrderDetailsCreate;
  orderDetailsList: OrderDetailsCreate[] = [];
  orderTotal: number = 0;
  orderHeaderForm: FormGroup;
  orderHeaderCreate: OrderHeaderCreate;
  orderHeaderId: string = '';
  tax: number = 0;
  itemsPrice: number = 0;
  
  constructor(private authService: AuthenticationService, private cartRepo: CartService, private router: Router, private toastr: ToastrService, private orderControl: OrderControlService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.cartRepo.getCartItemsByUsername(this.username)
    .subscribe({
      next: (resp) => {
        this.cartItemList = resp;
        this.total();
        this.createForm();
      }
    });
  }

  createForm() {
    this.orderHeaderForm = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      orderTotal: new FormControl(this.orderTotal, Validators.required),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      streetAddress: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      postalCode: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    });
  }

  isFormValid() {
    if(this.orderHeaderForm.invalid) {
      this.orderHeaderForm.markAllAsTouched();
    } else {
      this.placeOrder();
    }
  }

  placeOrder() {
    const formValues = this.orderHeaderForm.value;
    this.orderHeaderCreate = {
      username: formValues.username,
      orderTotal: formValues.orderTotal,
      name: formValues.name,
      email: formValues.email,
      phoneNumber: formValues.phone,
      streetAddress: formValues.streetAddress,
      city: formValues.city,
      state: formValues.state,
      postalCode: formValues.postalCode
    };
    this.orderControl.createOrderHeader(this.orderHeaderCreate)
    .subscribe({
      next: (resp) => {
        this.orderHeaderId = resp;
        for(let item of this.cartItemList) {
          let orderDetail: OrderDetailsCreate = {
            orderHeaderId: this.orderHeaderId,
            productId: item.productId,
            count: item.count
          };
          this.orderDetailsList.push(orderDetail);
        };
        for(let order of this.orderDetailsList) {
          this.orderControl.createOrderDetail(order)
          .subscribe();
        }
        this.cartRepo.removeRange(this.cartItemList).subscribe({
          next: () => {
            // this.router.navigateByUrl('shop/cart/checkout/confirmation', {state: {id: this.orderHeaderId}});
            this.router.navigate(['/shop/cart/checkout/confirmation', { data: JSON.stringify(this.orderHeaderId) }]);
          }
        })
      }
    });
  }

  total() {
    for(let item of this.cartItemList){
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
}
