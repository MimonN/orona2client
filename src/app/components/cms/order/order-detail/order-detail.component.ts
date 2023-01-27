import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderDetails } from 'src/app/interfaces/order-details/order-details.model';
import { OrderHeaderUpdate } from 'src/app/interfaces/order-header/order-header-update.model';
import { OrderHeader } from 'src/app/interfaces/order-header/order-header.model';
import { OrderControlService } from 'src/app/shared/services/order-control.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  id: string;
  orderHeaderDetails: OrderHeader;
  orderDetailsList: OrderDetails[];
  orderHeaderUpdateRequest: OrderHeaderUpdate;
  orderForm: FormGroup;
  orderStatuses = [
    {value: 'Shipped'},
    {value: 'New'}, 
    {value: 'Cancelled'}, 
    {value: 'In Process'} 
  ];
  paymentStatuses = [
    {value: 'Paid'},
    {value: 'Not Paid'},
    {value: 'Pending'}
  ];

  constructor(private route: ActivatedRoute, private orderService: OrderControlService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if(this.id) {
          this.orderService.getOrderHeaderById(this.id).subscribe({
            next: (resp) => {
              this.orderHeaderDetails = resp;
              this.createForm();
              this.orderService.getOrderDetailsById(this.orderHeaderDetails.id).subscribe({
                next: (resp) => {
                  this.orderDetailsList = resp;
                }
              })
            }
          })
        }
      }
    });
    
  }

  createForm() {
    this.orderForm = new FormGroup({
      shippingDate: new FormControl(this.orderHeaderDetails.shippingDate),
      orderStatus: new FormControl(this.orderHeaderDetails.orderStatus),
      carrier: new FormControl(this.orderHeaderDetails.carrier),
      trackingNumber: new FormControl(this.orderHeaderDetails.trackingNumber),
      note: new FormControl(this.orderHeaderDetails.note),
      paymentStatus: new FormControl(this.orderHeaderDetails.paymentStatus)
    })
  }

  onSubmit() {
    const formValues = this.orderForm.value;
    this.orderHeaderUpdateRequest = {
      shippingDate: formValues.shippingDate,
      orderStatus: formValues.orderStatus,
      carrier: formValues.carrier,
      trackingNumber: formValues.trackingNumber,
      paymentStatus: formValues.paymentStatus,
      note: formValues.note
    };
    this.orderService.orderUpdate(this.id, this.orderHeaderUpdateRequest)
    .subscribe({
      next: (resp) => {
        this.toastr.success("Order Details updated");
      }
    })
  }
}
