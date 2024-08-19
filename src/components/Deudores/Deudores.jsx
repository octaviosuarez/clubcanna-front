import { useEffect, useState } from 'react';
import Grid from '../Grid'
import { useNavigate } from 'react-router-dom'
import { listarSociosConDeudaNoPaga, listarSociosConDeudaPaga, listarPedidosQueTienenDeuda, listarPedidosQueTienenDeudaPagada, listarPedidosQueTienenDeudaNoPagada } from '../../api/api';
import { Tabs, Tab } from '@nextui-org/react';
import './Deudores.css'
import { parse } from 'postcss';

const columnasSocios = [
    { field: "cedula", headerName: "Cédula", maxWidth: 120 },
    { field: "nombre_completo", minWidth: 150, headerName: "Nombre" },
    { field: "email" },
    { field: "saldo_negativo", headerName: "Saldo negativo", minWidth: 150 }
]

const columnasPedidos = [
    { field: "id", headerName: "ID", maxWidth: 120 },
    { field: "cedula_socio", headerName: "Cédula", maxWidth: 120 },
    { field: "id_producto", headerName: "ID Producto" },
    { field: "cantidad", headerName: "Cantidad", maxWidth: 120 },
    {
        field: "fecha_pedido", headerName: 'Fecha', minWidth: 150, cellRenderer: (data) => {
            if (data.value && data.value !== "0000-00-00") {
                return new Date(data.value).toLocaleDateString()
            } else {
                return ''
            }
        }
    },
    { field: "despachado", headerName: "Despachado", cellRenderer: 'agCheckboxCellRenderer' },
    { field: "pago_realizado", headerName: "Pago realizado", cellRenderer: 'agCheckboxCellRenderer' },
    { field: "monto", headerName: "Monto" },
    { field: "id_pedido", headerName: "ID Pedido", maxWidth: 120, hide: true }
]

const Deudores = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [listas, setListas] = useState({
        sociosConDeudasInpagas: {
            columns: columnasSocios,
            data: null
        },
        sociosConDeudasPagas: {
            columns: columnasSocios,
            data: null
        },
        pedidosConDeuda: {
            columns: columnasPedidos,
            data: null
        },
        pedidosConDeudasPagas: {
            columns: columnasPedidos,
            data: null
        },
        pedidosConDeudasInpagas: {
            columns: columnasPedidos,
            data: null
        },
    });

    const parseCheckboxs = (data) => {
        return data.map(d => {
            d.despachado = d.despachado === 1 ? true : false
            d.pago_realizado = d.pago_realizado === 1 ? true : false
            return d
        })
    }

    useEffect(() => {
        Promise.all([
            listarSociosConDeudaNoPaga(),
            listarSociosConDeudaPaga(),
            listarPedidosQueTienenDeuda(),
            listarPedidosQueTienenDeudaPagada(),
            listarPedidosQueTienenDeudaNoPagada()
        ]).then(res => {
            setListas({
                sociosConDeudasInpagas: {
                    columns: columnasSocios,
                    data: res[0]?.data
                },
                sociosConDeudasPagas: {
                    columns: columnasSocios,
                    data: res[1]?.data
                },
                pedidosConDeuda: {
                    columns: columnasPedidos,
                    data: parseCheckboxs(res[2]?.data)
                },
                pedidosConDeudasPagas: {
                    columns: columnasPedidos,
                    data: parseCheckboxs(res[3]?.data)
                },
                pedidosConDeudasInpagas: {
                    columns: columnasPedidos,
                    data: parseCheckboxs(res[4]?.data)
                },
            })
        })
    }, [])


    const onRowDoubleClick = (data, tipo) => {
        if (tipo === 'socio') {
            navigate(`/socios/${data.cedula}`)
        }
        if (tipo === 'pedido') {
            navigate(`/pedidos/${data.idPedido}`)
        }
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
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-1 pt-5 xl:pt-16 xl:justify-start sm:p-4 xl:p-12">
            <h1 className="text-4xl">Deudores</h1>
            <div className="flex flex-col justify-center w-full">
                <Tabs className="justify-center" aria-label="Options" classNames={{
                    tabList: isMobile ? 'deudoresTabs' : '',
                }}>
                    <Tab key="deudas_no_pagas" title="Deudas no pagas">
                        <Grid
                            columns={listas?.sociosConDeudasInpagas?.columns}
                            data={listas?.sociosConDeudasInpagas?.data}
                            onDoubleClick={(data) => onRowDoubleClick(data, 'socio')}
                        />
                    </Tab>
                    <Tab key="deudas_pagas" title="Deudas pagas">
                        <Grid
                            columns={listas?.sociosConDeudasPagas?.columns}
                            data={listas?.sociosConDeudasPagas?.data}
                            onDoubleClick={(data) => onRowDoubleClick(data, 'socio')}
                        />
                    </Tab>
                    <Tab key="pedidos_deuda" title="Pedidos con deuda">
                        <Grid
                            columns={listas?.pedidosConDeuda?.columns}
                            data={listas?.pedidosConDeuda?.data}
                            onDoubleClick={(data) => onRowDoubleClick(data, 'pedido')}
                        />
                    </Tab>
                    <Tab key="pedidos_deuda1" title="Pedidos con deudas pagas">
                        <Grid
                            columns={listas?.pedidosConDeudasPagas?.columns}
                            data={listas?.pedidosConDeudasPagas?.data}
                            onDoubleClick={(data) => onRowDoubleClick(data, 'pedido')}
                        />
                    </Tab>
                    <Tab key="pedidos_deuda2" title="Pedidos con deudas inpagas">
                        <Grid
                            columns={listas?.pedidosConDeudasInpagas?.columns}
                            data={listas?.pedidosConDeudasInpagas?.data}
                            onDoubleClick={(data) => onRowDoubleClick(data, 'pedido')}
                        />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default Deudores