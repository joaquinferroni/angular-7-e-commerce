import { Component, OnInit,  AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmitterService } from '../_services/emitter.service';
import { ProductService } from '../_services/product.service';
import { ProductFilter, Product, ProductResponse, ProductListDTO } from '../_entities/product.entity';
import { Image } from '@ks89/angular-modal-gallery';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
  imageIndex = 1;
  galleryId = 1;
  autoPlay = true;
  showArrows = true;
  showDots = true;
  images: Array<Image>;

  id = 0;
  productFilter = new ProductFilter();
  productResponse = new ProductResponse();
  products: Array<ProductListDTO>;
  product: Product;
  loading = true;
  emptyProduct = false;
  itemsToAdd = 1;
  showFinalPrice = true;
  disableCart = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private emitter: EmitterService,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.productFilter = new ProductFilter();
   }

  ngOnInit() {
    this.showFinalPrice = !this.loginService.currentUserValue.ivaDetailed;
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'), null);
      this.searchProduct();
    });
  }

  ngAfterViewInit() {
  }

  searchProduct() {
    this.itemsToAdd = 1;
    this.loading = true;
    this.productService.GetProduct(this.id, this.loginService.currentUserValue.ivaDetailed).subscribe(
      (data) => {
        if (!data) {
          this.emptyProduct = true;
          return;
        }
        this.product = data;
        this.loadImages();
        this.loadSimilarProduct();
        this.loading = false;
      },
      (err) => {
       console.log(err);
       this.emptyProduct = true;
       this.loading = false;
      }
    );
  }

  loadImages() {
    this.images = new Array<Image>();
    if (this.product.images.length === 0) {
      this.images.push(new Image(0, {img: './assets/images/general/default-product.png'}, {img: './assets/images/general/default-product.png'}));
      return;
    }
    let count = 0;
    this.product.images.forEach(img => {
      this.images.push(new Image(count, {img: `data:image/jpg;base64,${img.base64Img}`}, {img: `data:image/jpg;base64,${img.base64Img}`}));
      count ++;
    });
  }

  loadSimilarProduct() {
    this.productFilter.CategoryId = this.product.categoryId;
    this.productFilter.SubCategoryId = this.product.subCategoryId;
    this.productFilter.Iva = this.loginService.currentUserValue.ivaDetailed;
    //this.productFilter.FamilyId = this.product.familyId;
    //this.productFilter.BrandId = this.product.brandId;
    this.productService.GetProducts(this.productFilter).subscribe(
      (data) => {
        this.products = data.products.filter(p => p.id !== this.id).slice(0, 4);
      }
    );
  }


  addItem( element: number){
    if ( element > 0) {
      this.itemsToAdd ++;
    } else {
      if (this.itemsToAdd === 1 ) {
        return ;
      }
      this.itemsToAdd --;
    }
  }
  addToCart() {
    this.product.totalCart = this.itemsToAdd;
  this.disableCart = true;
    this.emitter.emitCart(this.product, 1);
  }

  goToDetail(id: number) {
    this.router.navigate(['/menu/product-detail', id], {queryParams: this.route.snapshot.queryParams});
  }

  backToList() {
    this.router.navigate(['/menu/products-list'], {queryParams: this.route.snapshot.queryParams});
  }
}
