import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetailsCreate } from 'src/app/interfaces/order-details/order-details-create.model';
import { OrderDetails } from 'src/app/interfaces/order-details/order-details.model';
import { OrderHeaderCreate } from 'src/app/interfaces/order-header/order-header-create.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderControlService {
  baseApiUrl: string = environment.baseApiUrl + '/api/Checkout/'

  constructor(private http: HttpClient) { }

  public getAllOrderDetails() {
    return this.http.get<OrderDetails[]>(this.baseApiUrl + 'GetAllOrderDetails');
  }

  public createOrderHeader(orderHeaderCreate: OrderHeaderCreate) {
    return this.http.post<string>(this.baseApiUrl + 'CreateOrderHeader', orderHeaderCreate);
  }

  public createOrderDetail(orderDetailCreate: OrderDetailsCreate) {
    return this.http.post<OrderDetails>(this.baseApiUrl + 'CreateOrderDetail', orderDetailCreate);
  }
}
