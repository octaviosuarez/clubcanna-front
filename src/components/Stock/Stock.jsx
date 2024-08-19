import { useEffect, useState } from 'react';
import Grid from '../Grid'
import { useNavigate } from 'react-router-dom'
import { Button } from '@nextui-org/react';
import { obtenerStock } from '../../api/api';

const Stock = () => {

    const navigate = useNavigate();
    const [stock, setStock] = useState([])

    const columns = [
        { field: "id" },
        { field: "raza", headerName: "Raza" },
        { field: "precio", headerName: "Precio" },
        { field: "stock" }
    ]

    useEffect(() => {
        obtenerStock().then((res) => {
            setStock(res.data)
        });
    }, [])

    const onRowDoubleClick = (data) => {
        navigate(`/stock/${data.id}`)
    }


    const onNewRaza = () => {
        navigate('/stock/nuevo')
    }


    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-1 pt-5 xl:pt-16 xl:justify-start sm:p-4 xl:p-12">
            <h1 className="text-4xl">Stock de razas</h1>
            <div className="flex flex-col items-center justify-center w-full gap-4 xl:">
                <div className="md:self-end">
                    <Button color="primary" className="w-[180px]" onClick={onNewRaza}>Nuevo stock</Button>
                </div>
                <Grid
                    columns={columns}
                    data={stock}
                    onDoubleClick={onRowDoubleClick}
                />
            </div>
        </div>
    )
}

export default Stock