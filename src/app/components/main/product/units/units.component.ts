import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/components/internal/other-components/base.component';
import { UnitsSM } from 'src/app/models/service-models/app/v1/units-s-m';
import { UnitsViewModel } from 'src/app/models/view/end-user/product/units.viewmodel';
import { CommonService } from 'src/app/services/common.service';
import { LogHandlerService } from 'src/app/services/log-handler.service';
import { UnitService } from 'src/app/services/product-services/units.service';
import { SharedModule } from 'src/app/shared/shared.module';


@Component({
  selector: 'app-units',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent extends BaseComponent<UnitsViewModel> implements OnInit{
  constructor(commonService: CommonService, exceptionHandler: LogHandlerService,private unitsService:UnitService, private fb: FormBuilder) {
    super(commonService, exceptionHandler)
    this.viewModel=new UnitsViewModel()
  }
  displayedColumns: string[] = ['unit','symbol', 'Action'];
  unitForm!: FormGroup;
  ngOnInit(): void {
    this.loadPageData();
    this.unitForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      symbol: ['',[Validators.required, Validators.minLength(1)]],
    });
  }
   /**
     * Retrieves all units from the server and updates the component's view model.
     */
  override async loadPageData() {
    try {
      this._commonService.presentLoading();
     await this.getTotatunitsCount()
      let resp = await this.unitsService.getAllUnits(this.viewModel);
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.units = resp.successData;
        console.log(this.viewModel.units)
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }


  async getTotatunitsCount() {
    try {
      await this._commonService.presentLoading();
      let resp = await this.unitsService.getTotatUnitsCount();
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
  async getunitById(id: number) {
    try {
      this._commonService.presentLoading();
      this.viewModel.updateMode = true;
      const resp = await this.unitsService.getUnitById(id);
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.unit = resp.successData;
        this.unitForm.patchValue({
          name: this.viewModel.unit.name,
          symbol: this.viewModel.unit.symbol,
         });
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async deleteunitById(id: number) {
    try {
      this._commonService.presentLoading();
      const result = await this._commonService.showSweetAlertConfirmation({
        text: 'Are you sure you want to delete this unit?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        const resp = await this.unitsService.deleteUnit(id);

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
    if (this.unitForm.invalid) {
      this.unitForm.markAllAsTouched();
    } else {
      try {
        if (this.viewModel.updateMode) {
          this._commonService.presentLoading();
          this.viewModel.unit.name = this.unitForm.get('name')?.value;
            this.viewModel.unit.symbol = this.unitForm.get('symbol')?.value;
          this.updateunit(this.viewModel.unit);
        } else {
          this._commonService.presentLoading();
          const formData = new FormData();
          this.viewModel.unit.name = this.unitForm.get('name')?.value;
            this.viewModel.unit.symbol = this.unitForm.get('symbol')?.value;

          this.addunit(this.viewModel.unit);
        }
      } catch (error) {
        throw error;
      } finally {
        this._commonService.dismissLoader();
      }
    }
  }
  async addunit(data: UnitsSM) {
    try {
      this._commonService.presentLoading();
      if (data) {
        let resp = await this.unitsService.addUnit(data);
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
            text: 'unit added successfully!',
            icon: 'success',
          });
          this.unitForm.reset();
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async updateunit(data: UnitsSM) {
    try {
      this._commonService.presentLoading();
      if (data) {
        let resp = await this.unitsService.updateUnit(data);
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
            text: 'unit Updated successfully!',
            icon: 'success',
          });
          this.unitForm.reset({ emitEvent: true });
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
