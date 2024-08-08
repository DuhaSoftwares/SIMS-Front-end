import { BaseViewModel } from "../../internal/base.viewmodel";
import { FarmSM } from "../../service-models/app/v1/client/farm-s-m";
import { SQLReportDataModelSM } from "../../service-models/app/v1/client/s-q-l-report-data-model-s-m";

export class FarmReportsViewModel extends BaseViewModel{
    farmReport:SQLReportDataModelSM=new SQLReportDataModelSM();
    farmDetails:FarmSM []=[];
    farmId:number=0;
    showReportTable:boolean=false;
}