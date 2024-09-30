import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from '../../internal-components/customizer-settings/customizer-settings.service';
import { WarehouseService } from '../../services/warehouse.service';
import { CommonService } from '../../services/common.service';
import { BaseComponent } from '../../internal-components/other-components/base.component';
import { LogHandlerService } from '../../services/log-handler.service';
import { WarehouseViewModel } from '../../models/view/end-user/warehouse.viewmodel';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { WareHouseSM } from '../../models/service-models/app/v1/warehouse-s-m';
import { StorageTypeSM } from '../../models/service-models/app/enums/warehouse-storage-type-s-m.enum';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.scss',
})
export class WarehouseComponent
  extends BaseComponent<WarehouseViewModel>
  implements OnInit {
    rows: any[] = [];  // This will hold the table data
    columns: any[] = []; // This will define the table columns
    pageSize!:number;
    count!:number;
    limit!:number;
    pagination!:boolean;
    filteredRows:any = []; // Data to display in the datatable
    searchTerm = '';
  constructor(
    public themeService: CustomizerSettingsService,
    private fb: FormBuilder,
    private warehouseService: WarehouseService,
    commonService: CommonService,
    logHandlerService: LogHandlerService
  ) {
    super(commonService, logHandlerService);
   
    // viewmodel
    this.viewModel = new WarehouseViewModel();
    this.createForm();
    // making storage types as key value pairs
    this.viewModel.storageTypes = Object.entries(StorageTypeSM)
      .filter(([key, value]) => typeof value === 'number')
      .map(([key, value]) => ({ key, value: value as number }));

    // theme toggle
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.viewModel.isToggled = isToggled;
    });
  }

  async ngOnInit() {
    console.log('ngOnInit called');
    await this.loadPageData();
    this.filteredRows = this.rows;

  }

  override async loadPageData() {
    /**
     * Retrieves all warehouses from the server and updates the component's view model.
     */
    try {
      this._commonService.presentLoading()
      let resp = await this.warehouseService.getAllWarehouses();
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.warehouses = resp.successData;
        console.log(this.viewModel.warehouses)
        this.rows = this.viewModel.warehouses; // or assign your data here
        this.columns = [
          { prop: 'name', name: 'Name' },
          { prop: 'description', name: 'Description' },
          { prop: 'location', name: 'Location' },
          { prop: 'contactNumber', name: 'Contact Number' },
          { prop: 'emailId', name: 'Email ID' },
          { prop: 'storageType', name: 'Storage Type' },
          { prop: 'capacity', name: 'Capacity' },
          { prop: 'isActive', name: 'Active Status' },
        ];
      }
    } catch (error) {
      throw error;
    }
    finally {
      this._commonService.dismissLoader()
    }
  }
  async onPageChange(event: any) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    this.viewModel.pagination.PageNo = pageIndex + 1; // Adjust to 1-based index
    this.viewModel.pagination.PageSize = pageSize;

    // Load the data for the selected page
    await this.loadPageDataWithPagination(this.viewModel.pagination.PageNo);
  }
  filterRows() {
    if (!this.searchTerm) {
      this.filteredRows = this.rows;
    } else {
      this.filteredRows = this.rows.filter(row => 
        Object.values(row).some(value => 
          String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }
  }
  async loadPageDataWithPagination(pageNumber: number) {
    if (pageNumber && pageNumber > 0) {
      await this.loadPageData(); // This will fetch data based on the updated page number
    }
  }
  async deleteWareHouseById(id: number) {
    try {
      this._commonService.presentLoading()
      const result = await this._commonService.showSweetAlertConfirmation({
        text: 'Are you sure you want to delete this warehouse?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        const resp = await this.warehouseService.deleteWarehouse(id);

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
    }
    finally {
      this._commonService.dismissLoader()
    }
  }

  async getWarehouseById(id: number) {
    try {
      this._commonService.presentLoading()
      const resp = await this.warehouseService.getWarehouseById(id);
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.warehouse = resp.successData;
        this.viewModel.warehouseForm.patchValue({
          name: this.viewModel.warehouse.name,
          description: this.viewModel.warehouse.description,
          location: this.viewModel.warehouse.location,
          contactNumber: this.viewModel.warehouse.contactNumber,
          emailId: this.viewModel.warehouse.emailId,
          storageType: this.viewModel.warehouse.storageType.toString(), // Ensure it matches the select value
          capacity: this.viewModel.warehouse.capacity,
          isActive: this.viewModel.warehouse.isActive,
          clientCompanyDetailId: this.viewModel.warehouse.clientCompanyDetailId,
        });
      }
    } catch (error) {
      throw error;
    }
    finally {
      this._commonService.dismissLoader()
    }
  }

  createForm(): void {
    this.viewModel.warehouseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      location: ['', [Validators.required, Validators.minLength(5)]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      emailId: ['', [Validators.required, Validators.email]],
      storageType: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      isActive: [true],
    });
  }

  async openAddEditWarehouseModal(id: number) {
    this.viewModel.displayStyle = 'block';
    this.viewModel.AddEditWarehouseModalTitle =id > 0 ? 'Update Warehouse' : 'Add Warehouse';
    this.viewModel.isEditMode = id > 0; // Set flag for edit mode
    if (id > 0) {
      await this.getWarehouseById(id);
    }
  }

  closeAddEditWarehouseModal() {
    this.viewModel.displayStyle = 'none';
    this.viewModel.warehouseForm.reset();
  }

  onSubmit(): void {
    // Handle form submission here
    if (this.viewModel.warehouseForm.valid) {
      let formData = this.viewModel.warehouseForm.value as WareHouseSM;
      formData.storageType = +this.viewModel.warehouseForm.value.storageType;
      this.addWarehouse(formData);
    } else {
      this.viewModel.warehouseForm.markAllAsTouched();
    }
  }
  // adding warehouse
  async addWarehouse(data: WareHouseSM) {
    try {
      this._commonService.presentLoading()
      if (data) {
        let resp = await this.warehouseService.addWarehouse(data);
        if (resp.isError) {
          this._commonService.showSweetAlertConfirmation({
            text: resp.errorData.displayMessage,
            icon: 'error',
            title: 'Error',
          });
        } else {
          await this.loadPageData();
          await this._commonService.showSweetAlertConfirmation({
            text: 'Warehouse added successfully!',
            icon: 'success',
          });
          this.closeAddEditWarehouseModal();
        }
      }
    } catch (error) {
      throw error;
    }
    finally {
      this._commonService.dismissLoader()
    }
  }
  async updateWarehouse(data: WareHouseSM) {
    try {
      this._commonService.presentLoading()
      if (data) {
        let resp = await this.warehouseService.updateWarehouse(data);
        if (resp.isError) {
          this._commonService.showSweetAlertConfirmation({
            text: resp.errorData.displayMessage,
            icon: 'error',
            title: 'Error',
          });
        } else {
          await this.loadPageData();
          await this._commonService.showSweetAlertConfirmation({
            text: 'Warehouse Updated successfully!',
            icon: 'success',
          });
          this.closeAddEditWarehouseModal();
        }
      }
    } catch (error) {
      throw error;
    }
    finally {
      this._commonService.dismissLoader()
    }
  }
}
