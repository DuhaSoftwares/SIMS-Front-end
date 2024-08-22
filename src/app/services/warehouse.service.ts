import { Injectable } from '@angular/core';
import { AccountsClient } from '../clients/accounts.client';
import { BaseService } from './base.service';
import { ApiResponse } from '../models/service-models/foundation/api-contracts/base/api-response';
import { WareHouseSM } from '../models/service-models/app/v1/warehouse-s-m';
import { WarehouseClient } from '../clients/warehouse.client';
import { AppConstants } from '../app-constants';
import { DeleteResponseRoot } from '../models/service-models/foundation/common-response/delete-response-root';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService extends BaseService {
  constructor(
    private accountClient: AccountsClient,
    private warehouseClient: WarehouseClient
  ) {
    super();
  }

  async getAllWarehouses(): Promise<ApiResponse<WareHouseSM[]>> {
    return await this.warehouseClient.GetAllWarehouses();
  }

  async deleteWarehouse(id: number): Promise<ApiResponse<DeleteResponseRoot>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error);
    }
    return await this.warehouseClient.DeleteWarehouseById(id);
  }
}
