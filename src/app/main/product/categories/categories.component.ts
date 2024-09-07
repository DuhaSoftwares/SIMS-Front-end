import { BaseComponent } from './../../../internal-components/other-components/base.component';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CustomizerSettingsService } from '../../../internal-components/customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonService } from '../../../services/common.service';
import { LogHandlerService } from '../../../services/log-handler.service';
import { CategoriesViewModel } from '../../../models/view/end-user/categories.viewmodel';
import { PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
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
    // private categoriesServices: CategoriesService,
    private fb: FormBuilder
  ) {
    super(commonService, logHandlerService);
    this.viewModel = new CategoriesViewModel();
  }
  categoriesForm!: FormGroup;

  displayedColumns: string[] = [
    'select',
    'customer',
    'email',
    'source',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.customer + 1
    }`;
  }
  ngOnInit(): void {
    this.categoriesForm = this.fb.group({
      categoriesName: ['', [Validators.required, Validators.minLength(3)]],
      categoriesDescription: [
        '',
        [Validators.required, Validators.minLength(10)],
      ],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this._commonService.convertFileToBase64(file).subscribe((base64) => {
      this.viewModel.fileName = file.name;
      this.viewModel.fileName.split('?')[0].split('.').pop();
      // this.viewModel.brand.imagePath = base64;
    });
  }
  onSubmit() {}
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

const ELEMENT_DATA: PeriodicElement[] = [
  {
    customer: {
      img: 'assets/images/users/user1.jpg',
      name: 'Carlos Daley',
    },
    email: 'carlos@daxa.com',
    source: 'Website',
    status: {
      new: 'New',
      // won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'assets/images/users/user2.jpg',
      name: 'Dorothy Young',
    },
    email: 'dorothy@daxa.com',
    source: 'Referral',
    status: {
      // new: 'New',
      won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'assets/images/users/user3.jpg',
      name: 'Greg Woody',
    },
    email: 'greg@daxa.com',
    source: 'Cold Call',
    status: {
      // new: 'New',
      // won: 'Won',
      inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'assets/images/users/user4.jpg',
      name: 'Deborah Rosol',
    },
    email: 'deborah@daxa.com',
    source: 'Email Campaign',
    status: {
      // new: 'New',
      // won: 'Won',
      // inProgress: 'In Progress',
      lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'assets/images/users/user5.jpg',
      name: 'Kendall Allen',
    },
    email: 'kendall@daxa.com',
    source: 'Online Store',
    status: {
      new: 'New',
      // won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'assets/images/users/user6.jpg',
      name: 'Mark Stjohn',
    },
    email: 'mark@daxa.com',
    source: 'Online Store',
    status: {
      new: 'New',
      // won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'assets/images/users/user7.jpg',
      name: 'Joan Stanley',
    },
    email: 'joan@daxa.com',
    source: 'Email Campaign',
    status: {
      new: 'New',
      // won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'assets/images/users/user8.jpg',
      name: 'Jacob Bell',
    },
    email: 'jacob@daxa.com',
    source: 'Cold Call',
    status: {
      // new: 'New',
      won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'assets/images/users/user9.jpg',
      name: 'Donald Bryan',
    },
    email: 'donald@daxa.com',
    source: 'Referral',
    status: {
      // new: 'New',
      won: 'Won',
      // inProgress: 'In Progress',
      // lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
  {
    customer: {
      img: 'assets/images/users/user10.jpg',
      name: 'Kristina Blomquist',
    },
    email: 'kristina@daxa.com',
    source: 'Website',
    status: {
      // new: 'New',
      // won: 'Won',
      // inProgress: 'In Progress',
      lost: 'Lost',
    },
    action: {
      view: 'visibility',
      edit: 'edit',
      delete: 'delete',
    },
  },
];

export interface PeriodicElement {
  customer: any;
  email: string;
  source: string;
  status: any;
  action: any;
}
