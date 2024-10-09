import { SIMSServiceModelBase } from "../base/sims-service-model-base";
import { VariantLevelSM } from "./variant-level-s-m-enum";

export class VariantSM extends SIMSServiceModelBase<number> {            
    name!: string;          
    variantLevel!: VariantLevelSM;  
    variantId?: number;    
  }