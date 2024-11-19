export interface ITableroModel {
    id: number;
    nombre: string;
    columnas: IColumnaModel[];
}

export interface IColumnaModel {
    id: number;
    idTablero: number
    nombre: string;
    tareas: ITareaModel[];
}

export interface ITareaModel {
    id: number;
    idColumna: number;
    nombre: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    usuario: string;
    estado: string;
}


