import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ApiResponse } from '../../models/service-models/foundation/api-contracts/base/api-response';
import { AppConstants } from '../../app-constants';
import { DeleteResponseRoot } from '../../models/service-models/foundation/common-response/delete-response-root';
import { ApiRequest } from '../../models/service-models/foundation/api-contracts/base/api-request';
import { QueryFilter } from '../../models/service-models/foundation/api-contracts/query-filter';
import { IntResponseRoot } from '../../models/service-models/foundation/common-response/int-response-root';
import { UnitsViewModel } from '../../models/view/end-user/product/units.viewmodel';
import { CustomerClient } from '../../clients/people/customer.client';
import { CustomerSM } from '../../models/service-models/app/v1/customer-s-m.ts';
import { CustomerViewModel } from '../../models/view/end-user/people/customer.viewmodel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService {
  constructor(private customerClient: CustomerClient) {
    super();
  }

  /**
   * Retrieves all Units from the server.
   *
   * @returns A promise that resolves to an ApiResponse containing an array of CustomerSM objects.
   *
   * @throws Will throw an error if the server request fails.
   */
  async getAllCustomers(viewModel:CustomerViewModel): Promise<ApiResponse<CustomerSM[]>> {
      let queryFilter = new QueryFilter();
      queryFilter.skip = (viewModel.pagination.PageNo - 1) * viewModel.pagination.PageSize;
      queryFilter.top = viewModel.pagination.PageSize
      return await this.customerClient.GetAllCustomer(queryFilter);
  }

  async getTotatCustomersCount(): Promise<ApiResponse<IntResponseRoot>> {
    return await this.customerClient.GetTotatCustomerCount()
    }
  async deleteCustomer(id: number): Promise<ApiResponse<DeleteResponseRoot>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error);
    }
    return await this.customerClient.DeleteCustomerById(id);
  }

  async getCustomerById(id: number): Promise<ApiResponse<CustomerSM>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error);
    }
    return await this.customerClient.GetCustomerById(id);
  }

  async addCustomer(warehouseData: CustomerSM): Promise<ApiResponse<CustomerSM>> {
    if (!warehouseData) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<CustomerSM>();
      apiRequest.reqData = warehouseData;
      return await this.customerClient.AddCustomer(apiRequest);
    }
  }
  async updateCustomer(UnitData: CustomerSM): Promise<ApiResponse<CustomerSM>> {
    if (!UnitData) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<CustomerSM>();
      apiRequest.reqData = UnitData;
      return await this.customerClient.UpdateCustomer(apiRequest);
    }
  }
}
