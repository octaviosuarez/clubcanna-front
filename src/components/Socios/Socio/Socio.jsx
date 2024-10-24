import { Checkbox, Divider, Input, Button, Select, SelectItem } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { actualizarSocio, crearUsuario, obtenerSocio } from '../../../api/api';

const Socio = () => {
    const [user, setUser] = useState({
        cedula: '',
        nombre_completo: "",
        email: "",
        //telefono: "",
        celular: '',
        es_deudor: false,
        saldo_negativo: '',
        tipo_de_usuario: 'Socio',
        tipo_socio: 'regular',
        clave: '',
    })
    const { cedula } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (cedula !== 'nuevo') {
            obtenerSocio(cedula).then((res) => {
                let newUserData = res?.data[0];
                newUserData.es_deudor = newUserData.es_deudor === 1 ? true : false
                setUser(newUserData)
            })
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (cedula === 'nuevo') {
            try {
                let newUser = {
                    ...user,
                    es_deudor: user.es_deudor ? 1 : 0
                }
                await crearUsuario(newUser)
                toast.success('Socio creado correctamente')
                navigate('/socios')
            } catch (error) {
                toast.error('Error al crear el socio')
            }
        } else {
            try {
                let newUser = {
                    ...user,
                    es_deudor: user.es_deudor ? 1 : 0
                }
                await actualizarSocio(newUser)
                toast.success('Socio actualizado correctamente')
                navigate('/socios')
            } catch (error) {
                toast.error('Error al actualizar el socio')
            }
        }
    }


    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col w-full max-w-[600px] gap-4 p-6 sm:border rounded-md">
                <p className="w-full mb-2 text-3xl text-center">Datos del socio</p>
                <Divider />
                <Input variant="underlined" size={'sm'} placeholder="Ingrese cédula" labelPlacement={'outside'} label="Cédula" onChange={(e) => setUser({ ...user, cedula: e.target.value })} value={user.cedula} />
                <Input autoComplete="one-time-code" type="password" variant="underlined" size={'sm'} placeholder="Ingrese contraseña" labelPlacement={'outside'} label="Contraseña" onChange={(e) => setUser({ ...user, clave: e.target.value })} value={user.clave} />
                <Input variant="underlined" size={'sm'} placeholder={'Ingrese nombre'} labelPlacement={'outside'} label="Nombre" onChange={(e) => setUser({ ...user, nombre_completo: e.target.value })} value={user.nombre_completo} />
                <Input variant="underlined" size={'sm'} placeholder="Ingrese email" labelPlacement={'outside'} label="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} value={user.email} />
                <Input type='text' variant="underlined" size={'sm'} placeholder="Ingrese celular" labelPlacement={'outside'} label="Celular" onChange={(e) => setUser({ ...user, celular: e.target.value })} value={user.celular} />
                <Input variant="underlined" size={'sm'} labelPlacement={'outside'} label="Saldo negativo" onChange={(e) => setUser({ ...user, saldo_negativo: e.target.value })} value={user.saldo_negativo} />
                <Select
                    label="Tipo de usuario"
                    variant="underlined"
                    value={user.tipo_de_usuario}
                    onChange={(e) => setUser({ ...user, tipo_de_usuario: e.target.value })}
                    defaultSelectedKeys={[user.tipo_de_usuario]}
                >
                    <SelectItem key="Socio">Socio</SelectItem>
                    <SelectItem key="Jardinero">Jardinero</SelectItem>
                    <SelectItem key="Administrador">Administrador</SelectItem>
                </Select>
                <Checkbox
                    label="Es deudor"
                    isSelected={user.es_deudor}
                    onChange={(e) => setUser({ ...user, es_deudor: e.target.checked })}
                >
                    Es deudor
                </Checkbox>
                <Divider />
                <Checkbox
                    label="Es VIP"
                    isSelected={user.tipo_socio === 'vip'}
                    onChange={(e) => setUser({ ...user, tipo_socio: e.target.checked ? 'vip' : 'regular' })}
                >
                    VIP
                </Checkbox>
                <div className="flex items-center justify-center w-full mt-2">
                    <Button color="primary" type="submit" onClick={handleSubmit} className="w-full sm:w-[250px]" block>Confirmar</Button>
                </div>
            </div>
        </div>
    )
}

export default Socio