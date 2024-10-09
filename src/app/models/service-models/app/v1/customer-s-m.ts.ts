import { SIMSServiceModelBase } from "../base/sims-service-model-base";
import { CustomerGroupSM } from "./customer-group-s-m-enum.ts";

export class CustomerSM extends SIMSServiceModelBase<number> {
  name!: string;               
  emailId!: string;            
  phoneNumber!: string;        
  country!: string;            
  city!: string;               
  zipCode!: string;            
  address!: string;            
  customerGroup!: CustomerGroupSM;    
  }