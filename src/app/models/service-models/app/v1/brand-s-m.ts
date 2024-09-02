import { SIMSServiceModelBase } from '../base/sims-service-model-base';

export class BrandSM extends SIMSServiceModelBase<number> {
  name!: string;
  imagePath!: string;
  productCount!: number;
}
