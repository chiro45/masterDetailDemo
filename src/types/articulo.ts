import { categorias } from "./categorias";
import { IUnidadaMedida } from "./unidadMedida";
export interface Iarticulo {
  id: number;
  denominacion: string;
  unidadMedida: IUnidadaMedida;
  categoria: categorias;
  cantidad?: number;
}
