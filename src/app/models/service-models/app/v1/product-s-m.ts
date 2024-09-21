import { SIMSServiceModelBase } from "../base/sims-service-model-base";

export class ProductSM extends SIMSServiceModelBase<number>{
  name!: string;
  code?: string ;
  categoryId?: number;
  brandId!: number;
  warehouseId!: number;
  unitId!: number;
  variant!: string;
  quantity!: number;
  price!: number;
  image?: string | null;
  status!: boolean;
}