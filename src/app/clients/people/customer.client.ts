import { Injectable } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { BaseApiClient } from '../base-client/base-api.client';
import { CommonResponseCodeHandler } from '../helpers/common-response-code-handler.helper';
import { StorageCache } from '../helpers/storage-cache.helper';
import { ApiResponse } from '../../models/service-models/foundation/api-contracts/base/api-response';
import { AppConstants } from '../../app-constants';
import { ApiRequest } from '../../models/service-models/foundation/api-contracts/base/api-request';
import { DeleteResponseRoot } from '../../models/service-models/foundation/common-response/delete-response-root';
import { QueryFilter } from '../../models/service-models/foundation/api-contracts/query-filter';
import { IntResponseRoot } from '../../models/service-models/foundation/common-response/int-response-root';
import { CustomerSM } from '../../models/service-models/app/v1/customer-s-m.ts';

@Injectable({
  providedIn: 'root',
})
export class CustomerClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }
  GetAllCustomer = async (queryFilter:QueryFilter): Promise<ApiResponse<CustomerSM[]>> => {
    let resp = await this.GetResponseAsync<null, CustomerSM[]>(`${AppConstants.API_ENDPOINTS.CUSTOMER}?skip=${queryFilter.skip}&top=${queryFilter.top}`, 'GET');
    return resp;
  };

  GetTotatCustomerCount = async (): Promise<ApiResponse<IntResponseRoot>> => {
    let resp = await this.GetResponseAsync<null, IntResponseRoot>(`${AppConstants.API_ENDPOINTS.CUSTOMER}/count`, 'GET');
    return resp;
  }
    GetCustomerById = async (Id: number): Promise<ApiResponse<CustomerSM>> => {
    let resp = await this.GetResponseAsync<number, CustomerSM>(
      `${AppConstants.API_ENDPOINTS.CUSTOMER}/${Id}`,
      'GET'
    );
    return resp;
  };
  AddCustomer = async (
    addCustomerSM: ApiRequest<CustomerSM>
  ): Promise<ApiResponse<CustomerSM>> => {
    let resp = await this.GetResponseAsync<CustomerSM, CustomerSM>(
      `${AppConstants.API_ENDPOINTS.CUSTOMER}`,
      'POST',
      addCustomerSM
    );
    return resp;
  };
 /**
   * Update existing CustomerSM
   * 
   * @param updateCustomerSM CustomerSM data to update
   * @returns Promise<ApiResponse<CustomerSM>>
   * @example
   * const updatedCustomerSM = new CustomerSM();
  
   */
  UpdateCustomer = async (
    updateCustomerSM: ApiRequest<CustomerSM>
  ): Promise<ApiResponse<CustomerSM>> => {
    let resp = await this.GetResponseAsync<CustomerSM, CustomerSM>(
      `${AppConstants.API_ENDPOINTS.CUSTOMER}/${updateCustomerSM.reqData.id}`,
      'PUT',
      updateCustomerSM
    );
    return resp;
  };
  /**delete CustomerSM by id */
  DeleteCustomerById = async (
    Id: number
  ): Promise<ApiResponse<DeleteResponseRoot>> => {
    let resp = await this.GetResponseAsync<number, DeleteResponseRoot>(
      `${AppConstants.API_ENDPOINTS.CUSTOMER}/${Id}`,
      'DELETE'
    );
    return resp;
  };

}
