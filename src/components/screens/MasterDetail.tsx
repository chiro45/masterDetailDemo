import { useEffect, useState } from "react";
import { MasterDetailModal } from "../ui/modals/MasterDetailModal/MasterDetailModal";
import { NavBar } from "../ui/NavBar/NavBar";
import { TableGeneric } from "../ui/TableGeneric/TableGeneric";
import { IarticuloManufacturado } from "../../types/articuloManufacturado";
import { ProductoManufacturadoService } from "../../services/ProductoManufacturadoService";
import { useAppDispatch } from "../../hooks/redux";
import {
  removeElementActive,
  setDataTable,
} from "../../redux/slices/TablaReducer";
import { Button } from "@mui/material";
// Definición de la URL base de la API
const API_URL = import.meta.env.VITE_API_URL;

const ColumnsProductosManufacturados = [
  { label: "Id", key: "id" },
  { label: "Nombre", key: "denominacion" },
  {
    label: "Categoria",
    key: "categoria",
    render: (element: IarticuloManufacturado) => element.categoria.denominacion,
  },
  {
    label: "Tiempo de cocina",
    key: "tiempoEstimadoMinutos",
  },
  {
    label: "Alta/baja",
    key: "alta",
    render: (element: IarticuloManufacturado) => (element.alta ? "Si" : "No"),
  },
  {
    label: "precio",
    key: "precioVenta",
  },
  {
    label: "Acciones",
    key: "actions",
  },
];

export const MasterDetail = () => {
  //manejo de estado del modal
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(removeElementActive()); //al cerrar el modal siempre reseteamos el elemento activo
  };

  //instanciamos el loader de la carga de datos
  const [loading, setLoading] = useState<boolean>(false);

  //instanciamos el dispatch
  const dispatch = useAppDispatch();

  //instanciamos los servicios
  const productoManufacturadoService = new ProductoManufacturadoService(
    `${API_URL}/producto_manufacturado`
  );

  // Función para obtener los productos manufacturados
  const getDataTable = async () => {
    await productoManufacturadoService.getAll().then((dataTable) => {
      dispatch(setDataTable(dataTable));
      setLoading(false);
    });
  };

  // Efecto para cargar los datos al inicio
  useEffect(() => {
    setLoading(true);
    getDataTable();
  }, []);

  //funcion para eleminar un elemento
  const handleDelete = async (id: number) => {
    await productoManufacturadoService.delete(id);
    dispatch(removeElementActive());
    getDataTable();
  };
  
  //funcion para dar de baja o alta un elemento
  const handleCancelOrRegister = async (id: number, data: any) => {
    await productoManufacturadoService.put(id, data);
    dispatch(removeElementActive());
    getDataTable();
  };

  return (
    <div>
      <NavBar />
      <div
        style={{
          height: "6vh",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "20%",
            padding: ".4rem",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Agregar Articulo manufacturado
          </Button>
        </div>
      </div>

      {!loading ? (
        // Mostrar la tabla de personas una vez que los datos se han cargado
        <TableGeneric<IarticuloManufacturado>
          handleDelete={handleDelete}
          columns={ColumnsProductosManufacturados}
          setOpenModal={setOpenModal}
          handleCancelOrRegister={handleCancelOrRegister}
        />
      ) : (
        <h2>Cargando</h2>
      )}
      <MasterDetailModal
        getData={getDataTable}
        open={openModal}
        handleClose={handleCloseModal}
      />
    </div>
  );
};
