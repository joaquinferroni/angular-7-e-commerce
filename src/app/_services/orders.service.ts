import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderDTO, Order } from '../_entities/order.entity';
import { OrderDetail } from '../_entities/order-detail.entity';
import { Status } from '../_entities/status.entity';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  GetOrders(from: Date, to: Date, status: number): Observable<OrderDTO[]> {
    const params = new HttpParams()
                  .set('from', from.toDateString())
                  .set('to', to.toDateString())
                  .set('status', status.toString());
    return this.httpClient.get<OrderDTO[]>(`${environment.apiUrl}/orders`, {params: params});
  }

  GetOrder(Id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${environment.apiUrl}/orders/${Id}`);
  }

  GetStatus(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(`${environment.apiUrl}/orders/status`);
  }

  GetOrderDetail(Id: number): Observable<OrderDetail[]> {
    return this.httpClient.get<OrderDetail[]>(`${environment.apiUrl}/orders/${Id}/Details`);
  }

  SaveOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${environment.apiUrl}/orders`, order);
  }

}
