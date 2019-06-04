import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioInfo } from '../_entities/usuarioInfo.entity';
import { LoginService } from './login.service';
import { Category, SubCategory } from '../_entities/category.entity';
import { ProductResponse, ProductFilter, Product } from '../_entities/product.entity';
import { Brand } from '../_entities/brand.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  token = '';
  user: UsuarioInfo;

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.user.Token;
  }

  GetCategories(): Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(`${environment.apiUrl}/product/categories`);
  }

  GetSubCategories(): Observable<Array<SubCategory>> {
    return this.httpClient.get<Array<SubCategory>>(`${environment.apiUrl}/product/subcategories`);
  }

  GetBrands(): Observable<Array<Brand>> {
    return this.httpClient.get<Array<Brand>>(`${environment.apiUrl}/product/brands`);
  }

  GetProducts(filter: ProductFilter): Observable<ProductResponse> {
    const params = new HttpParams().set('filter', JSON.stringify(filter));

    return this.httpClient.get<ProductResponse>(`${environment.apiUrl}/product`, {params: params});
  }

  GetProduct(Id: number, ivaDetailed: boolean): Observable<Product> {
    const params = new HttpParams().set('ivaDetailed', ivaDetailed.toString());
    return this.httpClient.get<Product>(`${environment.apiUrl}/product/${Id}` ,   {params: params});
  }


}
