import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableroRoutingModule } from './tablero-routing.module';
import { TableroComponent } from './tablero.component';
import { DragDropModule } from '@angular/cdk/drag-drop';  // Usa el DragDropModule del Angular CDK
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TableroComponent
  ],
  imports: [
    CommonModule,
    TableroRoutingModule,
    DragDropModule,
    CardModule,
    DialogModule,
    ButtonModule,
    InputTextModule, 
    FormsModule
  ]
})
export class TableroModule { }
