import { BaseViewModel } from '../../internal/base.viewmodel';
import { ProductCategorySM } from '../../service-models/app/v1/product-category-sm';

export class CategoriesViewModel extends BaseViewModel {
  fileName: string = '';
  updateMode: boolean = false;
  singleCategory = new ProductCategorySM();
  categories: ProductCategorySM[] = [];
}
