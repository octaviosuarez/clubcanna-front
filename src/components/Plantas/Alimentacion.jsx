import { useEffect, useState, useCallback, useRef } from "react";
import Grid from "../Grid";
import { Tabs, Tab, Button, CircularProgress } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import {
  getSemanas,
  obtenerSemanaProducto,
  getProductosAlimentacion,
  getProductoAlimentacionById,
  getProductosAlimentacionBySemana,
  getFirmasBySemana,
  addFirmaProducto,
  getFirmasProducto,
  updateFirma,
  getUserByCi,
} from "../../api/api";
import { useParams } from "react-router-dom";
import ModalsAlimentacion from "./ModalsAlimentacion";
import { FaPencilAlt } from "react-icons/fa";

const Alimentacion = () => {
  const { idPlanta, nombrePlanta } = useParams();
  const [semanas, setSemanas] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openModal, setOpenModal] = useState("");
  const [prodAlimentacionGrid, setProdAlimentacionGrid] = useState([]);
  const [prodXSemana, setProdXSemana] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [rowSelected, setRowSelected] = useState(null);
  const userLogged = JSON.parse(localStorage.getItem("club-session"));
  useEffect(() => {
    getSemanas().then((res) => {
      setSemanas(res.data);
    });

    console.log("userLogged", userLogged);
  }, []);

  const getProductosBySemana = async (idSemana) => {
    try {
      setColumns([]);
      setLoading(true);
      const res = await getProductosAlimentacionBySemana(idSemana);
      const columnasProductos = [];
      for (const x of res.data) {
        const nombreProducto = await getProductoAlimentacionById(x.idProducto);
        columnasProductos.push({
          field: nombreProducto.data[0].idProducto.toString(),
          headerName: nombreProducto.data[0].nombreProducto,
          maxWidth: 150,
        });
      }

      const columnas = [
        { field: "fecha", headerName: "FECHA", maxWidth: 200 },
        {
          headerName: "Productos",
          children: columnasProductos,
        },
        { field: "observaciones", headerName: "OBSERVACIONES", maxWidth: 200 },
        {
          field: "action",
          headerName: "FIRMA",
          maxWidth: 200,
          cellRenderer: (props) => {
            return (
              <div className="flex w-full h-full justify-center items-center">
                <Button
                  color="primary"
                  variant="ghost"
                  size="sm"
                  startContent={<FaPencilAlt />}
                  onClick={() => handleFirmaProducto(props)}
                >
                  Firmar
                </Button>
              </div>
            );
          },
        },
        { field: "responsable", headerName: "RESPONSABLE", maxWidth: 200 },
      ];
      setColumns(columnas);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getNameUserByCi = async (cedula) => {
    if (cedula) {
      const res = await getUserByCi(cedula);
      return res.data[0].nombre;
    } else {
      return "Sin responsable";
    }
  };

  const handleTabSelected = async (tabSelected) => {
    let rowsData = [];
    await getProductosBySemana(parseInt(tabSelected));

    const firmasRes = await getFirmasBySemana(parseInt(tabSelected));
    const firmasPromises = firmasRes.data.map(async (x) => {
      x.fecha = x.fecha.split("T")[0];
      const firmasProductoRes = await getFirmasProducto(x.fecha, idPlanta);
      // x.responsable = await getNameUserByCi(x.idJardinero);
      x.responsable = 123;
      const productoCantidadArray =
        firmasProductoRes.data[0]?.producto_cantidad?.split(",");
      if (productoCantidadArray) {
        productoCantidadArray.forEach((pair) => {
          const [producto, cantidad] = pair.split(":");
          x[producto] = cantidad;
        });
      }
      return x;
    });

    const firmasData = await Promise.all(firmasPromises);
    rowsData.push(...firmasData);
    setRowData(rowsData);
  };

  const handleFirmaProducto = (props) => {
    //GUARDAMOS FIRMA PRODUCTO Y ACTUALIZAMOS FIRMA PARA METER LA OBSERVACION, DESPUES VAMOS A SUMAR LA FIRMA DEL JARDINERO
    const productos = [];
    for (const key in props.data) {
      if (
        !["fecha", "idSemanaProducto", "idPlanta", "idJardinero"].includes(key)
      ) {
        productos.push({
          idProducto: parseInt(key),
          cantidad: props.data[key],
        });
      }
    }

    productos.forEach((producto) => {
      let data = {
        fecha: props.data.fecha,
        idProducto: producto.idProducto,
        cantidadProducto: producto.cantidad,
      };
      addFirmaProducto(data).then((res) => {
        console.log(res);
      });
    });

    updateFirma(
      props.data.observaciones,
      userLogged.cedula,
      props.data.fecha
    ).then((res) => {
      console.log("res", res);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-1 pt-5 sm:p-4 xl:p-12">
      <div className="flex justify-between w-full gap-2">
        <div className="flex gap-2">
          <h1 className="text-2xl">Alimentacion diaria:</h1>
          <p className="text-2xl font-semibold">{nombrePlanta}</p>
        </div>
        <div className="flex gap-5">
          <Button
            onClick={() => {
              getProductosAlimentacion().then((res) => {
                setProdAlimentacionGrid(res.data);
                setOpenModal("productos");
                onOpen();
              });
            }}
            color="primary"
          >
            Productos
          </Button>
          <Button
            onClick={() => {
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
              setOpenModal("prodXSemana");
              onOpen();
            }}
            color="primary"
          >
            Productos x Semana
          </Button>
        </div>
      </div>
      <Tabs onSelectionChange={handleTabSelected} className="w-full">
        {semanas.map((x, index) => (
          <Tab key={x.idSemana} title={x.nombreSemana} className="w-full">
            <div className="flex flex-col w-full">
              <p className="text-2xl font-semibold">{x.nombreSemana}</p>
              <Grid
                className="w-full"
                columns={columns}
                data={rowData}
                setRowSelected={setRowSelected}
              />
            </div>
          </Tab>
        ))}
      </Tabs>
      <ModalsAlimentacion
        isOpen={isOpen}
        onClose={onClose}
        openModal={openModal}
        prodAlimentacionGrid={prodAlimentacionGrid}
        prodXSemana={prodXSemana}
        setProdXSemana={setProdXSemana}
        setProdAlimentacionGrid={setProdAlimentacionGrid}
        setSemanas={setSemanas}
        semanas={semanas}
        setLoading={setLoading}
      />
      {loading && (
        <div className="absolute">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Alimentacion;
