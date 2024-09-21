import { SIMSServiceModelBase } from '../base/sims-service-model-base';
<<<<<<< HEAD
import { CategoryLevelSM } from '../enums/category-level-s-m.enum';
import { CategoryStatusSM } from '../enums/category-status-s-m.enum';
=======
import { CategoryLevelSM } from '../enums/category-status-s-m.enum';
>>>>>>> 67e6c5bb52a96fd0b5d97e54b0a859f1ea198a59

export class ProductCategorySM extends SIMSServiceModelBase<number> {
  override id!: number;
  name!: string;
  levelId!: number;
  level!: CategoryLevelSM;
  status!: boolean;
<<<<<<< HEAD
  productCount?: number;
=======
  productCout!: number;
>>>>>>> 67e6c5bb52a96fd0b5d97e54b0a859f1ea198a59
}
