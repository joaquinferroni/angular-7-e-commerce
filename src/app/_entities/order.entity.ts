import { Product } from './product.entity';
import { OrderDetail } from './order-detail.entity';

export class Order {
  paymentMethod: number;
  paymentMethodDescription: string;
  total: number;
  iva: number;
  neto: number;
  customerId: number;
  sellerId: number;
  userId: number;
  observation: string;
  dollarValue: number;
  products: Array<Product>;

  constructor(
    paymentMethod: number
    , paymentMethodDescription: string
    , total: number
    , iva: number
    , neto: number
    , sellerId: number
    , observation: string
    , dollarValue: number
    , products: Array<Product>) {
    this.paymentMethod = paymentMethod;
    this.paymentMethodDescription = paymentMethodDescription;
    this.total = total;
    this.iva = iva;
    this.neto = neto;
    this.sellerId = sellerId;
    this.observation = observation;
    this.dollarValue = dollarValue;
    this.products = products;
  }
}

export class OrderDTO {
  orderId: number;
  number: number;
  orderDate: Date;
  neto: number;
  iva: number;
  total: number;
  dollar: number;
  clientId: number;
  observation: string;
  ticket: string;
  money: string;
  sellerName: string;
  statusName: string;
  orderDetails: OrderDetail[];

  constructor() {}
}
