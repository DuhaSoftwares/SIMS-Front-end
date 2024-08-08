import { BaseViewModel } from "../../internal/base.viewmodel";
import { CropSM } from "../../service-models/app/v1/client/crop-s-m";
import { SQLReportDataModelSM } from "../../service-models/app/v1/client/s-q-l-report-data-model-s-m";

export class CropReportsViewModel extends BaseViewModel{
    cropReport:SQLReportDataModelSM=new SQLReportDataModelSM();
    cropsList:CropSM []=[]

}