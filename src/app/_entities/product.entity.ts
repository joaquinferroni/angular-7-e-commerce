
export class Product {
    id: number;
    money: string;
    symbol: string;
    categoryId: number;
    category: string;
    subCategoryId: number;
    subCategory: string;
    familyId: number;
    family: string;
    brandId: number;
    brand: string;
    price: number;
    finalPrice: number;
    detail: string;
    barcode: string;
    observations: string;
    images: Array<ProductImage>;
    totalCart: number;
    alicuota: number;
    tipoAlicuota: number;
    iva: number;
}

export class ProductImage {
  id: number;
  productId: number;
  base64Img: string;
}


export class ProductListDTO {
  id: number;
  code: string;
  money: string;
  symbol: string;
  tipoAlicuota: string;
  price: number;
  finalPrice: number;
  detail: string;
  imageB64: string;
}

export class ProductResponse {
    page: number;
    total: number;
    pageSize: number;
    products: Array<ProductListDTO>;
}

export class ProductFilter {
  Page: number;
  PageSize: number;
  SubCategoryId: number;
  CategoryId: number;
  FamilyId: number;
  BrandId: number;
  Code: string;
  Detail: string;
  Iva: boolean;

  constructor() {
    this.setInitialPage();
    this.PageSize = 16;
    this.CategoryId = 0;
    this.SubCategoryId = 0;
    this.BrandId = 0;
    this.Iva = false;
    this.Code = '';
    this.Detail = '';
  }

  setInitialPage() {
    this.Page = 1;
  }
}
