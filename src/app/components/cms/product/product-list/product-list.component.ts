import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product } from 'src/app/interfaces/product/product.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductRepositoryService } from 'src/app/shared/services/product-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[];
  errorMessage: string = '';
  modalRef?: BsModalRef;
  message?: string;
  baseApiUrl = environment.baseApiUrl;

  constructor(private repository: ProductRepositoryService, private errorHandler: ErrorHandlerService, private router: Router, 
    private modalService: BsModalService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts = () => {
    this.repository.getAllProducts()
    .subscribe({
      next: (response: Product[]) => {
        this.productList = response;
        this.spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      } 
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered'});
  }
 
  confirm(id: number): void {
    // this.message = 'Confirmed!';
    this.deleteProduct(id);
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  deleteProduct(id: number) {
    this.repository.deleteProduct(id).subscribe({
      next: () => {
        window.location.reload();
      }
    })
  }

  public createImgPath = (serverPath: string) => {
    return `${environment.baseApiUrl}/${serverPath}`;
  }
}
