import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCreate } from 'src/app/interfaces/product/product-create.model';
import { ProductUpdate } from 'src/app/interfaces/product/product-update.model';
import { Product } from 'src/app/interfaces/product/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  public getAllProducts() {
    return this.http.get<Product[]>(this.baseApiUrl + '/api/Products/GetAllProducts');
  }

  public getProductById(id: number) {
    return this.http.get<Product>(this.baseApiUrl + '/api/Products/GetProductById/' + id);
  }

  public createProduct(createProductRequest: ProductCreate) {
    return this.http.post<ProductCreate>(this.baseApiUrl + '/api/Products/CreateProduct', createProductRequest);
  }

  public updateProduct(id: number, updateProductRequest: ProductUpdate) {
    return this.http.put<ProductUpdate>(this.baseApiUrl + '/api/Products/UpdateProduct/' + id, updateProductRequest);
  }

  public deleteProduct(id: number) {
    return this.http.delete<Product>(this.baseApiUrl + '/api/Products/DeleteProduct/' + id);
  }
}
