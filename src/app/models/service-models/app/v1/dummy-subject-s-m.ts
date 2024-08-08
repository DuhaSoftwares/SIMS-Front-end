import { simsServiceModelBase } from '../base/sims-service-model-base';

export class DummySubjectSM extends simsServiceModelBase<number> {
    subjectName!: string;
    subjectCode!: string;
    dummyTeacherID?: number;
}
