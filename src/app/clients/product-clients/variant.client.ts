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
import { VariantsSM } from '../../models/service-models/app/v1/variants-s-m';

@Injectable({
  providedIn: 'root',
})
export class VariantClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }
  GetAllVariants = async (queryFilter:QueryFilter): Promise<ApiResponse<VariantsSM[]>> => {
    let resp = await this.GetResponseAsync<null, VariantsSM[]>(`${AppConstants.API_ENDPOINTS.VARIANTS}?skip=${queryFilter.skip}&top=${queryFilter.top}`, 'GET');
    return resp;
  };

  GetTotatVariantsCount = async (): Promise<ApiResponse<IntResponseRoot>> => {
    let resp = await this.GetResponseAsync<null, IntResponseRoot>(`${AppConstants.API_ENDPOINTS.VARIANTS}/count`, 'GET');
    return resp;
  }
    GetVariantsById = async (Id: number): Promise<ApiResponse<VariantsSM>> => {
    let resp = await this.GetResponseAsync<number, VariantsSM>(
      `${AppConstants.API_ENDPOINTS.VARIANTS}/${Id}`,
      'GET'
    );
    return resp;
  };
  AddVariants = async (
    addVariantsSM: ApiRequest<VariantsSM>
  ): Promise<ApiResponse<VariantsSM>> => {
    let resp = await this.GetResponseAsync<VariantsSM, VariantsSM>(
      `${AppConstants.API_ENDPOINTS.VARIANTS}`,
      'POST',
      addVariantsSM
    );
    return resp;
  };
 /**
   * Update existing VariantsSM
   * 
   * @param updateVariantsSM VariantsSM data to update
   * @returns Promise<ApiResponse<VariantsSM>>
   * @example
   * const updatedVariantsSM = new VariantsSM();
  
   */
  UpdateVariants = async (
    updateVariantsSM: ApiRequest<VariantsSM>
  ): Promise<ApiResponse<VariantsSM>> => {
    let resp = await this.GetResponseAsync<VariantsSM, VariantsSM>(
      `${AppConstants.API_ENDPOINTS.VARIANTS}/${updateVariantsSM.reqData.level1Variant.id}`,
      'PUT',
      updateVariantsSM
    );
    return resp;
  };
  /**delete VariantsSM by id */
  DeleteVariantsById = async (
    Id: number
  ): Promise<ApiResponse<DeleteResponseRoot>> => {
    let resp = await this.GetResponseAsync<number, DeleteResponseRoot>(
      `${AppConstants.API_ENDPOINTS.VARIANTS}/${Id}`,
      'DELETE'
    );
    return resp;
  };




 
}
