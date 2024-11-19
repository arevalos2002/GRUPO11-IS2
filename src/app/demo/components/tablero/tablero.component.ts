import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IColumnaModel, ITableroModel } from './interfaces';


@Component({
	selector: 'app-tablero',
	templateUrl: './tablero.component.html',
	styleUrls: ['./tablero.component.scss']
})
export class TableroComponent {
	tableros: ITableroModel[] = [];
	tableroVisible: boolean = false;
	nombreTablero: string;
	tableroSeleccionado: ITableroModel;

	columnaVisible: boolean = false;
	nombreColumna: string;
	columnaSeleccionada: IColumnaModel;


	tareaVisible: boolean = false;
	nombreTarea: string;
	descripcionTarea: string;
	fechaInicioTarea: Date;
	fechaFinTarea: Date;
	usuarioTarea: string;
	estadoTarea: string;

	nuevoTablero() {
		this.tableroVisible = true;
	}

	nuevaColumna() {
		this.columnaVisible = true;
	}

	nuevaTarea() {
		this.tareaVisible = true;
	}


	crearTablero() {
		if (this.nombreTablero) {
			this.tableros.push({
				id: this.obtenerSiguienteId(),
				nombre: this.nombreTablero,
				columnas: [] 
			});
		
			this.nombreTablero = null;
			this.tableroVisible = false;
		}
	}

	agregarColumna() {
		if (this.nombreColumna) {
			this.tableroSeleccionado.columnas.push({
				id: this.obtenerSiguienteColumnaId(),
				idTablero: this.tableroSeleccionado.id,
				nombre: this.nombreColumna,
				tareas: [] 
			});

			// Limpiar y cerrar el diálogo
			this.nombreColumna = null;
			this.columnaVisible = false;
		}
	}

		
	crearTarea() {
		this.agregarTarea(
			this.nombreTarea,
			this.descripcionTarea,
			this.fechaInicioTarea,
			this.fechaFinTarea,
			this.usuarioTarea,
			this.estadoTarea
		);
	
		this.nombreTarea = null;
		this.descripcionTarea = null;
		this.fechaInicioTarea = null;
		this.fechaFinTarea = null;
		this.usuarioTarea = null;
		this.estadoTarea = null;
	
		this.tareaVisible = false;
	}

	private obtenerSiguienteId(): number {
		if (this.tableros.length === 0) {
		  return 1; 
		}
		const ultimoId = this.tableros[this.tableros.length - 1].id;
		return ultimoId + 1;
	}

	private obtenerSiguienteColumnaId(): number {
		if (this.tableroSeleccionado.columnas.length === 0) {
		  return 1; 
		}
		const ultimoId = this.tableroSeleccionado.columnas[this.tableroSeleccionado.columnas.length - 1].id;
		return ultimoId + 1;
	}

	seleccionarTablero(tablero: ITableroModel) {
		this.tableroSeleccionado = tablero
	}

	seleccionarColumna(columna: IColumnaModel) {
		this.columnaSeleccionada = columna
	}


	agregarTarea(nombre: string, descripcion: string, fechaInicio: Date, fechaFin: Date, usuario: string, estado: string) {
		if (this.columnaSeleccionada) {
			this.columnaSeleccionada.tareas.push({
				id: this.obtenerSiguienteTareaId(),
				idColumna: this.columnaSeleccionada.id,
				nombre,
				descripcion,
				fechaInicio,
				fechaFin,
				usuario,
				estado
			});
		}
	}
	
	private obtenerSiguienteTareaId(): number {
		if (!this.columnaSeleccionada || this.columnaSeleccionada.tareas.length === 0) {
			return 1;
		}
		const ultimoId = this.columnaSeleccionada.tareas[this.columnaSeleccionada.tareas.length - 1].id;
		return ultimoId + 1;
	}


	eliminarTarea(idTarea: number) {
		const indice = this.columnaSeleccionada.tareas.findIndex(t => t.id === idTarea);
		if (indice !== -1) {
			this.columnaSeleccionada.tareas.splice(indice, 1);
		}
	}
	
	

}
