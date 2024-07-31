import { Checkbox, Divider, Input, Button, Select, SelectItem } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import useStore from '../../../store/useStore';
import { crearPedido, obtenerStock } from '../../../api/api';

const Pedido = () => {

    const { userData } = useStore();
    const navigate = useNavigate();

    const [pedido, setPedido] = useState({
        cedula: userData?.level === 'admin' ? '' : userData?.cedula,
        idRaza: '',
        gramos: '',
        despachado: false,
        pago_realizado: false
    })

    const [stock, setStock] = useState([])

    const { id } = useParams();

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        let res = await obtenerStock()
        const razas = res?.data;
        setStock(razas)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (pedido.cedula === '') {
            toast.error('Debe ingresar cédula')
            return
        }
        if (pedido.idRaza === '') {
            toast.error('Debe seleccionar una raza')
            return
        }
        if (pedido.gramos === '') {
            toast.error('Debe ingresar gramos')
            return
        }

        let gramos = parseInt(pedido.gramos)
        let stockRaza = stock.find(raza => raza.id === parseInt(pedido.idRaza))?.stock

        if (!stockRaza) {
            toast.error('La raza no tiene stock')
            return
        }

        if (parseInt(gramos) <= 0) {
            toast.error('Debe ingresar una cantidad válida')
            return
        }

        if (parseInt(gramos) > parseInt(stockRaza)) {
            toast.error(`Stock insuficiente, diponible: ${stockRaza} gs.`)
            return
        }

        if (id === 'nuevo') {
            let newPedido = {
                cedula_socio: pedido.cedula,
                id_producto: pedido.idRaza,
                cantidad: pedido.gramos,
                despachado: pedido.despachado ? 1 : 0,
                pago_realizado: pedido.pago_realizado ? 1 : 0,
                //Date in format YYYY-MM-DD
                fecha_pedido: new Date().toISOString().split('T')[0]
            }
            await crearPedido(newPedido)
            toast.success('Pedido creado correctamente')
        } else {
            // await actualizarSocio(pedido
            toast.success('Pedido actualizado correctamente')
        }

        if (userData.level === 'user') {
            navigate('/mis-pedidos')
        } else {
            navigate('/pedidos')
        }

    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col w-full max-w-[600px] gap-4 p-6 sm:border rounded-md">
                <p className="w-full mb-2 text-3xl text-center">Datos del pedido</p>
                <Divider />
                {id !== 'nuevo' && <Input isDisabled variant="underlined" size={'sm'} labelPlacement={'outside'} label="Número de pedido" value={id} />}
                <Input isDisabled={userData?.level !== 'admin'} variant="underlined" size={'sm'} placeholder="Ingrese cédula" labelPlacement={'outside'} label="Cédula" onChange={(e) => setPedido({ ...pedido, cedula: e.target.value })} value={pedido.cedula} />
                <Select
                    variant="underlined"
                    label="Selecciona una raza"
                    onChange={(e) => setPedido({ ...pedido, idRaza: e.target.value })}
                >
                    {stock?.map((raza) => (
                        <SelectItem key={raza.id}>
                            {raza.raza}
                        </SelectItem>
                    ))}
                </Select>

                <Input variant="underlined" size={'sm'} placeholder={'Ingresar gramos'} labelPlacement={'outside'} label="Gramos" onChange={(e) => setPedido({ ...pedido, gramos: e.target.value })} value={pedido.gramos} />

                {((userData?.level === 'user' && id !== 'nuevo') || userData?.level === 'admin') && <Checkbox
                    label="Despachado"
                    checked={pedido.despachado}
                    onChange={(e) => setPedido({ ...pedido, despachado: e.target.checked })}
                    isDisabled={userData?.level !== 'admin'}
                >
                    Despachado
                </Checkbox>}
                {((userData?.level === 'user' && id !== 'nuevo') || userData?.level === 'admin') && <Checkbox
                    label="Pagado"
                    checked={pedido.pago_realizado}
                    onChange={(e) => setPedido({ ...pedido, pago_realizado: e.target.checked })}
                    isDisabled={userData?.level !== 'admin'}
                >
                    Pagado
                </Checkbox>}
                <Divider />
                <div className="flex items-center justify-center w-full mt-2">
                    <Button color="primary" type="submit" onClick={handleSubmit} className="w-full sm:w-[250px]" block>Confirmar</Button>
                </div>
            </div>
        </div>
    )
}

export default Pedido