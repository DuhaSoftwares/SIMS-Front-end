import { BaseComponent } from './../../../internal-components/other-components/base.component';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CustomizerSettingsService } from '../../../internal-components/customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonService } from '../../../services/common.service';
import { LogHandlerService } from '../../../services/log-handler.service';
import { CategoriesViewModel } from '../../../models/view/end-user/categories.viewmodel';
import { PageEvent } from '@angular/material/paginator';
import { CategoryService } from '../../../services/category.service';
import { ProductCategorySM } from '../../../models/service-models/app/v1/product-category-sm';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent
  extends BaseComponent<CategoriesViewModel>
  implements OnInit
{
  constructor(
    public themeService: CustomizerSettingsService,
    commonService: CommonService,
    logHandlerService: LogHandlerService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    super(commonService, logHandlerService);
    this.viewModel = new CategoriesViewModel();
  }
  categoriesForm!: FormGroup;

  ngOnInit(): void {
    this.categoriesForm = this.fb.group({
      categoriesName: ['', [Validators.required, Validators.minLength(3)]],
    });
<<<<<<< HEAD
    this.loadPageData()
=======
    this.loadPageData();
>>>>>>> 67e6c5bb52a96fd0b5d97e54b0a859f1ea198a59
  }

  override async loadPageData() {
    try {
      this._commonService.presentLoading();
      // await this.getTotatCategoriesCount();
      let resp = await this.categoryService.getAllCategory(this.viewModel);
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.categories = resp.successData;
        console.log(this.viewModel.categories)
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }
  async getTotatCategoriesCount() {
    try {
      await this._commonService.presentLoading();
      let resp = await this.categoryService.getTotatCategoryCount();
      if (resp.isError) {
        await this._exceptionHandler.logObject(resp.errorData);
        this._commonService.showSweetAlertToast({
          title: 'Error!',
          text: resp.errorData.displayMessage,
          position: 'top-end',
          icon: 'error',
        });
      } else {
        this.viewModel.pagination.totalCount = resp.successData.intResponse;
      }
    } catch (error) {
    } finally {
      await this._commonService.dismissLoader();
    }
  }
  async getCategoryById(id: number) {
    try {
      this._commonService.presentLoading();
      this.viewModel.updateMode = true;
      const resp = await this.categoryService.getCategoryById(id);
      if (resp.isError) {
        this._commonService.showSweetAlertConfirmation({
          text: resp.errorData.displayMessage,
          icon: 'error',
        });
      } else {
        this.viewModel.singleCategory = resp.successData;
        this.categoriesForm.patchValue({
          categoriesName: this.viewModel.singleCategory.name,
        });
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async deleteCategoryById(id: number) {
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
        const resp = await this.categoryService.deleteCategory(id);

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

  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   this._commonService.convertFileToBase64(file).subscribe((base64) => {
  //     this.viewModel.fileName = file.name;
  //     this.viewModel.fileName.split('?')[0].split('.').pop();
  //     this.viewModel.brand.imagePath = base64;
  //   });
  // }
  onSubmit(): void {
    if (this.categoriesForm.invalid) {
      this.categoriesForm.markAllAsTouched();
    } else {
      try {
        if (this.viewModel.updateMode) {
          this._commonService.presentLoading();
          this.viewModel.singleCategory.name =
            this.categoriesForm.get('categoriesName')?.value;
<<<<<<< HEAD
          // this.viewModel.singleCategory.description = this.categoriesForm.get(
          //   'categoriesDescription'
          // )?.value;
=======
          this.viewModel.singleCategory.level = 1;
>>>>>>> 67e6c5bb52a96fd0b5d97e54b0a859f1ea198a59
          this.updateCategory(this.viewModel.singleCategory);
        } else {
          this._commonService.presentLoading();
          const formData = new FormData();
          this.viewModel.singleCategory.level = 1;

          this.viewModel.singleCategory.name =
            this.categoriesForm.get('categoriesName')?.value;
<<<<<<< HEAD
          // this.viewModel.singleCategory.description = this.categoriesForm.get(
          //   'categoriesDescription'
          // )?.value;
=======

>>>>>>> 67e6c5bb52a96fd0b5d97e54b0a859f1ea198a59
          this.addCategory(this.viewModel.singleCategory);
        }
      } catch (error) {
        throw error;
      } finally {
        this._commonService.dismissLoader();
      }
    }
  }
  async addCategory(data: ProductCategorySM) {
    try {
      this._commonService.presentLoading();
      if (data) {
        let resp = await this.categoryService.addCategory(data);
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
            text: 'Category added successfully!',
            icon: 'success',
          });
          this.categoriesForm.reset({ emitEvent: false });
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async updateCategory(data: ProductCategorySM) {
    try {
      this._commonService.presentLoading();
      if (data) {
        let resp = await this.categoryService.updateCategory(data);
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
            text: 'Category Updated successfully!',
            icon: 'success',
          });
          this.categoriesForm.reset({ emitEvent: false });
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
