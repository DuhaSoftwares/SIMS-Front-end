/* eslint-disable @angular-eslint/template/eqeqeq */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/template/eqeqeq */
/* eslint-disable @angular-eslint/template/eqeqeq */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../other-components/base.component';
import { PaginationViewModel } from '../../models/internal/pagination.viewmodel';
import { LogHandlerService } from '../../services/log-handler.service';
import { CommonService } from '../../services/common.service';



@Component({
  selector: 'pagination',
  template: `<ul class="pagination customPagination">
  <li class="page-item disabled ng-star-inserted" [ngClass]="{'disabled': viewModel.PageNo === 1 }">
      <a aria-label="Previous" (click)="selectPageNumber(viewModel.PageNo-1)" class="page-link" tabindex="-1"
          aria-disabled="true">
          <span aria-hidden="true" class="ng-star-inserted">«</span>
      </a>
  </li>
  <li *ngFor="let pgnum of viewModel.totalPages" class="page-item ng-star-inserted"
      [ngClass]="{'active': viewModel.PageNo === pgnum}">
      <a (click)="selectPageNumber(pgnum)" class="page-link ng-star-inserted">{{pgnum}}</a>
  </li>
  <li class="page-item ng-star-inserted"
      [ngClass]="{'disabled': viewModel.PageNo === viewModel.totalPages[viewModel.totalPages.length-1] }">
      <a (click)="selectPageNumber(viewModel.PageNo+1)" aria-label="Next" class="page-link">
          <span aria-hidden="true" class="ng-star-inserted">»</span>
      </a>
  </li>
</ul>`,
  styles: [`.customPagination a {
  color: #000000;
  cursor:pointer;
}
.customPagination a:hover {
  color: #000000;
  cursor:pointer;
}
.customPagination .page-item.active .page-link {
  border-color: black;
  background-color: #fff;
  color: black;
  cursor:pointer;
}`],
  // styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule]
})


export class PaginationComponent extends BaseComponent<PaginationViewModel> implements OnInit {
  @Input() override viewModel!: PaginationViewModel;
  @Output() selectedPageNum = new EventEmitter<number>();

  constructor(
    commonService: CommonService,
    logService: LogHandlerService
  ) {
    super(commonService, logService);
    // this.viewModel = { PageNo: 1, PageSize: 10, totalCount: 0, totalPages: [] };
  }

  ngOnInit(): void {
    this.viewModel.totalPages = this.getPagesCountArray(this.viewModel);

  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   // debugger;
  //   this.viewModel.totalPages = this.getPagesCountArray1(changes['viewModel'].currentValue);

  // }
  async selectPageNumber(pageNumber: number) {
    if (pageNumber && pageNumber > 0) {
      this.selectedPageNum.emit(pageNumber);
    }
  }
}
