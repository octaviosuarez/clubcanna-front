import { useEffect, useState } from 'react';
import Grid from '../Grid'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react';
import { obtenerSocios } from '../../api/api';

const Socios = () => {

    const navigate = useNavigate();
    const [socios, setSocios] = useState([])

    const columns = [
        { field: "cedula", headerName: "Cédula", maxWidth: 120 },
        { field: "nombre_completo", minWidth: 150, headerName: "Nombre" },
        //{ field: "telefono", headerName: "Teléfono", maxWidth: 150 },
        { field: "email" },
        { field: "consumo_mensual", headerName: "Consumo mensual", minWidth: 170 },
        { field: "es_deudor", headerName: "Deudor", minWidth: 120, cellRenderer: 'agCheckboxCellRenderer' },
        { field: "saldo_negativo", headerName: "Saldo negativo", minWidth: 170 }
    ]

    useEffect(() => {
        obtenerSocios().then((res) => {
            let newSocios = res.data.map(socio => {
                socio.es_deudor = socio.es_deudor === 1 ? true : false
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
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-1 pt-5 sm:p-4 xl:p-12">
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