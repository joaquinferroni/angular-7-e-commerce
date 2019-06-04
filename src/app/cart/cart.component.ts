import { Component, OnInit } from '@angular/core';
import { Product } from '../_entities/product.entity';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../_services/login.service';
import { ProductService } from '../_services/product.service';
import { EmitterService } from '../_services/emitter.service';
import { MatSnackBar } from '@angular/material';
import { OrdersService } from '../_services/orders.service';
import { Order } from '../_entities/order.entity';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products: Array<Product>;
  observation = '';
  loading = true;
  emptyProduct = false;
  itemsToAdd = 1;
  showFinalPrice = true;
  displayedColumns: string[] = ['product', 'price' , 'iva', 'subtotal', 'actions'];
  constructor(
    private router: Router,
    private loginService: LoginService,
    private productService: ProductService,
    private ordersService: OrdersService,
    private emitter: EmitterService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.showFinalPrice = !this.loginService.currentUserValue.ivaDetailed;
    this.loadCartProducts();
  }

  loadCartProducts() {
    this.products = JSON.parse(localStorage.getItem('items_cart'));
    this.loading = false;
  }

  getDisplayedColumns() {
    return this.displayedColumns.filter( x => x !== 'iva' || !this.showFinalPrice);
    }

  getImage(p: Product): string {
    if (!p.images || p.images.length === 0) {
      return '';
    }
    return `data:image/jpg;base64,${p.images[0].base64Img}`;
  }

  addItem(p: Product, i: number) {
    if (p.totalCart === 1 && i < 0) {
      return;
    }
    p.totalCart += i;
  }

  deleteItem( id: number) {
    this.products = this.products.filter(p => p.id !== id);
    localStorage.setItem('items_cart', JSON.stringify(this.products));
    this.emitter.emitCart(null, -1);
  }

  getTotal(): number {
    let total = 0;
    this.products.forEach(p => {
      total += p.finalPrice * p.totalCart;
    });
    return total;
  }

  getPriceTotal(): number {
    let total = 0;
    this.products.forEach(p => {
      total += p.price * p.totalCart;
    });
    return total;
  }

  getIvaTotal(): number {
    let total = 0;
    this.products.forEach(p => {
      total += p.iva * p.totalCart;
    });
    return total;
  }

  backToList() {
    this.router.navigate(['/menu/products-list'] , {queryParams: this.route.snapshot.queryParams});
  }

  sendOrder() {
    this.loading = true;
    this.ordersService.SaveOrder(new Order(1, 'Efectivo', this.getTotal(), this.getIvaTotal(), this.getPriceTotal(), 1, this.observation, this.loginService.currentUserValue.dollar , this.products)).subscribe(
      (data) => {
        this.loading = false;
        localStorage.removeItem('items_cart');
        this.products = [];
        this.emitter.emitCart(null, -1);
        this.snackBar.open('Su pedido se ha enviado al proveedor!', 'OK', {
          duration: 5000,
        });
        this.backToList();
      }, (err) => {
        this.loading = false;
        this.snackBar.open('Ocurrió un error al enviar su pedido. Por favor intente nuevamente', 'OK', {
          duration: 5000,
        });
      }
    );
  }

}
