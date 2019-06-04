import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from '../_services/orders.service';
import { OrderDTO } from '../_entities/order.entity';
import { MatDatepickerInputEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { LoginService } from '../_services/login.service';
import { Observable } from 'rxjs';
import { Status } from '../_entities/status.entity';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersComponent implements OnInit {
  loading = true;
  orders = new Array<OrderDTO>();
  displayedColumns: string[] = ['date', 'ticket' , 'status', 'seller', 'money' , 'total'];
  from = new FormControl(new Date());
  to =  new FormControl(new Date());
  expandedElement: OrderDTO ;
  ivaCondition: number;
  status = new FormControl();
  statuses = new Array<Status>();
  statusSelected = 0;
  filteredStatusOptions: Observable<Array<Status>>;
  isClickedStatus = false;
  statusInput = '';

  constructor(
    private router: Router,
    private orderService: OrdersService,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {
    this.from.value.setDate(0);
    this.from.value.setDate(1);
    this.ivaCondition = this.loginService.currentUserValue.paymentConditionId;

  }

  ngOnInit() {
    this.loadStatus();
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.GetOrders(this.from.value, this.to.value, this.statusSelected).subscribe(
      (orders) => {
        this.loading = false;
        this.orders = orders;
      }
    );
  }

  loadStatus() {
    this.orderService.GetStatus().subscribe(
      (data) => {
        this.statuses = data;
        this.filteredStatusOptions = this.status.valueChanges
        .pipe(startWith(''), map(value => this._filterStatus(value))
        );
      }
    );
  }

  fromChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.from.setValue(event.value);
  }

  toChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.to.setValue(event.value);
  }

  getValidDate( orderDate: string): string {
    var formatted = new Date(orderDate);
    return formatted.toLocaleDateString();
  }

  getValidNumber( numb: string): number {
    return parseInt(numb);
  }

  backToList() {
    this.router.navigate(['/menu/products-list'] , {queryParams: this.route.snapshot.queryParams});
  }

  rowClick(element: OrderDTO) {
    if (!element.orderDetails) {
      this.orderService.GetOrderDetail(element.orderId).subscribe(
        (data) => {
          element.orderDetails = data;
          this.expandedElement = this.expandedElement === element ? null : element;
        }
      );
    } else {
      this.expandedElement = this.expandedElement === element ? null : element;
    }
  }

  private _filterStatus(value: string) {
    if (!this.isClickedStatus  || !value ) {
      this.statusSelected = 0;
      this.statusInput = '';
    }
    this.isClickedStatus = false;
    const filterValue = value.toLowerCase();
    return this.statuses.filter(s => s.text.toLowerCase().includes(filterValue));
  }

  statusChange(id: number, selected: boolean) {
    if (!selected) {
      return;
    }
    this.isClickedStatus = true;
    this.statusSelected = id;
  }


}
