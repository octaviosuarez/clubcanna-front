import { useEffect, useState } from 'react';
import Grid from '../Grid'
import { useNavigate } from 'react-router-dom'
import { obtenerSocios } from '../../api/api';
import { Tabs, Tab } from '@nextui-org/react';
import './Deudores.css'

const Deudores = () => {

    const navigate = useNavigate();
    const [socios, setSocios] = useState([])
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    const columns = [
        { field: "cedula", headerName: "Cédula", maxWidth: 120 },
        { field: "nombre_completo", minWidth: 150, headerName: "Nombre" },
        //{ field: "telefono", headerName: "Teléfono", maxWidth: 150 },
        { field: "email" },
        { field: "consumo_mensual", headerName: "Consumo mensual", minWidth: 170 },
        { field: "es_deudor", headerName: "Deudor", minWidth: 120, cellRenderer: 'agCheckboxCellRenderer' }
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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-1 pt-5 sm:p-4 xl:p-12">
            <h1 className="text-4xl">Deudores</h1>
            <div className="flex flex-col justify-center w-full">
                <Tabs className="justify-center" aria-label="Options" classNames={{
                    tabList: isMobile ? 'deudoresTabs' : '',
                }}>
                    <Tab key="deudas_no_pagas" title="Deudas no pagas">
                        <Grid
                            columns={columns}
                            data={socios}
                            onDoubleClick={onRowDoubleClick}
                        />
                    </Tab>
                    <Tab key="deudas_pagas" title="Deudas pagas">
                        <Grid
                            columns={columns}
                            data={socios}
                            onDoubleClick={onRowDoubleClick}
                        />
                    </Tab>
                    <Tab key="pedidos_deuda" title="Pedidos con deuda">
                        <Grid
                            columns={columns}
                            data={socios}
                            onDoubleClick={onRowDoubleClick}
                        />
                    </Tab>
                    <Tab key="pedidos_deuda1" title="Pedidos con deudas pagas">
                        <Grid
                            columns={columns}
                            data={socios}
                            onDoubleClick={onRowDoubleClick}
                        />
                    </Tab>
                    <Tab key="pedidos_deuda2" title="Pedidos con deudas inpagas">
                        <Grid
                            columns={columns}
                            data={socios}
                            onDoubleClick={onRowDoubleClick}
                        />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default Deudores