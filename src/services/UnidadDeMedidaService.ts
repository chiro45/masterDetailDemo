import { IUnidadaMedida } from "../types/unidadMedida";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de personas
export class UnidadDeMedidaService extends BackendClient<IUnidadaMedida> {}
