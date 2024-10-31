import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/components/internal/other-components/base.component';
import { VariantsSM } from 'src/app/models/service-models/app/v1/variants-s-m';
import { VariantViewModel } from 'src/app/models/view/end-user/product/variant.viewmodel';
import { CommonService } from 'src/app/services/common.service';
import { LogHandlerService } from 'src/app/services/log-handler.service';
import { VariantService } from 'src/app/services/product-services/variants.service';
import { SharedModule } from 'src/app/shared/shared.module';


@Component({
  selector: 'app-variants',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss']
})
export class VariantsComponent extends BaseComponent<VariantViewModel> implements OnInit{
  constructor(commonService: CommonService, exceptionHandler: LogHandlerService,private variantsService:VariantService,  private fb: FormBuilder) {
    super(commonService, exceptionHandler)
    this.viewModel=new VariantViewModel()
  }
   variantDisplayedColumns: string[] = ['name', 'variantLevel', 'action'];
  variantForm!: FormGroup;
  ngOnInit(): void {
    this.loadPageData();
    this.variantForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      symbol: ['',[Validators.required, Validators.minLength(1)]],
    });
  }

   /**
     * Retrieves all variants from the server and updates the component's view model.
     */
  override async loadPageData() {
    try {
      this._commonService.presentLoading();
     await this.getTotatvariantsCount()
      let resp = await this.variantsService.getAllVariants(this.viewModel);
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.variants = resp.successData;
        console.log(this.viewModel.variants)
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }


  async getTotatvariantsCount() {
    try {
      await this._commonService.presentLoading();
      let resp = await this.variantsService.getTotatVariantsCount();
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
  async getvariantById(id: number) {
    try {
      this._commonService.presentLoading();
      this.viewModel.updateMode = true;
      const resp = await this.variantsService.getVariantById(id);
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.variant = resp.successData;
        this.variantForm.patchValue({
          // name: this.viewModel.variant.name,
          // symbol: this.viewModel.variant.symbol,
         });
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async deletevariantById(id: number) {
    try {
      this._commonService.presentLoading();
      const result = await this._commonService.showSweetAlertConfirmation({
        text: 'Are you sure you want to delete this variant?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        const resp = await this.variantsService.deleteVariant(id);

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
    if (this.variantForm.invalid) {
      this.variantForm.markAllAsTouched();
    } else {
      try {
        if (this.viewModel.updateMode) {
          this._commonService.presentLoading();
          // this.viewModel.variant.name = this.variantForm.get('name')?.value;
          //   this.viewModel.variant.symbol = this.variantForm.get('symbol')?.value;
          this.updatevariant(this.viewModel.variant);
        } else {
          this._commonService.presentLoading();
          const formData = new FormData();
          // this.viewModel.variant.name = this.variantForm.get('name')?.value;
          //   this.viewModel.variant.symbol = this.variantForm.get('symbol')?.value;

          this.addvariant(this.viewModel.variant);
        }
      } catch (error) {
        throw error;
      } finally {
        this._commonService.dismissLoader();
      }
    }
  }
  async addvariant(data: VariantsSM) {
    try {
      this._commonService.presentLoading();
      if (data) {
        let resp = await this.variantsService.addVariant(data);
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
            text: 'variant added successfully!',
            icon: 'success',
          });
          this.variantForm.reset();
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async updatevariant(data: VariantsSM) {
    try {
      this._commonService.presentLoading();
      if (data) {
        let resp = await this.variantsService.updateVariant(data);
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
            text: 'variant Updated successfully!',
            icon: 'success',
          });
          this.variantForm.reset({ emitEvent: true });
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
