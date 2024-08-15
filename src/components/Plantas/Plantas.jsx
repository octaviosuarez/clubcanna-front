import { useState, useEffect } from "react";
import { addPlanta, getPlantas } from "../../api/api";
import Grid from "../Grid";
import { FaCannabis } from "react-icons/fa";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  DatePicker,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useNavigate } from 'react-router-dom';

const Plantas = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [plantas, setPlantas] = useState([]);
  const [nombrePlanta, setNombrePlanta] = useState("");
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  const [fechaCreacion, setFechaCreacion] = useState(parseDate(formattedToday));

  const columns = [
    { field: "nombrePlanta", headerName: "Nombre" },
    { field: "fechaCreacion", headerName: "Fecha creacion" },
    {
      field: "actions",
      headerName: "",
      cellRenderer: (props) => {
        return (
          <div className="flex w-full h-full justify-center items-center">
            <FaCannabis
              className="cursor-pointer"
              size={20}
              onClick={() => goToAlimentacion(props.data.idPlanta, props.data.nombrePlanta)}
            />
          </div>
        );
      },
    },
  ];

  const goToAlimentacion = (idPlanta, nombrePlanta) => {
    navigate(`/alimentacion/${idPlanta}/${nombrePlanta}`);
  };

  useEffect(() => {
    getPlantas().then((res) => {
      setPlantas(res.data);
    });
  }, []);

  const handleAddPlanta = () => {
    const { year, month, day } = fechaCreacion;
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    let newPlanta = {
      nombrePlanta,
      fechaCreacion: formattedDate,
    };
    addPlanta(newPlanta).then((res) => {
      getPlantas().then((res) => {
        setPlantas(res.data);
      });
    });
  };

  const onRowDoubleClick = (data) => {
    console.log("onRowDoubleClick", data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-1 pt-5 sm:p-4 xl:p-12">
      <div className="flex justify-between w-full gap-2">
        <h1 className="text-2xl font-semibold">Lista de plantas</h1>
        <Button
          onClick={() => {
            onOpen();
          }}
          color="primary"
        >
          Crear nueva planta
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <Grid
          columns={columns}
          data={plantas}
          onDoubleClick={onRowDoubleClick}
        />
      </div>
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col text-black gap-1">
                  Crear nueva planta
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col w-full justify-center items-left gap-5">
                    <Input
                      type="text"
                      label="Nueva planta"
                      onChange={(x) => setNombrePlanta(x.target.value)}
                    />
                    <DatePicker
                      label="Fecha de creacion"
                      value={fechaCreacion}
                      onChange={setFechaCreacion}
                    />
                    <Button
                      color="primary"
                      onClick={handleAddPlanta}
                      className="w-full"
                    >
                      Agregar
                    </Button>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
export default Plantas;
