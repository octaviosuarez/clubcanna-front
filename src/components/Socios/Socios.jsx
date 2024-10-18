import { useEffect, useState } from 'react';
import Grid from '../Grid'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure } from '@nextui-org/react';
import { obtenerSocios, eliminarSocio } from '../../api/api';
import { TbTrash } from 'react-icons/tb';
import { toast } from 'react-toastify';

const Socios = () => {

    const navigate = useNavigate();
    const [socios, setSocios] = useState([])
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [userToDelete, setUserToDelete] = useState(null);

    const columns = [
        { field: "cedula", headerName: "Cédula", maxWidth: 120 },
        { field: "nombre_completo", minWidth: 150, headerName: "Nombre" },
        { field: "email" },
        { field: "celular", headerName: "Celular", minWidth: 170 },
        { field: "es_deudor", headerName: "Deudor", minWidth: 120, cellRenderer: 'agCheckboxCellRenderer' },
        { field: "tipo_socio", headerName: "VIP", minWidth: 150, cellRenderer: 'agCheckboxCellRenderer' },
        { field: "saldo_negativo", headerName: "Saldo negativo", minWidth: 170 },
        {
            field: "actions",
            headerName: "Acciones",
            cellRenderer: (params) => (
                <div onClick={() => openDeleteModal(params.data.cedula)} className="flex items-center justify-center my-[6px] ml-2 bg-red-500 rounded cursor-pointer w-7 h-7">
                    <TbTrash size={20} color='white' />
                </div>
            )
        }
    ]

    const openDeleteModal = (cedula) => {
        setUserToDelete(cedula);
        onOpen();
    }

    const handleDeleteUser = (onClose) => {
        eliminarSocio({ cedula: userToDelete })
            .then(() => {
                setSocios(socios.filter(s => s.cedula !== userToDelete));
                toast.warning('Usuario eliminado')
            })
            .catch(error => console.error("Error al eliminar:", error))
            .finally(() => {
                onClose();
            })
    }

    useEffect(() => {
        obtenerSocios().then((res) => {
            let newSocios = res.data.map(socio => {
                socio.es_deudor = socio.es_deudor === 1 ? true : false;
                socio.tipo_socio = socio.tipo_socio === 'vip' ? true : false;
                return socio
            })
            setSocios(newSocios)
        });
    }, [])


    const onRowDoubleClick = (data) => {
        navigate(`/socios/${data.cedula}`)
    }

    const onNewSocio = () => {
        navigate('/socios/nuevo')
    }


    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-1 pt-5 xl:pt-16 xl:justify-start sm:p-4 xl:p-12">
            <Modal backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <h3>Confirmar eliminación</h3>
                            </ModalHeader>
                            <ModalBody>
                                <p>¿Está seguro de eliminar este usuario?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button auto color="danger" onPress={() => handleDeleteUser(onClose)}>
                                    Eliminar
                                </Button>
                                <Button auto color="primary" onPress={onClose}>
                                    Cancelar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <h1 className="text-4xl">Lista de socios</h1>
            <div className="flex flex-col items-center justify-center w-full gap-4 xl:">
                <div className="md:self-end">
                    <Button color="primary" className="w-[180px]" onClick={onNewSocio}>Nuevo socio</Button>
                </div>
                <Grid
                    columns={columns}
                    data={socios}
                    onDoubleClick={onRowDoubleClick}
                />
            </div>
        </div>
    )
}

export default Socios