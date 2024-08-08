import { simsServiceModelBase } from '../../base/sims-service-model-base';

export class ClientUserAddressSM extends simsServiceModelBase<number> {
    country!: string;
    state!: string;
    city!: string;
    address1!: string;
    address2!: string;
    pinCode!: string;
    clientUserId!: number;
}
