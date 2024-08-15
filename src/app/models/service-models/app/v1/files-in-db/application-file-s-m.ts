import { SIMSServiceModelBase } from "../../base/sims-service-model-base";


export class ApplicationFileSM extends SIMSServiceModelBase<number> {
    fileName!: string;
    fileType!: string;
    fileDescription!: string;
    fileBytes!: string;
}
