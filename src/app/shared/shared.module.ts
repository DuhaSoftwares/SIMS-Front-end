// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { PaginationComponent } from '../internal-components/pagination/pagination.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PaginationComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PaginationComponent,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    FileUploadModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [],
  providers: [DatePipe],
})
export class SharedModule {}
