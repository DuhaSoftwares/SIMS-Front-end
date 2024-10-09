import { Component, OnInit } from '@angular/core';
import { SupplierViewModel } from '../../../models/view/end-user/people/supplier.viewmodel';
import { BaseComponent } from '../../../internal-components/other-components/base.component';
import { CommonService } from '../../../services/common.service';
import { LogHandlerService } from '../../../services/log-handler.service';
import { SupplierService } from '../../../services/people-services/supplier.service';
import { CustomizerSettingsService } from '../../../internal-components/customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierSM } from '../../../models/service-models/app/v1/supplier-s-m';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-suplier',
  standalone: true,
  imports: [],
  templateUrl: './suplier.component.html',
  styleUrl: './suplier.component.scss'
})
export class SuplierComponent extends BaseComponent<SupplierViewModel> implements OnInit{
  constructor(commonService: CommonService, exceptionHandler: LogHandlerService,private SupplierService:SupplierService, public themeService: CustomizerSettingsService, private fb: FormBuilder) {
    super(commonService, exceptionHandler)
    this.viewModel=new SupplierViewModel()
  }
  displayedColumns: string[] = ['Supplier','symbol', 'Action'];
  SupplierForm!: FormGroup;
  ngOnInit(): void {
    this.loadPageData();
    this.SupplierForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      symbol: ['',[Validators.required, Validators.minLength(1)]],
    });
  }
  // Dark Mode
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
   /**
     * Retrieves all Suppliers from the server and updates the component's view model.
     */
  override async loadPageData() {
    try {
      this._commonService.presentLoading();
     await this.getTotatSuppliersCount()
      let resp = await this.SupplierService.getAllSuppliers(this.viewModel);
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.Suppliers = resp.successData;
        console.log(this.viewModel.Suppliers)
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }


  async getTotatSuppliersCount() {
    try {
      await this._commonService.presentLoading();
      let resp = await this.SupplierService.getTotatSuppliersCount();
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
  async getSupplierById(id: number) {
    try {
      this._commonService.presentLoading();
      this.viewModel.updateMode = true;
      const resp = await this.SupplierService.getSupplierById(id);
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.Supplier = resp.successData;
        this.SupplierForm.patchValue({
          name: this.viewModel.Supplier.name,
          // symbol: this.viewModel.Supplier.symbol,
         });
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async deleteSupplierById(id: number) {
    try {
      this._commonService.presentLoading();
      const result = await this._commonService.showSweetAlertConfirmation({
        text: 'Are you sure you want to delete this Supplier?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        const resp = await this.SupplierService.deleteSupplier(id);

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
    if (this.SupplierForm.invalid) {
      this.SupplierForm.markAllAsTouched();
    } else {
      try {
        if (this.viewModel.updateMode) {
          this._commonService.presentLoading();
          this.viewModel.Supplier.name = this.SupplierForm.get('name')?.value;
            // this.viewModel.Supplier.symbol = this.SupplierForm.get('symbol')?.value;
          this.updateSupplier(this.viewModel.Supplier);
        } else {
          this._commonService.presentLoading();
          const formData = new FormData();
          this.viewModel.Supplier.name = this.SupplierForm.get('name')?.value;
            // this.viewModel.Supplier.symbol = this.SupplierForm.get('symbol')?.value;

          this.addSupplier(this.viewModel.Supplier);
        }
      } catch (error) {
        throw error;
      } finally {
        this._commonService.dismissLoader();
      }
    }
  }
  async addSupplier(data: SupplierSM) {
    try {
      this._commonService.presentLoading();
      if (data) {
        let resp = await this.SupplierService.addSupplier(data);
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
            text: 'Supplier added successfully!',
            icon: 'success',
          });
          this.SupplierForm.reset();
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async updateSupplier(data: SupplierSM) {
    try {
      this._commonService.presentLoading();
      if (data) {
        let resp = await this.SupplierService.updateSupplier(data);
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
            text: 'Supplier Updated successfully!',
            icon: 'success',
          });
          this.SupplierForm.reset({ emitEvent: true });
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

// Define the totalItems variable, typically set when data is loaded from the API

async onPageChange(event: PageEvent) {
  const pageIndex = event.pageIndex;
  const pageSize = event.pageSize;
  // Calculate the correct page number (since Angular Material uses 0-based index)
  const pageNumber = pageIndex + 1;
  // Update pagination details
  this.viewModel.pagination.PageNo = pageNumber;
  this.viewModel.pagination.PageSize = pageSize;
  // Load the data for the selected page
  await this.loadPageDataWithPagination(pageNumber);
}

async loadPageDataWithPagination(pageNumber: number) {
  if (pageNumber && pageNumber > 0) {
    this.viewModel.pagination.PageNo = pageNumber;
    await this.loadPageData();
  }
}
}

