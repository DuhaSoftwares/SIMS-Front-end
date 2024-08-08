import { simsServiceModelBase } from '../../../base/sims-service-model-base';
import { RoleTypeSM } from '../../../enums/role-type-s-m.enum';
import { LoginStatusSM } from '../../../enums/login-status-s-m.enum';

export class LoginUserSM extends simsServiceModelBase<number> {
    // _id!: string; // Assuming _id is of type string after conversion
    username!: string;
    email!: string;
    passwordHash!: string;
    isAdmin: boolean = false;
    role!: RoleTypeSM;
    companyCode!: number;
}