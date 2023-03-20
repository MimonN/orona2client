import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductUpdate } from 'src/app/interfaces/product/product-update.model';
import { Product } from 'src/app/interfaces/product/product.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ProductRepositoryService } from 'src/app/shared/services/product-repository.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {
  updateProductRequest: ProductUpdate;
  productDetails: Product;
  @ViewChild('productForm') form: NgForm;
  response: string = '';
  id: number;
  errorMessage: string = '';
  
  constructor(private repository: ProductRepositoryService, private router: Router, private route: ActivatedRoute, 
    private errorHandler: ErrorHandlerService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = parseInt(params.get('id'));

        if(this.id){
          this.repository.getProductById(this.id)
          .subscribe({
            next: (response) => {
              this.productDetails = response;
              this.spinner.hide();
            }
          })
        }
      }
    })
  }
  
    onSubmit(){
      if(this.response === ''){
        this.updateProductRequest = {
          windowType: this.productDetails.windowType,
          imageUrl: this.productDetails.imageUrl,
          price: this.form.value.price,
          description: this.form.value.description
        }
      } else {
        this.updateProductRequest = {
          windowType: this.productDetails.windowType,
          imageUrl: this.response,
          price: this.form.value.price,
          description: this.form.value.description
        }
      }
  
      this.repository.updateProduct(this.productDetails.id, this.updateProductRequest)
      .subscribe({
        next: () => {
          this.router.navigate(['cms/product/list']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
        }
      })
    }
  
    uploadFinished = (event) => {
      this.response = event.dbPath;
    }
  
    public createImgPath = (serverPath: string) => {
      return `${environment.baseApiUrl}/${serverPath}`;
    }
  }
