import { Component, OnInit } from '@angular/core';
import { OrderHeader } from 'src/app/interfaces/order-header/order-header.model';
import { OrderControlService } from 'src/app/shared/services/order-control.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderHeadersList: OrderHeader[];

  constructor(private orderService: OrderControlService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders = () => {
    this.orderService.getAllOrders()
    .subscribe({
      next: (response: OrderHeader[]) => {
        this.orderHeadersList = response;
        console.log(this.orderHeadersList);
      }
    })
  }

}
