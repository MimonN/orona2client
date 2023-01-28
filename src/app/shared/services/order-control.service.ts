import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetailsCreate } from 'src/app/interfaces/order-details/order-details-create.model';
import { OrderDetails } from 'src/app/interfaces/order-details/order-details.model';
import { OrderHeaderCreate } from 'src/app/interfaces/order-header/order-header-create.model';
import { OrderHeaderUpdate } from 'src/app/interfaces/order-header/order-header-update.model';
import { OrderHeader } from 'src/app/interfaces/order-header/order-header.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderControlService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  public getAllOrders() {
    return this.http.get<OrderHeader[]>(this.baseApiUrl + '/api/OrderManagement/GetAllOrders');
  }

  public getOrderHeaderById(id: string) {
    return this.http.get<OrderHeader>(this.baseApiUrl + '/api/OrderManagement/GetOrderHeaderById/' + id);
  }

  public getOrderDetailsById(id: string) {
    return this.http.get<OrderDetails[]>(this.baseApiUrl + '/api/OrderManagement/GetOrderDetailsById/' + id);
  }

  public createOrderHeader(orderHeaderCreate: OrderHeaderCreate) {
    return this.http.post<string>(this.baseApiUrl + '/api/Checkout/CreateOrderHeader', orderHeaderCreate);
  }

  public createOrderDetail(orderDetailCreate: OrderDetailsCreate) {
    return this.http.post<OrderDetails>(this.baseApiUrl + '/api/Checkout/CreateOrderDetail', orderDetailCreate);
  }

  public orderUpdate(id: string, orderUpdate: OrderHeaderUpdate) {
    return this.http.put<OrderHeader>(this.baseApiUrl + '/api/OrderManagement/UpdateOrder/' + id, orderUpdate);
  }
}
