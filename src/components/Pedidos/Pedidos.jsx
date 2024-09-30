import { useEffect, useState } from 'react';
import Grid from '../Grid'
import { useNavigate } from 'react-router-dom'
import { Button, Divider, Select, SelectItem } from '@nextui-org/react';
import { obtenerPedidos, obtenerStock, getCierreMensual, getCierreDiario } from '../../api/api';
import { Card, CardBody } from "@nextui-org/react";

const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const Pedidos = () => {

    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([])
    const [pedidosFiltrados, setPedidosFiltrados] = useState([]);
    const [mesSeleccionado, setMesSeleccionado] = useState("");
    const [totalDia, setTotalDia] = useState(0);
    const [totalMes, setTotalMes] = useState(0);
    const columns = [
        { field: "id", maxWidth: 70 },
        { field: "cedula_socio", headerName: "Cliente", maxWidth: 120 },
        { field: "raza", minWidth: 150 },
        { field: "cantidad", headerName: "Grs.", maxWidth: 90 },
        {
            field: "fecha_pedido", headerName: 'Fecha', minWidth: 150, cellRenderer: (data) => {
                if (data.value && data.value !== "0000-00-00") {
                    return new Date(data.value).toLocaleDateString()
                } else {
                    return ''
                }
            }
        },
        { field: "despachado", minWidth: 140, cellRenderer: 'agCheckboxCellRenderer' },
        { field: "pago_realizado", headerName: "Pagado", minWidth: 140, cellRenderer: 'agCheckboxCellRenderer' },
        { field: "tipo_pago", headerName: 'Tipo de pago', minWidth: 150 },
    ]

    useEffect(() => {
        loadData();
    }, [])

    useEffect(() => {
        filtrarPedidosPorMes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mesSeleccionado, pedidos]);

    const filtrarPedidosPorMes = () => {
        if (mesSeleccionado === "" || mesSeleccionado === "-1") {
            setPedidosFiltrados(pedidos);
        } else {
            const mesIndex = parseInt(mesSeleccionado);
            const pedidosFiltrados = pedidos.filter(pedido => {
                const fecha = new Date(pedido.fecha_pedido);
                return fecha.getMonth() === mesIndex;
            });
            setPedidosFiltrados(pedidosFiltrados);
        }
    }

    const loadData = async () => {

        //Pedidos
        let res = await obtenerStock()
        const productos = res?.data;
        let resPedidos = await obtenerPedidos();
        let newPedidos = resPedidos?.data.map(pedido => {
            let raza = productos.find(producto => producto.id === pedido.id_producto)
            return {
                id: pedido.id,
                raza: raza?.raza,
                cedula_socio: pedido.cedula_socio,
                cantidad: pedido.cantidad,
                fecha_pedido: pedido.fecha_pedido,
                despachado: pedido.despachado === 1 ? true : false,
                pago_realizado: pedido.pago_realizado === 1 ? true : false,
                tipo_pago: pedido.tipo_pago
            }
        })
        setPedidos(newPedidos)

        //Cierre diario
        let resCierreDiario = await getCierreDiario()
        let totalDia = resCierreDiario?.data[0]?.total_monto || 0;
        setTotalDia(totalDia);

        //Cierre mensual
        let resCierreMensual = await getCierreMensual(parseInt(mesSeleccionado) + 1)
        let totalMes = resCierreMensual?.data[0]?.total_monto || 0;
        setTotalMes(totalMes);

    }

    const onRowDoubleClick = (data) => {
        navigate(`/pedidos/${data.id}`)
    }

    const onNewPedido = () => {
        navigate('/pedidos/nuevo')
    }

    const handleMesChange = (e) => {
        setMesSeleccionado(e.target.value);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-1 pt-5 xl:pt-16 xl:justify-start sm:p-4 xl:p-12">
            <h1 className="text-4xl">Lista de pedidos</h1>
            <div className="flex flex-col items-center justify-center w-full gap-4">
                <div className="flex justify-between w-full">
                    <Card className="mt-8">
                        <CardBody >
                            <div className="flex items-center">
                                <p className="w-[150px]">Total mes: ${totalMes}</p>
                                <Divider orientation="vertical" />
                                <p className="w-[150px]">Total día: ${totalDia}</p>
                                <Divider orientation="vertical" />
                                <Select className='w-[170px]' placeholder='Mes' variant="underlined" onChange={handleMesChange}>
                                    <SelectItem key={"-1"} value={""}>
                                        Seleccionar mes
                                    </SelectItem>
                                    {meses.map((mes, index) => (
                                        <SelectItem key={index} value={mes}>
                                            {mes}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                        </CardBody>
                    </Card>
                    <div className="md:self-end">
                        <Button color="primary" className="w-[180px]" onClick={onNewPedido}>Nuevo pedido</Button>
                    </div>
                </div>
                <Grid
                    columns={columns}
                    data={pedidosFiltrados}
                    onDoubleClick={onRowDoubleClick}
                />
            </div>
        </div>
    )
}

export default Pedidos