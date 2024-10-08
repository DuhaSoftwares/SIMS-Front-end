import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { BaseApiClient } from './base-client/base-api.client';
import { CommonResponseCodeHandler } from './helpers/common-response-code-handler.helper';
import { StorageCache } from './helpers/storage-cache.helper';
import { ApiResponse } from '../models/service-models/foundation/api-contracts/base/api-response';
import { AppConstants } from '../app-constants';
import { ApiRequest } from '../models/service-models/foundation/api-contracts/base/api-request';
import { DeleteResponseRoot } from '../models/service-models/foundation/common-response/delete-response-root';
import { QueryFilter } from '../models/service-models/foundation/api-contracts/query-filter';
import { IntResponseRoot } from '../models/service-models/foundation/common-response/int-response-root';
import { ProductCategorySM } from '../models/service-models/app/v1/product-category-s-m';
import { CategoriesSM } from '../models/service-models/app/v1/categories-s-m';
@Injectable({
  providedIn: 'root',
})
export class CategoryClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }
  GetAllCategory = async (
    queryFilter: QueryFilter
  ): Promise<ApiResponse<CategoriesSM[]>> => {
    let resp = await this.GetResponseAsync<null, CategoriesSM[]>(
      `${AppConstants.API_ENDPOINTS.CATEGORY}?skip=${queryFilter.skip}&top=${queryFilter.top}`,
      'GET'
    );
    return resp;
  };

  GetTotatCategoryCount = async (): Promise<ApiResponse<IntResponseRoot>> => {
    let resp = await this.GetResponseAsync<null, IntResponseRoot>(
      `${AppConstants.API_ENDPOINTS.CATEGORY}/count`,
      'GET'
    );
    return resp;
  };

  /**delete brand by id */
  DeleteCategoryById = async (
    Id: number
  ): Promise<ApiResponse<DeleteResponseRoot>> => {
    let resp = await this.GetResponseAsync<number, DeleteResponseRoot>(
      `${AppConstants.API_ENDPOINTS.CATEGORY}/${Id}`,
      'DELETE'
    );
    return resp;
  };

  GetCategoryById = async (
    Id: number
  ): Promise<ApiResponse<ProductCategorySM>> => {
    let resp = await this.GetResponseAsync<number, ProductCategorySM>(
      `${AppConstants.API_ENDPOINTS.CATEGORY}/${Id}`,
      'GET'
    );
    return resp;
  };

  AddCategory = async (
    addCategory: ApiRequest<ProductCategorySM>
  ): Promise<ApiResponse<ProductCategorySM>> => {
    let resp = await this.GetResponseAsync<
      ProductCategorySM,
      ProductCategorySM
    >(`${AppConstants.API_ENDPOINTS.CATEGORY}`, 'POST', addCategory);
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
  UpdateCategory = async (
    updatecategoryData: ApiRequest<ProductCategorySM>
  ): Promise<ApiResponse<ProductCategorySM>> => {
    let resp = await this.GetResponseAsync<
      ProductCategorySM,
      ProductCategorySM
    >(
      `${AppConstants.API_ENDPOINTS.CATEGORY}/${updatecategoryData.reqData.id}`,
      'PUT',
      updatecategoryData
    );
    return resp;
  };
}
