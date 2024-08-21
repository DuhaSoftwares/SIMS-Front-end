import { Injectable } from '@angular/core';
import { AccountsClient } from '../clients/accounts.client';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';
import { TokenRequestSM } from '../models/service-models/app/token/token-request-s-m';
import { ApiRequest } from '../models/service-models/foundation/api-contracts/base/api-request';
import { ApiResponse } from '../models/service-models/foundation/api-contracts/base/api-response';
import { TokenResponseSM } from '../models/service-models/app/token/token-response-s-m';
import { SignUpSM } from '../models/service-models/app/v1/app-users/login/sign-up-s-m';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';


@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  constructor(private accountClient: AccountsClient, private storageService: StorageService,private router:Router) {
    super();
  }
/**
 * @Musaib
 * Post login Credenuials
 * @param tokenReq
 * @param rememberUser 
 * @returns  Token
 */
  async generateToken(tokenReq: TokenRequestSM, rememberUser: boolean): Promise<ApiResponse<TokenResponseSM>> {
    if (!tokenReq || !tokenReq.loginId)// null checks
    {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    }
    else {
      let apiRequest = new ApiRequest<TokenRequestSM>();
      apiRequest.reqData = tokenReq;
      let resp =await this.accountClient.GenerateToken(apiRequest);
      // let resp = this.getDummyTokenResp(tokenReq);
      if (!resp.isError && resp.successData != null) {
        this.storageService.saveToStorage(AppConstants.DATABASE_KEYS.REMEMBER_PWD, rememberUser);
        if (rememberUser) {
          this.storageService.saveToStorage(AppConstants.DATABASE_KEYS.ACCESS_TOKEN, resp.successData.accessToken);
          this.storageService.saveToStorage(AppConstants.DATABASE_KEYS.LOGIN_USER, resp.successData.loginUserDetails);
          this.storageService.saveToStorage(AppConstants.DATABASE_KEYS.COMPANY_CODE, tokenReq.companyCode);
        }
        else {
          this.storageService.saveToSessionStorage(AppConstants.DATABASE_KEYS.ACCESS_TOKEN, resp.successData.accessToken);
          this.storageService.saveToSessionStorage(AppConstants.DATABASE_KEYS.LOGIN_USER, resp.successData.loginUserDetails);
          // this.storageService.saveToSessionStorage(AppConstants.DATABASE_KEYS.COMPANY_CODE, tokenReq.companyCode);
        }
      }
      return resp;
    }
  }


/**
 * Get Token from localStorage
 * @returns
 */
  async getTokenFromStorage(): Promise<string> {
    let remMe: boolean = await this.storageService.getFromStorage(
      AppConstants.DATABASE_KEYS.REMEMBER_PWD
    );
    if (remMe && remMe == true)
      return await this.storageService.getFromStorage(
        AppConstants.DATABASE_KEYS.ACCESS_TOKEN
      );
    return await this.storageService.getFromSessionStorage(
      AppConstants.DATABASE_KEYS.ACCESS_TOKEN
    );
  }
/**
 * Register New User
 * @param user
 * @returns 
//  */
//   async RegisterNewUser(user:SignUpSM): Promise<ApiResponse<SignUpSM>> {
//     let apiRequest = new ApiRequest<SignUpSM>();
//     apiRequest.reqData =user;
//     return await this.accountClient.RegisterNewUser(apiRequest);
//   }

/**
 * Logout Use
 *  Clear all data in the local storage and redirect to login page
 */
  async logoutUser() {
    try {
      this.storageService.removeFromSessionStorage(AppConstants.DATABASE_KEYS.ACCESS_TOKEN);
      this.storageService.removeFromSessionStorage(AppConstants.DATABASE_KEYS.LOGIN_USER);
      this.storageService.removeFromSessionStorage(AppConstants.DATABASE_KEYS.COMPANY_CODE);
      this.storageService.removeFromSessionStorage(AppConstants.DATABASE_KEYS.REMEMBER_PWD);
      this.router.navigate(["login"]);
    }
    catch (err) {
      this.storageService.clearSessionStorage();
    }
    try {
      this.storageService.removeFromStorage(AppConstants.DATABASE_KEYS.ACCESS_TOKEN);
      this.storageService.removeFromStorage(AppConstants.DATABASE_KEYS.LOGIN_USER);
      this.storageService.removeFromStorage(AppConstants.DATABASE_KEYS.COMPANY_CODE);
      this.storageService.removeFromStorage(AppConstants.DATABASE_KEYS.REMEMBER_PWD);
      this.router.navigate(["login"]);
    } catch (error) {
      this.storageService.clearStorage();
    }
  }
}
