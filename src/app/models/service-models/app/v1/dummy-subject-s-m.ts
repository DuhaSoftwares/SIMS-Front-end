import { SIMSServiceModelBase } from '../base/sims-service-model-base';

export class DummySubjectSM extends SIMSServiceModelBase<number> {
  subjectName!: string;
  subjectCode!: string;
  dummyTeacherID?: number;
}
