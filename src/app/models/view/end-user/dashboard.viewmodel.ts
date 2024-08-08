import { BaseViewModel } from "../../internal/base.viewmodel";
import { InputControlInformation } from "../../internal/common-models";
import { PaginationViewModel } from "../../internal/pagination.viewmodel";

export class DashboardViewModel implements BaseViewModel{
    pagination: PaginationViewModel;
    FormSubmitted?: boolean;
    controlsInformation?: { [key: string]: InputControlInformation; };
    PageTitle: string;
}