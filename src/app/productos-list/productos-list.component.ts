import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ProductService } from '../_services/product.service';
import { Category, SubCategory } from '../_entities/category.entity';
import { ProductResponse, ProductFilter } from '../_entities/product.entity';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../_services/login.service';
import { Brand } from '../_entities/brand.entity';
import { EmitterService } from '../_services/emitter.service';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.scss']
})
export class ProductosListComponent implements OnInit {
  brand = new FormControl();
  category = new FormControl();
  subCategory = new FormControl();
  categories = new Array<Category>();
  subCategories = new Array<SubCategory>();
  brands = new Array<Brand>();
  totalSubCategories = new Array<SubCategory>();
  categorySelected = 0;
  subCategorySelected = 0;
  brandSelected = 0;
  filteredCategoriesOptions: Observable<Array<Category>>;
  filteredSubCategoriesOptions: Observable<Array<SubCategory>>;
  filteredBrandsOptions: Observable<Array<Brand>>;
  isClickedCat = false;
  isClickedSub = false;
  isClickedBrand = false;
  categoryInput = '';
  subcategoryInput = '';
  brandInput = '';
  loading = true;
  loading_list = true;
  productResponse = new ProductResponse();
  productFilter = new ProductFilter();

  constructor(
    private productService: ProductService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private emitter: EmitterService
  ) {
      }

  ngOnInit() {
    this.loadCategories();
    this.loadSubCategories();
    this.loadBrands();
    if (!this.route.queryParams) {
      this.search();
    }
    this.route.queryParams.subscribe(queryParams => {
      this.productFilter.Detail = queryParams['search'];
      console.log(this.productFilter.Detail );
      this.clean();
      this.search(true, true);
    });
  }

  loadCategories() {
    this.productService.GetCategories().subscribe(
      (data) => {
        this.categories = data;
        this.filteredCategoriesOptions = this.category.valueChanges
        .pipe(startWith(''), map(value => this._filter(value))
        );
        this.loading = false;
      },
      (err) => console.log(err)
      );
  }

  loadSubCategories() {
      this.productService.GetSubCategories().subscribe(
        (data) => {
          this.totalSubCategories = data;
          this.subCategories = data;
          this.doSubCFilter();

        },
      (err) => console.log(err)
    );
  }

  loadBrands() {
    this.productService.GetBrands().subscribe(
      (data) => {
        this.brands = data;
        this.filteredBrandsOptions = this.brand.valueChanges
        .pipe(startWith(''), map(value => this._filterBrand(value))
        );
      },
    (err) => console.log(err)
  );
}

  search( resetPage: boolean = true , isFromToolbar: boolean = false) {
    this.loading_list = true;
    this.isClickedCat = true;
    this.isClickedSub = true;
    this.isClickedBrand = true;
    if (resetPage) {
      this.productFilter.Page = 1;
    }
    if (!isFromToolbar){
      this.emitter.emitClearSearch('');
      this.productFilter.Detail = '';
    }
    this.productFilter.CategoryId = this.categorySelected;
    this.productFilter.SubCategoryId = this.subCategorySelected;
    this.productFilter.BrandId = this.brandSelected;
    this.productFilter.Iva = this.loginService.currentUserValue.ivaDetailed;
    this.productService.GetProducts(this.productFilter).subscribe(
     (data) => {
       this.productResponse = data;
       this.loading_list = false;
     },
     (err) => {
      this.loading_list = false;
      this.productResponse.total = 0;
      console.log(err);
     }
   );
  }

  categoryChange(id: number, selected: boolean) {
    if (!selected) {
      return;
    }
    this.isClickedCat = true;
    this.categorySelected = id;
    this.subCategorySelected = 0;
    this.subcategoryInput = '';
    this.subCategories = this.totalSubCategories.filter( s => s.categoryId === id);
    this.doSubCFilter();
  }

  subcategoryChange(id: number, selected: boolean) {
    if (!selected) {
      return;
    }
    this.isClickedSub = true;
    this.subCategorySelected = id;
  }

  brandChange(id: number, selected: boolean) {
    if (!selected) {
      return;
    }
    this.isClickedBrand = true;
    this.brandSelected = id;
  }

  private doSubCFilter() {
    this.filteredSubCategoriesOptions = this.subCategory.valueChanges
    .pipe(startWith(''), map(value => this._filterSub(value))
    );
  }

  private _filter(value: string) {
    if (!this.isClickedCat  || !value ) {
      this.subCategories = this.totalSubCategories;
      this.categorySelected = 0;
      this.subcategoryInput = '';
      this.doSubCFilter();
    }
    this.isClickedCat = false;
    const filterValue = value.toLowerCase();
    return this.categories.filter(category => category.text.toLowerCase().includes(filterValue));
  }

  private _filterSub(value: string) {
    if (!this.isClickedSub || !value) {
      this.subCategorySelected = 0;
      this.subcategoryInput = '';
    }
    this.isClickedSub = false;
    const filterValue = value.toLowerCase();
    return this.subCategories.filter(subcategory => subcategory.text.toLowerCase().includes(filterValue));
  }

  private _filterBrand(value: string) {
    if (!this.isClickedBrand || !value) {
      this.brandSelected = 0;
      this.brandInput = '';
    }
    this.isClickedBrand = false;
    const filterValue = value.toLowerCase();
    return this.brands.filter(b => b.text.toLowerCase().includes(filterValue));
  }

  pageChange(page: any) {
    this.productFilter.Page = page.pageIndex + 1;
    this.productFilter.PageSize = page.pageSize;
    this.search(false);
  }

  goToDetail(id: number) {
    this.router.navigate(['/menu/product-detail', id], {queryParams: this.route.snapshot.queryParams});
  }

  clean() {
    this.categorySelected = 0;
    this.categoryInput = '';
    this.subCategorySelected = 0;
    this.subcategoryInput = '';
    this.totalSubCategories = [];
    this.brandSelected = 0;
    this.brandInput = '';
    this.productFilter.Code = '' ;
  }

}
