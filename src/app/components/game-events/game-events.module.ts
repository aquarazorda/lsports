import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEventsComponent } from './game-events.component';
import { TableModule } from '../table/table.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GameEventsComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    NgxDatatableModule,
    FormsModule
  ],
  exports: [
    GameEventsComponent
  ]
})
export class GameEventsModule { }
