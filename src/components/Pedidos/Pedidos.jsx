import { useEffect, useState } from 'react';
import Grid from '../Grid'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react';
import { obtenerPedidos, obtenerStock } from '../../api/api';

const Pedidos = () => {

    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([])
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
        { field: "pago_realizado", headerName: "Pagado", minWidth: 140, cellRenderer: 'agCheckboxCellRenderer' }
    ]

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
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
                pago_realizado: pedido.pago_realizado === 1 ? true : false
            }
        })
        setPedidos(newPedidos)
    }

    const onRowDoubleClick = (data) => {
        navigate(`/pedidos/${data.id}`)
    }

    const onNewPedido = () => {
        navigate('/pedidos/nuevo')
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-1 pt-5 xl:pt-16 xl:justify-start sm:p-4 xl:p-12">
            <h1 className="text-4xl">Lista de pedidos</h1>
            <div className="flex flex-col items-center justify-center w-full gap-4">
                <div className="md:self-end">
                    <Button color="primary" className="w-[180px]" onClick={onNewPedido}>Nuevo pedido</Button>
                </div>
                <Grid
                    columns={columns}
                    data={pedidos}
                    onDoubleClick={onRowDoubleClick}
                />
            </div>
        </div>
    )
}

export default Pedidos