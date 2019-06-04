import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './_helpers/auth.guard.service';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { ProductosListComponent } from './productos-list/productos-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { AccountResumeComponent } from './account-resume/account-resume.component';
const appRoutes: Routes = [
    { path: 'menu', component: MenuComponent, children: [
        { path: 'products-list', component: ProductosListComponent },
        { path: 'product-detail/:id', component: ProductDetailComponent },
        { path: 'cart', component: CartComponent },
        { path: 'orders', component: OrdersComponent },
        { path: 'account-resume', component: AccountResumeComponent },
    ], canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to menu
    { path: '**', redirectTo: 'login' }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
