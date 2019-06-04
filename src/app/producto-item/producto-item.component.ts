import { Component, OnInit, Input } from '@angular/core';
import { Product, ProductListDTO } from '../_entities/product.entity';
import { ProductService } from '../_services/product.service';
import { EmitterService } from '../_services/emitter.service';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.scss']
})
export class ProductoItemComponent implements OnInit {
  @Input() product: ProductListDTO;
  productToCart: Product;
  showFinalPrice = true;
  constructor(
    private productService: ProductService,
    private loginService: LoginService,
    private emitter: EmitterService
    ) { }

  ngOnInit() {
    this.showFinalPrice = !this.loginService.currentUserValue.ivaDetailed;

  }

  addToCart() {
    this.productService.GetProduct(this.product.id, this.loginService.currentUserValue.ivaDetailed).subscribe(
      (data) => {
        if (!data) {
          return;
        }
        data.totalCart = 1;
        this.productToCart = data;
        this.emitter.emitCart(this.productToCart, 1);
      },
      (err) => {
      }
    );
  }

}
