import { SIMSServiceModelBase } from '../base/sims-service-model-base';
import { CategoryLevelSM } from '../enums/category-level-s-m.enum';
import { CategoryStatusSM } from '../enums/category-status-s-m.enum';

export class ProductCategorySM extends SIMSServiceModelBase<number> {
  name!: string;
  levelId!: number;
  level!: CategoryLevelSM;
  status!: boolean;
  productCount?: number;
}
