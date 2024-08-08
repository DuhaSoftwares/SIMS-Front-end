import { AxiosResponse } from "axios";
import { BaseAjaxClient } from "./base-client/base-ajax.client";
import { IDictionaryCollection } from "../models/internal/Idictionary-collection";
import { DictionaryCollection } from "../models/internal/dictionary-collection";
import { ApiRequest } from "../models/service-models/foundation/api-contracts/base/api-request";
import { ErrorLog } from "../models/service-models/foundation/api-contracts/error-log";
import { AppConstants } from "../app-constants";



export class LoggerClient extends BaseAjaxClient {


    constructor() {
        super();
    }

    public SendLogsToServerAsync = async (logsArr: Array<ErrorLog>, headers: IDictionaryCollection<string, string> | null)
        : Promise<AxiosResponse> => {
        // think if we nee Base Req Here, if so, move class out of helpers.
        let apiReq = new ApiRequest<Array<ErrorLog>>();
        apiReq.reqData = logsArr;
        if (headers == null)
            headers = new DictionaryCollection<string, string>();
        headers.Add(AppConstants.HEADER_NAMES.ApiType, AppConstants.HEADER_VALUES.ApiType);
        headers.Add(AppConstants.HEADER_NAMES.DevApk, AppConstants.HEADER_VALUES.DevApk);
        headers.Add(AppConstants.HEADER_NAMES.AppVersion, AppConstants.HEADER_VALUES.AppVersion);
        return this.GetHttpDataAsync<ApiRequest<Array<ErrorLog>>>(AppConstants.API_ENDPOINTS.LOG_URL,
            'POST', apiReq, headers, 'application/json');
    }
}