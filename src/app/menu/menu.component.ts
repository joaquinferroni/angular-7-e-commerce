import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginService } from '../_services/login.service';
import { Menu, CustomerDetail } from '../_entities/usuarioInfo.entity';
import { EmitterService } from '../_services/emitter.service';
import { MatSidenavContent, MatDialog } from '@angular/material';
import { Product } from '../_entities/product.entity';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy,  AfterViewInit {


  menuLateral: Menu[];
  menuIndex: number;
  userName: string;
  dollar: number;
  searchValue: string;
  subscriptionCartChange: Subscription;
  subscriptionSearchChange: Subscription;
  items_cart = 0 ;
  userData: CustomerDetail;

  @ViewChild(MatSidenavContent) private container: MatSidenavContent;
  elementRef: ElementRef<HTMLElement>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private loginService: LoginService,
    private emitterService: EmitterService,
    public dialog: MatDialog,
    public route: ActivatedRoute
    ) {
      this.userData = this.loginService.currentUserValue;
  }

  ngAfterViewInit() {
    this.elementRef = this.container.getElementRef();
    this.calculateItemsCart();
    this.cartChange();
    this.searchChange();
  }

  cartChange() {
    this.subscriptionCartChange = this.emitterService.emitter_cartEvent.subscribe((value: [Product, number]) => {
      setTimeout(() => {
        if (value && value.length > 0) {
          if(value[1] === -1) {
            this.calculateItemsCart();
            return;
          }
          let items_added = !localStorage.getItem('items_cart') ? new Array<Product>() : JSON.parse(localStorage.getItem('items_cart'));
          if (items_added.some( p => p.id === value[0].id)) {
            items_added = items_added.filter(p => p.id !== value[0].id);
            this.items_cart --;
          }
          items_added.push(value[0]);
          localStorage.setItem('items_cart', JSON.stringify(items_added));
          this.items_cart ++;
        }
      });
    });
  }

  searchChange() {
    this.subscriptionSearchChange = this.emitterService.emitter_searchEvent.subscribe((value: string) => {
      this.searchValue = value;
    });
  }

  calculateItemsCart() {
    const cart = !localStorage.getItem('items_cart') ? new Array<Product>() : JSON.parse(localStorage.getItem('items_cart'));
    this.items_cart = cart.length;
  }
  ngOnDestroy(): void {
    this.subscriptionCartChange.unsubscribe();
  }

  setMenuActive(index: number, m: Menu) {
    this.menuIndex = index;
    this.navigateToMenu(m);
  }

  navigateToMenu(m: Menu) {
      this.calculateItemsCart();
      this.router.navigate([m.Url], this.addQueryParam());
  }

  logout() {
    localStorage.removeItem('items_cart');
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  showData() {
      const dialogRef = this.dialog.open(ProfileModalComponent, {
        width: '500px',
        data: {user: this.userData}
      });
  }

  generalSearch() {
    this.router.navigate(['/menu/products-list'], this.addQueryParam());
  }

  goToCart() {
    this.router.navigate([ '/menu/cart' ] , this.addQueryParam());
  }

  addQueryParam(): any {
    if (!this.searchValue) {
      return {};
    }
    return { queryParams: { search: this.searchValue } };
  }

  ngOnInit() {
    this.menuIndex = 0;
    this.menuLateral = [
      new Menu(1, 'Productos', '/menu/products-list', 'card_giftcard', 1),
      new Menu(2, 'Mis Notas de pedido', '/menu/orders', 'list_alt', 2),
      new Menu(3, 'Resumen de cuenta', '/menu/account-resume', 'date_range', 3)
    ];
  }

}
