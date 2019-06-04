import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
  MatInputModule, MatCardModule, MatSelectModule, MatMenuModule, MatTableModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatCheckboxModule, MatAutocompleteModule, MatPaginatorIntl, MatNativeDateModule} from '@angular/material';
  import {MatDatepickerModule } from '@angular/material/datepicker';
  import {MatDialogModule} from '@angular/material/dialog';
  import {SlideshowModule} from 'ng-simple-slideshow';
  import { GalleryModule } from '@ks89/angular-modal-gallery';
  import {MatChipsModule} from '@angular/material/chips';
  import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProductosListComponent } from './productos-list/productos-list.component';
import { ProductoItemComponent } from './producto-item/producto-item.component';
import { SpinnerComponent } from './_helpers/spinner/spinner.component';
import { PricePipe, PriceSymbolPipe } from './price.pipe';
import { getArsPaginatorIntl } from './productos-list/ars.paginator.init';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { AccountResumeComponent } from './account-resume/account-resume.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    ProductosListComponent,
    ProductoItemComponent,
    SpinnerComponent,
    PricePipe,
    PriceSymbolPipe,
    ProductDetailComponent,
    CartComponent,
    OrdersComponent,
    ProfileModalComponent,
    AccountResumeComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatChipsModule,
    MatBadgeModule,
    SlideshowModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GalleryModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'cl' },
    { provide: MatPaginatorIntl, useValue: getArsPaginatorIntl() }
  ],
  entryComponents: [ProfileModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
