import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { CustomizerSettingsService } from '../../../internal-components/customizer-settings/customizer-settings.service';
import { CommonService } from '../../../services/common.service';
import { LogHandlerService } from '../../../services/log-handler.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { BaseComponent } from '../../../internal-components/other-components/base.component';
import { BrandViewModel } from '../../../models/view/end-user/brand.viewmodel';
import { BrandService } from '../../../services/brand.service';
import { BrandSM } from '../../../models/service-models/app/v1/brand-s-m';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent
  extends BaseComponent<BrandViewModel>
  implements OnInit
{
  constructor(
    public themeService: CustomizerSettingsService,
    commonService: CommonService,
    logHandlerService: LogHandlerService,
    private brandService: BrandService,
    private fb: FormBuilder
  ) {
    super(commonService, logHandlerService);
    this.viewModel = new BrandViewModel();
  }
  brandForm!: FormGroup;
  ngOnInit(): void {
    this.loadPageData();
    this.brandForm = this.fb.group({
      brandName: ['', [Validators.required, Validators.minLength(3)]],
      imagePath: [''],
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
     * Retrieves all brands from the server and updates the component's view model.
     */
  override async loadPageData() {
    try {
      this._commonService.presentLoading();
     await this.getTotatBrandsCount()
      let resp = await this.brandService.getAllBrands(this.viewModel);
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.brands = resp.successData;
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }
  async getTotatBrandsCount() {
    try {
      await this._commonService.presentLoading();
      let resp = await this.brandService.getTotatBrandsCount();
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
  async getBrandById(id: number) {
    try {
      this._commonService.presentLoading();
      this.viewModel.updateMode = true;
      const resp = await this.brandService.getBrandById(id);
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.brand = resp.successData;
        this.brandForm.patchValue({ brandName: this.viewModel.brand.name });
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async deleteBrandById(id: number) {
    try {
      this._commonService.presentLoading();
      const result = await this._commonService.showSweetAlertConfirmation({
        text: 'Are you sure you want to delete this warehouse?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        const resp = await this.brandService.deleteBrand(id);

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

  onFileChange(event: any) {
    const file = event.target.files[0];
    this._commonService.convertFileToBase64(file)
      .subscribe((base64) => {
        this.viewModel.fileName = file.name;
        this.viewModel.fileName.split('?')[0].split('.').pop();
        this.viewModel.brand.imagePath = base64;
      });
  }
  onSubmit(): void {
    if (this.brandForm.invalid) {
      this.brandForm.markAllAsTouched();
    } else {
      try {
        if (this.viewModel.updateMode) {
          this._commonService.presentLoading();
          this.viewModel.brand.name = this.brandForm.get('brandName')?.value;
          this.updateBrand(this.viewModel.brand);
        } else {
          this._commonService.presentLoading();
          const formData = new FormData();
          this.viewModel.brand.name = this.brandForm.get('brandName')?.value;
          this.addBrand(this.viewModel.brand);
        }
      } catch (error) {
        throw error;
      } finally {
        this._commonService.dismissLoader();
      }
    }
  }
  async addBrand(data: BrandSM) {
    try {
      this._commonService.presentLoading();
      if (data) {
        let resp = await this.brandService.addBrand(data);
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
            text: 'Brand added successfully!',
            icon: 'success',
          });
          this.brandForm.reset({ emitEvent: false });
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async updateBrand(data: BrandSM) {
    try {
      this._commonService.presentLoading();
      if (data) {
        let resp = await this.brandService.updateBrand(data);
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
            text: 'Brand Updated successfully!',
            icon: 'success',
          });
          this.brandForm.reset({ emitEvent: false });
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
