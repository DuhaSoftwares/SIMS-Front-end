import { SIMSServiceModelBase } from "../../../base/sims-service-model-base";

export class SignUpSM extends SIMSServiceModelBase<number> {
    loginId!: string;
    firstName!: string;
    lastName!: string;
    emailId!: string;
    passwordHash!: string;
}
