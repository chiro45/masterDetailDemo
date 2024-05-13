import { categorias } from "../types/categorias";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de personas
export class CategoriaInsumosServices extends BackendClient<categorias> {}
