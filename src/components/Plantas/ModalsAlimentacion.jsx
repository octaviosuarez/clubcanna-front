import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { CiTrash } from "react-icons/ci";
import {
  getSemanas,
  addSemanaProducto,
  obtenerSemanaProducto,
  getProductosAlimentacion,
  addProductoAlimentacion,
  deleteProductoAlimentacion,
  getProductoAlimentacionById,
  deleteSemanaProducto,
} from "../../api/api";
import Grid from "../Grid";

const ModalsAlimentacion = ({
  prodAlimentacionGrid,
  prodXSemana,
  openModal,
  onClose,
  isOpen,
  setProdXSemana,
  setProdAlimentacionGrid,
  setSemanas,
  semanas,
  setLoading,
}) => {
  const [producto, setProducto] = useState(new Set([]));
  const [productosAlimentacion, setProductosAlimentacion] = useState([]);
  const [semanaSeleccionada, setSemanaSeleccionada] = useState("");
  const [prodAlimentacionTxt, setProdAlimentacionTxt] = useState("");

  useEffect(() => {
    getProductosAlimentacion().then((res) => {
      setProductosAlimentacion(res.data);
    });
  }, []);

  const columnsModalProductosAlimentacion = [
    { field: "nombreProducto", headerName: "Producto" },
    {
      field: "actions",
      headerName: "Eliminar",
      cellRenderer: (props) => {
        return (
          <>
            <CiTrash
              className="cursor-pointer"
              size={20}
              color="red"
              onClick={(e) => {
                deleteProductoAlimentacion(props.data).then((res) => {
                  getProductosAlimentacion().then((res) => {
                    setProdAlimentacionGrid(res.data);
                  });
                });
              }}
            />
          </>
        );
      },
    },
  ];
  const columnsModalSemanaXProducto = [
    { field: "idSemana", headerName: "Semana" },
    { field: "nombreProducto", headerName: "Producto" },
    {
      field: "actions",
      headerName: "Eliminar",
      cellRenderer: (props) => {
        return (
          <>
            <CiTrash
              className="cursor-pointer"
              size={20}
              color="red"
              onClick={(e) => {
                deleteSemanaProducto(props.data).then((res) => {
                  obtenerSemanaProducto().then((dataSemanaProducto) => {
                    const promises = dataSemanaProducto.data.map((x) =>
                      getProductoAlimentacionById(x.idProducto).then((res) => {
                        x.nombreProducto = res.data[0].nombreProducto;
                        return x;
                      })
                    );
                    Promise.all(promises).then((result) => {
                      setProdXSemana(result);
                    });
                  });
                });
              }}
            />
          </>
        );
      },
    },
  ];

  const handleProductos = () => {
    addProductoAlimentacion({ nombreProducto: prodAlimentacionTxt }).then(
      (res) => {
        getProductosAlimentacion().then((res) => {
          setProdAlimentacionGrid(res.data);
        });
      }
    );
  };

  const handleAddSemanaProduto = async () => {
    const productoArray = Array.from(producto);
    productoArray.forEach((x) => {
      addSemanaProducto({
        idSemana: semanaSeleccionada,
        idProducto: parseInt(x),
      }).then((res) => {
        obtenerSemanaProducto().then((dataSemanaProducto) => {
          const promises = dataSemanaProducto.data.map((x) =>
            getProductoAlimentacionById(x.idProducto).then((res) => {
              x.nombreProducto = res.data[0].nombreProducto;
              return x;
            })
          );
          Promise.all(promises).then((result) => {
            setProdXSemana(result);
          });
        });
      });
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) =>
            openModal === "productos" ? (
              <>
                <ModalHeader className="flex flex-col text-black gap-1">
                  Agregar productos para alimentacion
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col w-full justify-center items-left gap-5">
                    <Input
                      type="text"
                      label="Nuevo producto"
                      onChange={(x) => setProdAlimentacionTxt(x.target.value)}
                    />
                    <Button
                      color="primary"
                      className="w-full"
                      onClick={handleProductos}
                    >
                      Agregar
                    </Button>
                    <Grid
                      className="w-full"
                      data={prodAlimentacionGrid}
                      columns={columnsModalProductosAlimentacion}
                    />
                  </div>
                </ModalBody>
              </>
            ) : openModal === "prodXSemana" ? (
              <>
                <ModalHeader className="flex flex-col text-black gap-1">
                  Productos x Semanas
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col w-full justify-center items-left gap-5">
                    <Select
                      placeholder="Seleccionar una semana"
                      className="w-full"
                      aria-label="Seleccionar una semana"
                      size="lg"
                    >
                      {semanas.map((x) => (
                        <SelectItem
                          key={x.idSemana}
                          onClick={() => setSemanaSeleccionada(x.idSemana)}
                        >
                          {x.nombreSemana}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      placeholder="Seleccionar un producto"
                      className="w-full"
                      selectionMode="multiple"
                      size="lg"
                      selectedKeys={producto}
                      aria-label="Seleccionar un producto"
                      onSelectionChange={setProducto}
                    >
                      {productosAlimentacion.map((x) => (
                        <SelectItem key={x.idProducto}>
                          {x.nombreProducto}
                        </SelectItem>
                      ))}
                    </Select>
                    <Button
                      color="primary"
                      className="w-full"
                      aria-label="Agregar"
                      onClick={handleAddSemanaProduto}
                    >
                      Agregar
                    </Button>
                    <Grid
                      className="w-full"
                      data={prodXSemana}
                      columns={columnsModalSemanaXProducto}
                    />
                  </div>
                </ModalBody>
              </>
            ) : null
          }
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalsAlimentacion;
