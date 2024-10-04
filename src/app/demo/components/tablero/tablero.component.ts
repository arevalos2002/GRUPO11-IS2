import { Component, OnInit } from '@angular/core';
import { IColumnaModel, IColumnaTareaModel } from './columna-model';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.scss'
})
export class TableroComponent implements OnInit {

  columnas: IColumnaModel[];
  tareaSeleccionada: IColumnaTareaModel;

  constructor() {
    this.columnas = [];
    this.crearColumnas();
  }

  ngOnInit(): void {
  }

  // funcino para inicializar tus columnas a mostrar en el html
  crearColumnas() {
    this.columnas.push({
      id: 1, nombre: 'Pendiente', 
      tareas: [
        {id: 1, idColumna: 1, nombre: 'Dormir', descripcion: 'Cepillarse para luego ir a dormir'}
      ]
    });
    this.columnas.push({id: 2, nombre: 'Pausado', tareas: []});
    this.columnas.push({id: 3, nombre: 'Trabajando', tareas: []});
    this.columnas.push({id: 4, nombre: 'Terminado', tareas: []});
  }

  /** Recibe la tarea que seleccionaste para mover y guarda en una variable */
  dragStart( tarea: IColumnaTareaModel ) {
    this.tareaSeleccionada = tarea;
  }

  /** Recibe la columna de donde seleccionaste la tarea a mover */
  dragEnd( columna: IColumnaModel ) {
    // en este punte tenes que borrar la tarea seleccionada de la lista de tareas de la columna
    this.tareaSeleccionada = null;
  }

  /** Actualiza el id de la tarea seleccionada con el nuevo id de la columna donde moviste */
  drop( columna: IColumnaModel ) {
    // controlar que no haga el push si el id de la tarea ya existe en la lista de tareas de la columna
    this.tareaSeleccionada.idColumna = columna.id;
    columna.tareas.push(this.tareaSeleccionada)
  }

}
