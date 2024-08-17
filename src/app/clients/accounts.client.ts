import { Injectable } from "@angular/core";
import { AdditionalRequestDetails, Authentication } from "../models/internal/additional-request-details";
import { BaseApiClient } from "./base-client/base-api.client";
import { CommonResponseCodeHandler } from "./helpers/common-response-code-handler.helper";
import { StorageCache } from "./helpers/storage-cache.helper";

import { StorageService } from "../services/storage.service";
import { TokenRequestSM } from "../models/service-models/app/token/token-request-s-m";
import { ApiRequest } from "../models/service-models/foundation/api-contracts/base/api-request";
import { ApiResponse } from "../models/service-models/foundation/api-contracts/base/api-response";
import { TokenResponseSM } from "../models/service-models/app/token/token-response-s-m";
import { SignUpSM } from "../models/service-models/app/v1/app-users/login/sign-up-s-m";
import { AppConstants } from "../app-constants";

@Injectable({
    providedIn: 'root'
})
export class AccountsClient extends BaseApiClient {
    constructor(storageService: StorageService, storageCache: StorageCache,
        commonResponseCodeHandler: CommonResponseCodeHandler) {
        super(storageService, storageCache, commonResponseCodeHandler)
    }
    /**
     * @Dev Musaib
     * Login
     * @param tokenRequestSM
     * @returns 
     */
    GenerateToken = async (tokenRequestSM: ApiRequest<TokenRequestSM>): Promise<ApiResponse<TokenResponseSM>> => {
        let resp = await this.GetResponseAsync<TokenRequestSM, TokenResponseSM>
            (`${AppConstants.API_ENDPOINTS.AUTH_URL}ValidateLoginAndGenerateToken`, 'POST', tokenRequestSM,
                new AdditionalRequestDetails<TokenResponseSM>(false, Authentication.false));
        return resp;
    }
/**
 * @Musaib
 * Sign-Up
 * @param addUser
 * @returns 
 */
    // RegisterNewUser= async (addUser: ApiRequest<SignUpSM>): Promise<ApiResponse<FarmerSM>> => {
    //     let resp = await this.GetResponseAsync<SignUpSM,FarmerSM>(`${AppConstants.API_ENDPOINTS.ACCOUNT_URL}/Farmer/signUp`, "POST", addUser,
    //     new AdditionalRequestDetails<FarmerSM>(false, Authentication.false));
    //     return resp;
    //   };


}
