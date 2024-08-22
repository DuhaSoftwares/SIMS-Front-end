import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { BaseApiClient } from './base-client/base-api.client';
import { CommonResponseCodeHandler } from './helpers/common-response-code-handler.helper';
import { StorageCache } from './helpers/storage-cache.helper';
import { QueryFilter } from '../models/service-models/foundation/api-contracts/query-filter';
import { ApiResponse } from '../models/service-models/foundation/api-contracts/base/api-response';
import { DummyTeacherSM } from '../models/service-models/app/v1/dummy-teacher-s-m';
import { AppConstants } from '../app-constants';
import { ApiRequest } from '../models/service-models/foundation/api-contracts/base/api-request';
import { DeleteResponseRoot } from '../models/service-models/foundation/common-response/delete-response-root';
import { WareHouseSM } from '../models/service-models/app/v1/warehouse-s-m';

@Injectable({
  providedIn: 'root',
})
export class WarehouseClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }

  /**Get all Warehouses */
  GetAllWarehouses = async (): Promise<ApiResponse<WareHouseSM[]>> => {
    let resp = await this.GetResponseAsync<number, WareHouseSM[]>(
      `${AppConstants.API_ENDPOINTS.WAREHOUSE}`,
      'GET'
    );
    return resp;
  };
}
