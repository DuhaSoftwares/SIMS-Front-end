// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
// import { PaginationComponent } from '../internal-components/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // PaginationComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // PaginationComponent,
    RouterLink,
  ],
  declarations: [],
  providers: [DatePipe],
})
export class SharedModule {}
