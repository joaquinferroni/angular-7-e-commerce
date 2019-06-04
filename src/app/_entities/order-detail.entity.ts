import { Product } from './product.entity';

export class OrderDetail {
  detailOrderId: number;
  orderId: number;
  productId: number;
  productDetail: string;
  count: number;
  price_A: number;
  price_B: number;
  subTotal: number;


}
