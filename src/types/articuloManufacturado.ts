import { Iarticulo } from "./articulo";
import { categorias } from "./categorias";

export interface IarticuloManufacturado {
  id: number;
  descripción: string;
  alta: boolean;
  receta: string;
  tiempoEstimadoMinutos: number;
  precioVenta: number;
  denominacion: string;
  ingredientes: Iarticulo[];
  categoria: categorias;
}
