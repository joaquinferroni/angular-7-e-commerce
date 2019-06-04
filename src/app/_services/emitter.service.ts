import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../_entities/product.entity';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {
  private addToCartEvent: BehaviorSubject<[Product, number]> = new BehaviorSubject<[Product, number]>(null);
  private clearSearchEvent: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  emitter_cartEvent = this.addToCartEvent.asObservable();
  emitter_searchEvent = this.clearSearchEvent.asObservable();
  constructor() { }

  emitCart(product: Product, total: number) {
    this.addToCartEvent.next([product, total]);
  }

  emitClearSearch(value: string) {
    this.clearSearchEvent.next(value);
  }
}
