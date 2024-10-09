import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ApiResponse } from '../../models/service-models/foundation/api-contracts/base/api-response';
import { AppConstants } from '../../app-constants';
import { DeleteResponseRoot } from '../../models/service-models/foundation/common-response/delete-response-root';
import { ApiRequest } from '../../models/service-models/foundation/api-contracts/base/api-request';
import { QueryFilter } from '../../models/service-models/foundation/api-contracts/query-filter';
import { IntResponseRoot } from '../../models/service-models/foundation/common-response/int-response-root';
import { VariantClient } from '../../clients/product-clients/variant.client';
import { VariantsSM } from '../../models/service-models/app/v1/variants-s-m';
import { VariantViewModel } from '../../models/view/end-user/product/variant.viewmodel';


@Injectable({
  providedIn: 'root',
})
export class VariantService extends BaseService {
  constructor(private variantClient: VariantClient) {
    super();
  }

  /**
   * Retrieves all Variants from the server.
   *
   * @returns A promise that resolves to an ApiResponse containing an array of VariantsSM objects.
   *
   * @throws Will throw an error if the server request fails.
   */
  async getAllVariants(viewModel:VariantViewModel): Promise<ApiResponse<VariantsSM[]>> {
      let queryFilter = new QueryFilter();
      queryFilter.skip = (viewModel.pagination.PageNo - 1) * viewModel.pagination.PageSize;
      queryFilter.top = viewModel.pagination.PageSize
      return await this.variantClient.GetAllVariants(queryFilter);
  }

  async getTotatVariantsCount(): Promise<ApiResponse<IntResponseRoot>> {
    return await this.variantClient.GetTotatVariantsCount()
    }
  async deleteVariant(id: number): Promise<ApiResponse<DeleteResponseRoot>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error);
    }
    return await this.variantClient.DeleteVariantsById(id);
  }

  async getVariantById(id: number): Promise<ApiResponse<VariantsSM>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error);
    }
    return await this.variantClient.GetVariantsById(id);
  }

  async addVariant(warehouseData: VariantsSM): Promise<ApiResponse<VariantsSM>> {
    if (!warehouseData) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<VariantsSM>();
      apiRequest.reqData = warehouseData;
      return await this.variantClient.AddVariants(apiRequest);
    }
  }
  async updateVariant(brandData: VariantsSM): Promise<ApiResponse<VariantsSM>> {
    if (!brandData) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<VariantsSM>();
      apiRequest.reqData = brandData;
      return await this.variantClient.UpdateVariants(apiRequest);
    }
  }
}
