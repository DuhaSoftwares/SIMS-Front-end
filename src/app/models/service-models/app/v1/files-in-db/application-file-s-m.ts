import { simsServiceModelBase } from '../../base/sims-service-model-base';

export class ApplicationFileSM extends simsServiceModelBase<number> {
    fileName!: string;
    fileType!: string;
    fileDescription!: string;
    fileBytes!: string;
}
