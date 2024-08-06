import { useEffect, useState, useCallback } from "react";
import Grid from "../Grid";
import { Tabs, Tab, Button } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import {
  getSemanas,
  obtenerSemanaProducto,
  getProductosAlimentacion,
  getProductoAlimentacionById,
  getProductosAlimentacionBySemana,
} from "../../api/api";
import { useParams } from "react-router-dom";
import ModalsAlimentacion from "./ModalsAlimentacion";

const Alimentacion = () => {
  const { idPlanta, nombrePlanta } = useParams();
  const [semanas, setSemanas] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openModal, setOpenModal] = useState("");
  const [prodAlimentacionGrid, setProdAlimentacionGrid] = useState([]);
  const [prodXSemana, setProdXSemana] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getSemanas().then((res) => {
      setSemanas(res.data);
    });
  }, []);

  const getProductosBySemana = async (idSemana) => {
    try {
      const res = await getProductosAlimentacionBySemana(idSemana);
      const columnas = [];
      for (const x of res.data) {
        const nombreProducto = await getProductoAlimentacionById(x.idProducto);
        columnas.push({
          field: nombreProducto.data[0].nombreProducto,
          headerName: nombreProducto.data[0].nombreProducto,
        });
      }
      setColumns(columnas);
    } catch (error) {
      console.error("Error en getProductosBySemana: ", error);
    }
  };

  const handleTabSelected = (tabSelected) => {
    getProductosBySemana(parseInt(tabSelected));
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
            variant="ghost"
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
            variant="ghost"
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
              <Grid className="w-full" columns={columns} data={[]} />
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
      />
    </div>
  );
};

export default Alimentacion;
