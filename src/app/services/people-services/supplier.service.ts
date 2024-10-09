import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ApiResponse } from '../../models/service-models/foundation/api-contracts/base/api-response';
import { AppConstants } from '../../app-constants';
import { DeleteResponseRoot } from '../../models/service-models/foundation/common-response/delete-response-root';
import { ApiRequest } from '../../models/service-models/foundation/api-contracts/base/api-request';
import { QueryFilter } from '../../models/service-models/foundation/api-contracts/query-filter';
import { IntResponseRoot } from '../../models/service-models/foundation/common-response/int-response-root';
import { SupplierSM } from '../../models/service-models/app/v1/supplier-s-m';
import { SupplierClient } from '../../clients/people/supplier.client';
import { SupplierViewModel } from '../../models/view/end-user/people/supplier.viewmodel';


@Injectable({
  providedIn: 'root',
})
export class SupplierService extends BaseService {
  constructor(private SupplierClient: SupplierClient) {
    super();
  }

  /**
   * Retrieves all Units from the server.
   *
   * @returns A promise that resolves to an ApiResponse containing an array of SupplierSM objects.
   *
   * @throws Will throw an error if the server request fails.
   */
  async getAllSuppliers(viewModel:SupplierViewModel): Promise<ApiResponse<SupplierSM[]>> {
      let queryFilter = new QueryFilter();
      queryFilter.skip = (viewModel.pagination.PageNo - 1) * viewModel.pagination.PageSize;
      queryFilter.top = viewModel.pagination.PageSize
      return await this.SupplierClient.GetAllSupplier(queryFilter);
  }

  async getTotatSuppliersCount(): Promise<ApiResponse<IntResponseRoot>> {
    return await this.SupplierClient.GetTotatSupplierCount()
    }
  async deleteSupplier(id: number): Promise<ApiResponse<DeleteResponseRoot>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error);
    }
    return await this.SupplierClient.DeleteSupplierById(id);
  }

  async getSupplierById(id: number): Promise<ApiResponse<SupplierSM>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error);
    }
    return await this.SupplierClient.GetSupplierById(id);
  }

  async addSupplier(warehouseData: SupplierSM): Promise<ApiResponse<SupplierSM>> {
    if (!warehouseData) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<SupplierSM>();
      apiRequest.reqData = warehouseData;
      return await this.SupplierClient.AddSupplier(apiRequest);
    }
  }
  async updateSupplier(UnitData: SupplierSM): Promise<ApiResponse<SupplierSM>> {
    if (!UnitData) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<SupplierSM>();
      apiRequest.reqData = UnitData;
      return await this.SupplierClient.UpdateSupplier(apiRequest);
    }
  }
}
