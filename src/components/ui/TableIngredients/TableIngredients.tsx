import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Iarticulo } from "../../../types/articulo";

const columns = [
  {
    label: "Id",
    key: "id",
  },
  {
    label: "Ingrediente",
    key: "ingrediente",
    render: (element: Iarticulo) => element.denominacion,
  },
  {
    label: "Unidad de medida",
    key: "unidadMedida",
    render: (element: Iarticulo) => element.unidadMedida.denominacion,
  },
  {
    label: "Cantidad",
    key: "cantidad",
    render: (element: Iarticulo) =>
      `${element.cantidad} ${element.unidadMedida.abreviatura}`,
  },
  {
    label: "Acciones",
    key: "actions",
  },
];
export interface ITableIngredients {
  handleDeleteItem: (indice: number) => void;
  dataIngredients: any[];
}

export const TableIngredients = ({
  handleDeleteItem,
  dataIngredients,
}: ITableIngredients) => {
  // Estado para almacenar las filas de la tabla
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    setRows(dataIngredients);
  }, [dataIngredients]);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "40vh" }}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, i: number) => (
              <TableCell key={i} align={"center"}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow role="checkbox" tabIndex={-1} key={index}>
              {/* Celdas de la fila */}
              {columns.map((column, i: number) => {
                return (
                  <TableCell key={i} align={"center"}>
                    {
                      column.render ? ( // Si existe la función "render" se ejecuta
                        column.render(row)
                      ) : column.key === "actions" ? ( // Si el label de la columna es "Acciones" se renderizan los botones de acción
                        <Button
                          variant="text"
                          onClick={() => {
                            handleDeleteItem(index);
                          }}
                        >
                          Eliminar
                        </Button>
                      ) : (
                        row[column.key]
                      ) // Si no hay una función personalizada, se renderiza el contenido de la celda tal cual
                    }
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
