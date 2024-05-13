
import { IarticuloManufacturado } from "../types/articuloManufacturado";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de personas
export class ProductoManufacturadoService extends BackendClient<IarticuloManufacturado> {}
