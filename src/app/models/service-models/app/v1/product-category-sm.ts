import { SIMSServiceModelBase } from '../base/sims-service-model-base';
import { CategoryStatusSM } from '../enums/category-status-s-m.enum';

export class ProductCategorySM extends SIMSServiceModelBase<number> {
  name!: string;
  description!: string;
  status!: CategoryStatusSM;
  productCout!: number;
}
