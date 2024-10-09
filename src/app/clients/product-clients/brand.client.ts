import { Injectable } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { BaseApiClient } from '../base-client/base-api.client';
import { CommonResponseCodeHandler } from '../helpers/common-response-code-handler.helper';
import { StorageCache } from '../helpers/storage-cache.helper';
import { ApiResponse } from '../../models/service-models/foundation/api-contracts/base/api-response';
import { AppConstants } from '../../app-constants';
import { ApiRequest } from '../../models/service-models/foundation/api-contracts/base/api-request';
import { DeleteResponseRoot } from '../../models/service-models/foundation/common-response/delete-response-root';
import { BrandSM } from '../../models/service-models/app/v1/brand-s-m';
import { QueryFilter } from '../../models/service-models/foundation/api-contracts/query-filter';
import { IntResponseRoot } from '../../models/service-models/foundation/common-response/int-response-root';
@Injectable({
  providedIn: 'root',
})
export class BrandClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }
  GetAllBrands = async (queryFilter:QueryFilter): Promise<ApiResponse<BrandSM[]>> => {
    let resp = await this.GetResponseAsync<null, BrandSM[]>(`${AppConstants.API_ENDPOINTS.BRAND}?skip=${queryFilter.skip}&top=${queryFilter.top}`, 'GET');
    return resp;
  };

  GetTotatBrandsCount = async (): Promise<ApiResponse<IntResponseRoot>> => {
    let resp = await this.GetResponseAsync<null, IntResponseRoot>(`${AppConstants.API_ENDPOINTS.BRAND}/count`, 'GET');
    return resp;
  }
    GetBrandById = async (Id: number): Promise<ApiResponse<BrandSM>> => {
    let resp = await this.GetResponseAsync<number, BrandSM>(
      `${AppConstants.API_ENDPOINTS.BRAND}/${Id}`,
      'GET'
    );
    return resp;
  };
  AddBrand = async (
    addBrand: ApiRequest<BrandSM>
  ): Promise<ApiResponse<BrandSM>> => {
    let resp = await this.GetResponseAsync<BrandSM, BrandSM>(
      `${AppConstants.API_ENDPOINTS.BRAND}`,
      'POST',
      addBrand
    );
    return resp;
  };
 /**
   * Update existing brand
   * 
   * @param updateBrand Brand data to update
   * @returns Promise<ApiResponse<BrandSM>>
   * @example
   * const updatedBrand = new BrandSM();
  
   */
  UpdateBrand = async (
    updateBrand: ApiRequest<BrandSM>
  ): Promise<ApiResponse<BrandSM>> => {
    let resp = await this.GetResponseAsync<BrandSM, BrandSM>(
      `${AppConstants.API_ENDPOINTS.BRAND}/${updateBrand.reqData.id}`,
      'PUT',
      updateBrand
    );
    return resp;
  };
  /**delete brand by id */
  DeleteBrandById = async (
    Id: number
  ): Promise<ApiResponse<DeleteResponseRoot>> => {
    let resp = await this.GetResponseAsync<number, DeleteResponseRoot>(
      `${AppConstants.API_ENDPOINTS.BRAND}/${Id}`,
      'DELETE'
    );
    return resp;
  };




 
}
