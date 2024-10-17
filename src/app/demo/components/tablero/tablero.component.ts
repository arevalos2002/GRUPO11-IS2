import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

// Clase para representar una tarea
class Tarea {
  constructor(public titulo: string, public descripcion: string) {}
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
  // Inicializa algunas columnas con tareas de ejemplo
  columnas: Columna[] = [
    new Columna('Pendientes', [
      new Tarea('Tarea 1', 'Descripción de tarea 1'),
      new Tarea('Tarea 2', 'Descripción de tarea 2')
    ]),
    new Columna('En Progreso', [
      new Tarea('Tarea 3', 'Descripción de tarea 3')
    ]),
    new Columna('Completadas', [
      new Tarea('Tarea 4', 'Descripción de tarea 4')
    ])
  ];

  // Función para mover una tarea entre columnas
  moverTarea(event: CdkDragDrop<Tarea[]>) {
    // Si la tarea se mueve dentro de la misma columna
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Si la tarea se mueve a una columna diferente
      transferArrayItem(
        event.previousContainer.data,  // Lista de tareas de la columna original
        event.container.data,          // Lista de tareas de la columna destino
        event.previousIndex,           // Índice de la tarea en la columna original
        event.currentIndex             // Índice donde debe colocarse en la columna destino
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
    const titulo = prompt('Título de la nueva tarea:');
    const descripcion = prompt('Descripción de la nueva tarea:');
    if (titulo && descripcion) {
      columna.tareas.push(new Tarea(titulo, descripcion));
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
