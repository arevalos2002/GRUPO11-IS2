
export interface IColumnaModel {
    id: number;
    nombre: string;
    tareas: IColumnaTareaModel[];
}

export interface IColumnaTareaModel {
    id: number;
    idColumna: number;
    nombre: string;
    descripcion: string;
}