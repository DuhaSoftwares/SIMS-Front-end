import { SIMSServiceModelBase } from "../base/sims-service-model-base";

export class SupplierSM extends SIMSServiceModelBase<number> {
    name!: string;
    emailId!: string;
    phoneNumber!: string;
    country!: string;
    city!: string;
    zipCode!: string;
    address!: string;
    companyName!: string;
}
