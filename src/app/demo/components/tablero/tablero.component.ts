import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

// Clase para representar una tarea
class Tarea {
  constructor(public nombre: string, public descripcion: string) {}
}

// Clase para representar una columna
class Columna {
  constructor(public nombre: string, public tareas: Tarea[]) {}
}

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent {
  // Inicializa el array de columnas vacío
  columnas: Columna[] = [];

  // Función para mover una tarea entre columnas
  moverTarea(event: CdkDragDrop<Tarea[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // Función para agregar una nueva columna
  agregarColumna() {
    const nombreColumna = prompt('Nombre de la nueva columna:');
    if (nombreColumna) {
      this.columnas.push(new Columna(nombreColumna, []));
    }
  }

  // Función para eliminar una columna
  eliminarColumna(columna: Columna) {
    const indice = this.columnas.indexOf(columna);
    if (indice > -1) {
      this.columnas.splice(indice, 1);
    }
  }

  // Función para agregar una nueva tarea a una columna específica
  agregarTarea(columna: Columna) {
    const nombre = prompt('Título de la nueva tarea:');
    const descripcion = prompt('Descripción de la nueva tarea:');
    if (nombre && descripcion) {
      columna.tareas.push(new Tarea(nombre, descripcion));
    }
  }

  // Función para eliminar una tarea de una columna específica
  eliminarTarea(columna: Columna, tarea: Tarea) {
    const indice = columna.tareas.indexOf(tarea);
    if (indice > -1) {
      columna.tareas.splice(indice, 1);
    }
  }
}
