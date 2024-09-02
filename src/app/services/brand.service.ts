import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiResponse } from '../models/service-models/foundation/api-contracts/base/api-response';
import { AppConstants } from '../app-constants';
import { DeleteResponseRoot } from '../models/service-models/foundation/common-response/delete-response-root';
import { ApiRequest } from '../models/service-models/foundation/api-contracts/base/api-request';
import { BrandClient } from '../clients/brand.client';
import { BrandSM } from '../models/service-models/app/v1/brand-s-m';

@Injectable({
  providedIn: 'root',
})
export class BrandService extends BaseService {
  constructor(private brandClient: BrandClient) {
    super();
  }

  /**
   * Retrieves all brands from the server.
   *
   * @returns A promise that resolves to an ApiResponse containing an array of BrandSM objects.
   *
   * @throws Will throw an error if the server request fails.
   */
  async getAllBrands(): Promise<ApiResponse<BrandSM[]>> {
    return await this.brandClient.GetAllBrand();
  }

  async deleteBrand(id: number): Promise<ApiResponse<DeleteResponseRoot>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error);
    }
    return await this.brandClient.DeleteBrandById(id);
  }

  async getBrandById(id: number): Promise<ApiResponse<BrandSM>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error);
    }
    return await this.brandClient.GetBrandById(id);
  }

  async addBrand(warehouseData: BrandSM): Promise<ApiResponse<BrandSM>> {
    if (!warehouseData) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<BrandSM>();
      apiRequest.reqData = warehouseData;
      return await this.brandClient.AddBrand(apiRequest);
    }
  }
  async updateBrand(brandData: BrandSM): Promise<ApiResponse<BrandSM>> {
    if (!brandData) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<BrandSM>();
      apiRequest.reqData = brandData;
      return await this.brandClient.UpdateBrand(apiRequest);
    }
  }
}