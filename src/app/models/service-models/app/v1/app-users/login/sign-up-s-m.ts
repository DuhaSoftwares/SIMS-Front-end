import { simsServiceModelBase } from '../../../base/sims-service-model-base';

export class SignUpSM extends simsServiceModelBase<number> {
    loginId!: string;
    firstName!: string;
    lastName!: string;
    emailId!: string;
    passwordHash!: string;
}
