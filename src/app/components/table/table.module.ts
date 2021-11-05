import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule
  ],
  exports: [TableComponent]
})
export class TableModule { }
