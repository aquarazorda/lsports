import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEventsComponent } from './game-events.component';
import { TableModule } from '../table/table.module';
import { FormsModule } from '@angular/forms';
import { NgxFpTsModule } from 'ngx-fp-ts';

@NgModule({
  declarations: [
    GameEventsComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    NgxFpTsModule,
    FormsModule
  ],
  exports: [
    GameEventsComponent
  ]
})
export class GameEventsModule { }
