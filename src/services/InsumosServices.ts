import { Iarticulo } from "../types/articulo";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de personas
export class InsumoServices extends BackendClient<Iarticulo> {}
