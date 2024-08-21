import { SIMSServiceModelBase } from "../base/sims-service-model-base";
import { StorageTypeSM } from "../enums/warehouse-storage-type-s-m.enum";

export class WareHouseSM extends SIMSServiceModelBase<number>{
    name!: string;                  // Name of the warehouse
    description!: string;           // Description of the warehouse
    location!: string;              // Location of the warehouse
    contactNumber!: string;         // Contact number for the warehouse
    emailId!: string;               // Email ID of the warehouse
    storageType!: StorageTypeSM;    // Storage type (assuming StorageTypeSM is an enum or another type)
    capacity!: number;              // Capacity of the warehouse
    isActive!: boolean;             // Whether the warehouse is active or not
    clientCompanyDetailId?: number; // Foreign key to the ClientCompanyDetail, nullable
}