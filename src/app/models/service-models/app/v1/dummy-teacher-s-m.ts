import { simsServiceModelBase } from '../base/sims-service-model-base';

export class DummyTeacherSM extends simsServiceModelBase<number> {
    firstName!: string;
    lastName!: string;
    emailAddress!: string;
    profilePictureFileId?: number;
}
