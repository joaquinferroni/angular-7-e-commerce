export class Category{
    id: number;
    text: string;
}

export class SubCategory{
    id: number;
    text: string;
    categoryId: number;
}