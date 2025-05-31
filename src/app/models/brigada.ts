export interface Municipio {
  id: number;
  nombre: string;
  // otros campos que uses
}

export interface Conglomerado {
  id: number;
  nombre: string;
  // otros campos que uses
}

export interface Brigada{
    id  :number;
    Nombre: string;
    Municipio: Municipio;
    Conglomerado?: Conglomerado;
    Presupuesto: string;
    Fecha_Inicio: string;
    ID_Municipio: number;
    ID_Conglomerado: number;
}
