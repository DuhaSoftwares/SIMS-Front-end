import { SIMSServiceModelBase } from '../base/sims-service-model-base';
import { CategoryLevelSM } from '../enums/category-status-s-m.enum';

export class ProductCategorySM extends SIMSServiceModelBase<number> {
  override id!: number;
  name!: string;
  levelId!: number;
  level!: CategoryLevelSM;
  status!: boolean;
  productCout!: number;
}
