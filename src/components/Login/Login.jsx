import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import { Input, Button, CardFooter } from "@nextui-org/react";
import { useState } from "react";
import useStore from "../../store/useStore";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/api";

const tiposDeUsuario = {
    'Administrador': 'admin',
    'Socio': 'user'
}

export default function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const { setUserData, theme } = useStore();
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!user) return setError('Debe ingresar usuario')

        try {
            let res = await login({ cedula: user, password });
            let userData = {
                cedula: user,
                level: 'admin'
            }
            setUserData(userData)
            navigate('/socios')
            if (res.status === 200) {
                let userData = res?.data?.user;
                userData.level = tiposDeUsuario[userData.tipo_de_usuario]
                setUserData(userData)
                if (userData.level === 'admin') {
                    navigate('/socios')
                } else {
                    navigate('/mis-pedidos')
                }
            } else {
                setError('Usuario incorrecto')
            }
        } catch (e) {
            if (e.response?.data?.message) {
                return setError(e.response.data.message)
            }
            setError('Usuario incorrecto')
        }

    }

    return (
        <div className="flex items-center justify-center w-screen h-[100dvh]">
            <form className="w-full max-w-[500px] p-2" onSubmit={handleLogin}>
                <Card>
                    <CardHeader className="flex flex-col items-center justify-center">
                        <Image alt="Logo" className="mb-4" src={theme === 'dark' ? '/logo_dark.jpg' : '/logo.jpg'} width={150} />
                        <p className="mb-4 text-2xl">Inicio de sesión</p>
                    </CardHeader>
                    <Divider />

                    <CardBody className="flex flex-col gap-4">
                        <Input id="inputUser" autoComplete="one-time-code" label="Usuario" onChange={(e) => setUser(e.target.value)} value={user} />
                        <Input id="inputPassword" autoComplete="one-time-code" label="Contraseña" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </CardBody>

                    <Divider />
                    {
                        error && <div className="flex flex-col gap-4 py-4">
                            <p className="text-center text-red-500">{error}</p>
                            <Divider />
                        </div>
                    }
                    <CardFooter className="flex items-center justify-center">
                        <Button id="btnSubmit" type="submit" onClick={handleLogin} className="w-[200px]" block>Entrar</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}