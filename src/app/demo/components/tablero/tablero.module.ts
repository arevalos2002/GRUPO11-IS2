import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableroRoutingModule } from './tablero-routing.module';
import { TableroComponent } from './tablero.component';
import { DragDropModule } from '@angular/cdk/drag-drop';  // Usa el DragDropModule del Angular CDK

@NgModule({
  declarations: [
    TableroComponent
  ],
  imports: [
    CommonModule,
    TableroRoutingModule,
    DragDropModule  // Necesario para el arrastrar y soltar
  ]
})
export class TableroModule { }
