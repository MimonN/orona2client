import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCreate } from 'src/app/interfaces/product/product-create.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ProductRepositoryService } from 'src/app/shared/services/product-repository.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  createProductRequest: ProductCreate;
  windowTypeName: string;
  imageUrl: string;
  @ViewChild('productForm') form: NgForm;
  response: string = '';
  errorMessage: string = '';
  baseApiUrl = environment.baseApiUrl;

  constructor(
    private repository: ProductRepositoryService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {}

  onSubmit() {
    this.createProductRequest = {
      windowType: this.form.value.windowType,
      price: this.form.value.price,
      imageUrl: this.response,
      description: this.form.value.description
    };

    this.repository.createProduct(this.createProductRequest).subscribe({
      next: () => {
        this.router.navigate(['cms/product/list']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = err.message;
      }
    });
  }

  uploadFinished = (event) => {
    this.response = event.dbPath;
  };

  public createImgPath = (serverPath: string) => {
    return this.baseApiUrl + `/${serverPath}`;
  };
}
