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
import { UnitsSM } from '../../models/service-models/app/v1/units-s-m';
@Injectable({
  providedIn: 'root',
})
export class UnitsClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }
  GetAllUnits = async (queryFilter:QueryFilter): Promise<ApiResponse<UnitsSM[]>> => {
    let resp = await this.GetResponseAsync<null, UnitsSM[]>(`${AppConstants.API_ENDPOINTS.UNITS}?skip=${queryFilter.skip}&top=${queryFilter.top}`, 'GET');
    return resp;
  };

  GetTotatUnitsCount = async (): Promise<ApiResponse<IntResponseRoot>> => {
    let resp = await this.GetResponseAsync<null, IntResponseRoot>(`${AppConstants.API_ENDPOINTS.UNITS}/count`, 'GET');
    return resp;
  }
    GetUnitsById = async (Id: number): Promise<ApiResponse<UnitsSM>> => {
    let resp = await this.GetResponseAsync<number, UnitsSM>(
      `${AppConstants.API_ENDPOINTS.UNITS}/${Id}`,
      'GET'
    );
    return resp;
  };
  AddUnits = async (
    addUnitsSM: ApiRequest<UnitsSM>
  ): Promise<ApiResponse<UnitsSM>> => {
    let resp = await this.GetResponseAsync<UnitsSM, UnitsSM>(
      `${AppConstants.API_ENDPOINTS.UNITS}`,
      'POST',
      addUnitsSM
    );
    return resp;
  };
 /**
   * Update existing UnitsSM
   * 
   * @param updateUnitsSM UnitsSM data to update
   * @returns Promise<ApiResponse<UnitsSM>>
   * @example
   * const updatedUnitsSM = new UnitsSM();
  
   */
  UpdateUnits = async (
    updateUnitsSM: ApiRequest<UnitsSM>
  ): Promise<ApiResponse<UnitsSM>> => {
    let resp = await this.GetResponseAsync<UnitsSM, UnitsSM>(
      `${AppConstants.API_ENDPOINTS.UNITS}/${updateUnitsSM.reqData.id}`,
      'PUT',
      updateUnitsSM
    );
    return resp;
  };
  /**delete UnitsSM by id */
  DeleteUnitsById = async (
    Id: number
  ): Promise<ApiResponse<DeleteResponseRoot>> => {
    let resp = await this.GetResponseAsync<number, DeleteResponseRoot>(
      `${AppConstants.API_ENDPOINTS.UNITS}/${Id}`,
      'DELETE'
    );
    return resp;
  };




 
}
