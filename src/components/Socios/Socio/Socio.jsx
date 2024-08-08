import { Checkbox, Divider, Input, Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { crearUsuario, obtenerSocio } from '../../../api/api';

const Socio = () => {
    const [user, setUser] = useState({
        cedula: '',
        nombre_completo: "",
        email: "",
        //telefono: "",
        consumo_mensual: '',
        es_deudor: false,
        saldo_negativo: ''
    })
    const { cedula } = useParams();
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (cedula !== 'nuevo') {
            obtenerSocio(cedula).then((res) => {
                let newUserData = res?.data[0];
                newUserData.es_deudor = newUserData.es_deudor === 1 ? true : false
                setUser(newUserData)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (cedula === 'nuevo') {
            try {
                let newUser = {
                    ...user,
                    tipo_de_usuario: 'Socio',
                    es_deudor: user.es_deudor ? 1 : 0
                }
                await crearUsuario(newUser)
                toast.success('Socio creado correctamente')
                navigate('/socios')
            } catch (error) {
                toast.error('Error al crear el socio')
            }
        } else {
            // await actualizarSocio(user
            toast.success('Socio actualizado correctamente')
        }
    }


    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col w-full max-w-[600px] gap-4 p-6 sm:border rounded-md">
                <p className="w-full mb-2 text-3xl text-center">Datos del socio</p>
                <Divider />
                <Input variant="underlined" size={'sm'} placeholder="Ingrese cédula" labelPlacement={'outside'} label="Cédula" onChange={(e) => setUser({ ...user, cedula: e.target.value })} value={user.cedula} />
                <Input variant="underlined" size={'sm'} placeholder={'Ingrese nombre'} labelPlacement={'outside'} label="Nombre" onChange={(e) => setUser({ ...user, nombre_completo: e.target.value })} value={user.nombre_completo} />
                <Input variant="underlined" size={'sm'} placeholder="Ingrese email" labelPlacement={'outside'} label="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} />
                {/*<Input variant="underlined" size={'sm'} placeholder="Ingrese teléfono" labelPlacement={'outside'} label="Teléfono" onChange={(e) => setUser({ ...user, telefono: e.target.value })} value={user.telefono} />*/}
                <Input variant="underlined" size={'sm'} placeholder="Ingrese consumo mensual" labelPlacement={'outside'} label="Consumo mensual" onChange={(e) => setUser({ ...user, consumo_mensual: e.target.value })} value={user.consumo_mensual} />
                <Input variant="underlined" size={'sm'} labelPlacement={'outside'} label="Saldo negativo" onChange={(e) => setUser({ ...user, saldo_negativo: e.target.value })} value={user.saldo_negativo} />

                <Checkbox
                    label="Es deudor"
                    isSelected={user.es_deudor}
                    onChange={(e) => setUser({ ...user, es_deudor: e.target.checked })}
                >
                    Es deudor
                </Checkbox>
                <Divider />
                <div className="flex items-center justify-center w-full mt-2">
                    <Button color="primary" type="submit" onClick={handleSubmit} className="w-full sm:w-[250px]" block>Confirmar</Button>
                </div>
            </div>
        </div>
    )
}

export default Socio