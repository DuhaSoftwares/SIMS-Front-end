import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ApiResponse } from '../../models/service-models/foundation/api-contracts/base/api-response';
import { AppConstants } from '../../app-constants';
import { DeleteResponseRoot } from '../../models/service-models/foundation/common-response/delete-response-root';
import { ApiRequest } from '../../models/service-models/foundation/api-contracts/base/api-request';
import { QueryFilter } from '../../models/service-models/foundation/api-contracts/query-filter';
import { IntResponseRoot } from '../../models/service-models/foundation/common-response/int-response-root';
import { UnitsClient } from '../../clients/product-clients/units.client';
import { UnitsSM } from '../../models/service-models/app/v1/units-s-m';
import { UnitsViewModel } from '../../models/view/end-user/product/units.viewmodel';

@Injectable({
  providedIn: 'root',
})
export class UnitService extends BaseService {
  constructor(private unitClient: UnitsClient) {
    super();
  }

  /**
   * Retrieves all Units from the server.
   *
   * @returns A promise that resolves to an ApiResponse containing an array of UnitsSM objects.
   *
   * @throws Will throw an error if the server request fails.
   */
  async getAllUnits(viewModel:UnitsViewModel): Promise<ApiResponse<UnitsSM[]>> {
      let queryFilter = new QueryFilter();
      queryFilter.skip = (viewModel.pagination.PageNo - 1) * viewModel.pagination.PageSize;
      queryFilter.top = viewModel.pagination.PageSize
      return await this.unitClient.GetAllUnits(queryFilter);
  }

  async getTotatUnitsCount(): Promise<ApiResponse<IntResponseRoot>> {
    return await this.unitClient.GetTotatUnitsCount()
    }
  async deleteUnit(id: number): Promise<ApiResponse<DeleteResponseRoot>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error);
    }
    return await this.unitClient.DeleteUnitsById(id);
  }

  async getUnitById(id: number): Promise<ApiResponse<UnitsSM>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error);
    }
    return await this.unitClient.GetUnitsById(id);
  }

  async addUnit(warehouseData: UnitsSM): Promise<ApiResponse<UnitsSM>> {
    if (!warehouseData) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<UnitsSM>();
      apiRequest.reqData = warehouseData;
      return await this.unitClient.AddUnits(apiRequest);
    }
  }
  async updateUnit(UnitData: UnitsSM): Promise<ApiResponse<UnitsSM>> {
    if (!UnitData) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<UnitsSM>();
      apiRequest.reqData = UnitData;
      return await this.unitClient.UpdateUnits(apiRequest);
    }
  }
}
