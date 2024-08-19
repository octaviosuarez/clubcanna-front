import { Divider, Input, Button } from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { crearRaza } from '../../../api/api';

const Raza = () => {
    const [raza, setRaza] = useState({
        nombre: "",
        precio: 0,
        stock: ""
    })
    const [valor, setValor] = useState(0)
    const [opcion, setOpcion] = useState('aumentar')
    const { id } = useParams();
    const navigate = useNavigate();

    // con la cédula iría a buscar los datos del socio

    /*
        get razas from api
        useEffect(() => {
            obtenerRaza(id).then((res) => {
                setRaza(res.data)
            }
        }, [])
    */

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (id === 'nuevo') {
            try {
                await crearRaza({
                    raza: raza.nombre,
                    precio: raza.precio,
                    stock: raza.stock
                })
                toast.success('Raza creada correctamente')
                navigate('/stock')
            } catch (error) {
                toast.error('Error al crear la raza')
            }
        } else {
            try {
                // await actualizarRaza(raza)
                toast.success('Raza actualizada correctamente')
            } catch (error) {
                toast.error('Error al actualizar la raza')
            }
        }
    }

    const handleDiscount = () => {
        if (valor > raza.stock) {
            toast.error('No puedes descontar más de lo que tienes')
        } else {
            setRaza({ ...raza, stock: raza.stock - valor })
        }
    }

    const handleAdd = () => {
        setRaza({ ...raza, stock: raza.stock + valor })
    }

    const handleChangeStock = () => {
        console.log(opcion, valor)
        if (opcion === 'aumentar') {
            handleAdd()
        } else {
            handleDiscount()
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col w-full max-w-[600px] gap-4 p-6 sm:border rounded-md">
                <p className="w-full mb-2 text-3xl text-center">Datos de la raza</p>
                <Divider />
                <Input variant="underlined" size={'sm'} placeholder="Ingrese nombre" labelPlacement={'outside'} label="Nombre" onChange={(e) => setRaza({ ...raza, nombre: e.target.value })} value={raza.nombre} />
                <Input variant="underlined" size={'sm'} placeholder={'Ingrese precio'} labelPlacement={'outside'} label="Precio" onChange={(e) => setRaza({ ...raza, precio: e.target.value })} value={raza.precio} />
                <Input type="number" variant="underlined" size={'sm'} placeholder="Ingrese stock actual" labelPlacement={'outside'} label="Stock" onChange={(e) => setRaza({ ...raza, stock: e.target.value })} value={raza.stock} />
                <Divider />

                {id !== 'nuevo' &&
                    <>
                        <div className="flex flex-col items-center justify-center gap-4">
                            <h2>Manejo de stock</h2>
                            <Divider />
                            <div className="flex flex-col items-center justify-center w-full gap-4 sm:flex-row">
                                <Input
                                    placeholder="0.00"
                                    labelPlacement="outside"
                                    onChange={(e) => setValor(e.target.value)}
                                    endContent={
                                        <div className="flex items-center">
                                            <label className="sr-only" htmlFor="type">
                                                Tipo
                                            </label>
                                            <select
                                                className="bg-transparent border-0 outline-none text-default-400 text-small"
                                                id="type"
                                                name="type"
                                                onChange={(e) => setOpcion(e.target.value)}
                                            >
                                                <option value="aumentar">Aumentar</option>
                                                <option value="descontar">Descontar</option>
                                            </select>
                                        </div>
                                    }
                                    type="number"
                                />
                                <Button onClick={handleChangeStock} className="w-full sm:w-[250px]" block>{
                                    opcion === 'aumentar' ? 'Aumentar' : 'Descontar'
                                }</Button>
                            </div>
                        </div>
                        <Divider />
                    </>
                }

                <div className="flex items-center justify-center w-full mt-2">
                    <Button color="primary" type="submit" onClick={handleSubmit} className="w-full sm:w-[250px]" block>Confirmar</Button>
                </div>
            </div>
        </div>
    )
}

export default Raza