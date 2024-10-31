import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/components/internal/other-components/base.component';
import { CustomerSM } from 'src/app/models/service-models/app/v1/customer-s-m.ts';
import { CustomerViewModel } from 'src/app/models/view/end-user/people/customer.viewmodel';
import { CommonService } from 'src/app/services/common.service';
import { LogHandlerService } from 'src/app/services/log-handler.service';
import { CustomerService } from 'src/app/services/people-services/customer.service';
import { SharedModule } from 'src/app/shared/shared.module';


@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends BaseComponent<CustomerViewModel> implements OnInit{
  constructor(commonService: CommonService, exceptionHandler: LogHandlerService,private customerService:CustomerService, private fb: FormBuilder) {
    super(commonService, exceptionHandler)
    this.viewModel=new CustomerViewModel()
  }
  displayedColumns: string[] = ['customer','symbol', 'Action'];
  customerForm!: FormGroup;
  ngOnInit(): void {
    this.loadPageData();
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      symbol: ['',[Validators.required, Validators.minLength(1)]],
    });
  }
  // Dark Mode

   /**
     * Retrieves all customers from the server and updates the component's view model.
     */
  override async loadPageData() {
    try {
      this._commonService.presentLoading();
     await this.getTotatcustomersCount()
      let resp = await this.customerService.getAllCustomers(this.viewModel);
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.customers = resp.successData;
        console.log(this.viewModel.customers)
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }


  async getTotatcustomersCount() {
    try {
      await this._commonService.presentLoading();
      let resp = await this.customerService.getTotatCustomersCount();
      if (resp.isError) {
        await this._exceptionHandler.logObject(resp.errorData);
        this._commonService.showSweetAlertToast({
          title: 'Error!',
          text: resp.errorData.displayMessage,
          position: 'top-end',
          icon: 'error'
        });
      } else {
        this.viewModel.pagination.totalCount = resp.successData.intResponse;
      }
    } catch (error) {
    } finally {
      await this._commonService.dismissLoader();
    }
  }
  async getcustomerById(id: number) {
    try {
      this._commonService.presentLoading();
      this.viewModel.updateMode = true;
      const resp = await this.customerService.getCustomerById(id);
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.customer = resp.successData;
        this.customerForm.patchValue({
          name: this.viewModel.customer.name,
          // symbol: this.viewModel.customer.symbol,
         });
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async deletecustomerById(id: number) {
    try {
      this._commonService.presentLoading();
      const result = await this._commonService.showSweetAlertConfirmation({
        text: 'Are you sure you want to delete this customer?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        const resp = await this.customerService.deleteCustomer(id);

        if (resp.isError) {
          await this._commonService.showSweetAlertConfirmation({
            text: resp.errorData.displayMessage,
            icon: 'error',
          });
        } else {
          await this.loadPageData();
          await this._commonService.showSweetAlertConfirmation({
            text: 'Deleted successfully!',
            icon: 'success',
          });
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
    } else {
      try {
        if (this.viewModel.updateMode) {
          this._commonService.presentLoading();
          this.viewModel.customer.name = this.customerForm.get('name')?.value;
            // this.viewModel.customer.symbol = this.customerForm.get('symbol')?.value;
          this.updatecustomer(this.viewModel.customer);
        } else {
          this._commonService.presentLoading();
          const formData = new FormData();
          this.viewModel.customer.name = this.customerForm.get('name')?.value;
            // this.viewModel.customer.symbol = this.customerForm.get('symbol')?.value;

          this.addcustomer(this.viewModel.customer);
        }
      } catch (error) {
        throw error;
      } finally {
        this._commonService.dismissLoader();
      }
    }
  }
  async addcustomer(data: CustomerSM) {
    try {
      this._commonService.presentLoading();
      if (data) {
        let resp = await this.customerService.addCustomer(data);
        if (resp.isError) {
          this._commonService.showSweetAlertConfirmation({
            text: resp.errorData.displayMessage,
            icon: 'error',
            title: 'Error',
          });
        } else {
          await this.loadPageData();
          this.viewModel.updateMode = false;
          await this._commonService.showSweetAlertConfirmation({
            text: 'customer added successfully!',
            icon: 'success',
          });
          this.customerForm.reset();
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async updatecustomer(data: CustomerSM) {
    try {
      this._commonService.presentLoading();
      if (data) {
        let resp = await this.customerService.updateCustomer(data);
        if (resp.isError) {
          this._commonService.showSweetAlertConfirmation({
            text: resp.errorData.displayMessage,
            icon: 'error',
            title: 'Error',
          });
        } else {
          await this.loadPageData();
          this.viewModel.updateMode = false;
          await this._commonService.showSweetAlertConfirmation({
            text: 'customer Updated successfully!',
            icon: 'success',
          });
          this.customerForm.reset({ emitEvent: true });
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

// Define the totalItems variable, typically set when data is loaded from the API

// async onPageChange(event: PageEvent) {
//   const pageIndex = event.pageIndex;
//   const pageSize = event.pageSize;
//   // Calculate the correct page number (since Angular Material uses 0-based index)
//   const pageNumber = pageIndex + 1;
//   // Update pagination details
//   this.viewModel.pagination.PageNo = pageNumber;
//   this.viewModel.pagination.PageSize = pageSize;
//   // Load the data for the selected page
//   await this.loadPageDataWithPagination(pageNumber);
// }

async loadPageDataWithPagination(pageNumber: number) {
  if (pageNumber && pageNumber > 0) {
    this.viewModel.pagination.PageNo = pageNumber;
    await this.loadPageData();
  }
}
}

