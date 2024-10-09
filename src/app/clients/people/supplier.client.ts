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
import { SupplierSM } from '../../models/service-models/app/v1/supplier-s-m';

@Injectable({
  providedIn: 'root',
})
export class SupplierClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }
  GetAllSupplier = async (queryFilter:QueryFilter): Promise<ApiResponse<SupplierSM[]>> => {
    let resp = await this.GetResponseAsync<null, SupplierSM[]>(`${AppConstants.API_ENDPOINTS.SUPPLIER}?skip=${queryFilter.skip}&top=${queryFilter.top}`, 'GET');
    return resp;
  };

  GetTotatSupplierCount = async (): Promise<ApiResponse<IntResponseRoot>> => {
    let resp = await this.GetResponseAsync<null, IntResponseRoot>(`${AppConstants.API_ENDPOINTS.SUPPLIER}/count`, 'GET');
    return resp;
  }
    GetSupplierById = async (Id: number): Promise<ApiResponse<SupplierSM>> => {
    let resp = await this.GetResponseAsync<number, SupplierSM>(
      `${AppConstants.API_ENDPOINTS.SUPPLIER}/${Id}`,
      'GET'
    );
    return resp;
  };
  AddSupplier = async (
    addSupplierSM: ApiRequest<SupplierSM>
  ): Promise<ApiResponse<SupplierSM>> => {
    let resp = await this.GetResponseAsync<SupplierSM, SupplierSM>(
      `${AppConstants.API_ENDPOINTS.SUPPLIER}`,
      'POST',
      addSupplierSM
    );
    return resp;
  };
 /**
   * Update existing SupplierSM
   * 
   * @param updateSupplierSM SupplierSM data to update
   * @returns Promise<ApiResponse<SupplierSM>>
   * @example
   * const updatedSupplierSM = new SupplierSM();
  
   */
  UpdateSupplier = async (
    updateSupplierSM: ApiRequest<SupplierSM>
  ): Promise<ApiResponse<SupplierSM>> => {
    let resp = await this.GetResponseAsync<SupplierSM, SupplierSM>(
      `${AppConstants.API_ENDPOINTS.SUPPLIER}/${updateSupplierSM.reqData.id}`,
      'PUT',
      updateSupplierSM
    );
    return resp;
  };
  /**delete SupplierSM by id */
  DeleteSupplierById = async (
    Id: number
  ): Promise<ApiResponse<DeleteResponseRoot>> => {
    let resp = await this.GetResponseAsync<number, DeleteResponseRoot>(
      `${AppConstants.API_ENDPOINTS.SUPPLIER}/${Id}`,
      'DELETE'
    );
    return resp;
  };

}
