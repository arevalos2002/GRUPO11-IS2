import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableroRoutingModule } from './tablero-routing.module';
import { TableroComponent } from './tablero.component';
import { DragDropModule } from 'primeng/dragdrop';


@NgModule({
  declarations: [
    TableroComponent
  ],
  imports: [
    CommonModule,
    TableroRoutingModule,
    DragDropModule
  ]
})
export class TableroModule { }
