import axios from "axios";
import { getSimpleFromLocalStorage } from "../utils/storage";
const URL = "http://localhost:443";
const CLUB_ID = getSimpleFromLocalStorage("club_id");

axios.defaults.baseURL = URL;
axios.interceptors.request.use((config) => {
    config.params = { ...config.params, club_id: CLUB_ID };
    return config;
});

//LOGIN

export const obtenerClubId = async (clubName) => {
    const options = {
        method: "GET",
        url: `/getDataClubByName/${clubName}`,
    };
    return axios.request(options);
}

export const login = async (data) => {
    const options = {
        method: "POST",
        url: "/login",
        data: data,
        params: {
            club_id: data.club_id
        }
    };
    return axios.request(options);
};

export const obtenerSocio = async (cedula) => {
    const options = {
        method: "GET",
        url: `/getSociosByCi/${cedula}`,
    };
    return axios.request(options);
};

export const obtenerSocios = async () => {
    const options = {
        method: "GET",
        url: "/getSocios",
    };
    return axios.request(options);
};

export const crearSocio = async (socio) => {
    const options = {
        method: "POST",
        url: "/socio",
        data: socio,
    };
    return axios.request(options);
};

export const actualizarSocio = async (socio) => {
    const options = {
        method: "PUT",
        url: `/updateUser/${socio.cedula}`,
        data: socio,
    };
    return axios.request(options);
};

export const eliminarSocio = async (socio) => {
    const options = {
        method: "DELETE",
        url: `/deleteUser`,
        data: socio,
    };
    return axios.request(options);
};

export const obtenerStock = async () => {
    //getProducts
    const options = {
        method: "GET",
        url: "/getProducts",
    };
    return axios.request(options);
};

export const obtenerMisPedidos = async (cedula) => {
    ///getPedidosByCedula/:cedula_socio
    const options = {
        method: "GET",
        url: `/getPedidosByCedula/${cedula}`,
    };
    return axios.request(options);
};

export const crearRaza = async (raza) => {
    //addProduct
    const options = {
        method: "POST",
        url: "/addProduct",
        data: raza,
    };
    return axios.request(options);
};

export const crearPedido = async (pedido) => {
    //addPedido
    const options = {
        method: "POST",
        url: "/addPedido",
        data: pedido,
    };
    return axios.request(options);
};

export const crearUsuario = async (usuario) => {
    //addSocio
    const options = {
        method: "POST",
        url: "/addUser",
        data: usuario,
    };
    return axios.request(options);
};

export const obtenerRaza = async (id) => {
    //getProductByRaza
    const options = {
        method: "GET",
        url: `/getProductById/${id}`,
    };
    return axios.request(options);
};

export const obtenerPedidos = async () => {
    //getPedidos
    const options = {
        method: 'GET',
        url: '/getPedidos'
    };
    return axios.request(options);
}

export const listarSociosConDeudaNoPaga = async () => {
    const options = {
        method: 'POST',
        url: '/listarSociosConDeudaNoPaga'
    };
    return axios.request(options);
}

export const listarSociosConDeudaPaga = async () => {
    const options = {
        method: 'POST',
        url: '/listarSociosConDeudaPaga'
    };
    return axios.request(options);
}

export const listarPedidosQueTienenDeuda = async () => {
    const options = {
        method: 'POST',
        url: '/listarPedidosQueTienenDeuda'
    };
    return axios.request(options);
}

export const listarPedidosQueTienenDeudaPagada = async () => {
    const options = {
        method: 'POST',
        url: '/listarPedidosQueTienenDeudaPagada'
    };
    return axios.request(options);
}

export const listarPedidosQueTienenDeudaNoPagada = async () => {
    const options = {
        method: 'POST',
        url: '/listarPedidosQueTienenDeudaNoPagada'
    };
    return axios.request(options);
}

export const obtenerPedido = async (id) => {
    const options = {
        method: 'GET',
        url: `/getPedido/${id}`
    };
    return axios.request(options);
}

export const actualizarPedido = async (pedido) => {
    const options = {
        method: 'PUT',
        url: `/updatePedido/${pedido.id}`,
        data: pedido
    };
    return axios.request(options);
}

export const crearDeuda = async (deuda) => {
    const options = {
        method: 'POST',
        url: '/crearDeuda',
        data: deuda
    };
    return axios.request(options);
}

export const eliminarDeuda = async (id) => {
    const options = {
        method: 'DELETE',
        url: `/eliminarDeuda/${id}`
    };
    return axios.request(options);
}

export const obtenerDeudaPorIdPedido = async (id) => {
    const options = {
        method: 'GET',
        url: `/obtenerDeudaPorIdPedido/${id}`
    };
    return axios.request(options);
}

//SemanaProducto
export const obtenerSemanaProducto = async () => {
    //getSemanaProducto
    const options = {
        method: "GET",
        url: "/getSemanaProductos",
    };
    return axios.request(options);
};

export const addSemanaProducto = async (semanaProducto) => {
    //addSemanaProducto
    const options = {
        method: "POST",
        url: "/addSemanaProducto",
        data: semanaProducto,
    };
    return axios.request(options);
};

export const getSemanas = async () => {
    //getSemanas
    const options = {
        method: "GET",
        url: "/getSemanas",
    };
    return axios.request(options);
};

export const addProductoAlimentacion = async (producto) => {
    //addProducto
    const options = {
        method: "POST",
        url: "/addProductoAlimentacion",
        data: producto,
    };
    return axios.request(options);
};

export const getProductosAlimentacion = async () => {
    //getProductos
    const options = {
        method: "GET",
        url: "/getProductosAlimentacion",
    };
    return axios.request(options);
};

export const deleteProductoAlimentacion = async (data) => {
    //deleteProducto
    const options = {
        method: "DELETE",
        url: `/deleteProductoAlimentacion`,
        data: data,
    };
    return axios.request(options);
};

export const getProductoAlimentacionById = async (id) => {
    //getProductosById
    const options = {
        method: "GET",
        url: `/getProductoAlimentacionById/${id}`,
    };
    return axios.request(options);
};

export const deleteSemanaProducto = async (data) => {
    //deleteProducto
    const options = {
        method: "DELETE",
        url: `/deleteSemanaProducto`,
        data: data,
    };
    return axios.request(options);
};

export const getPlantas = async () => {
    //getPlantas
    const options = {
        method: "GET",
        url: "/getPlantas",
    };
    return axios.request(options);
};

export const addPlanta = async (planta) => {
    //addPlanta
    const options = {
        method: "POST",
        url: "/addPlanta",
        data: planta,
    };
    return axios.request(options);
};

export const getProductosAlimentacionBySemana = async (idSemana) => {
    //getProductosBySemana
    const options = {
        method: "GET",
        url: `/getProductosAlimentacionBySemana/${idSemana}`,
    };
    return axios.request(options);
};

export const getFirmasBySemana = async (idSemana) => {
    //getFirmasBySemana
    const options = {
        method: "GET",
        url: `/getFirmasBySemana/${idSemana}`,
    };
    return axios.request(options);
}

export const addFirmaProducto = async (firma) => {
    //addFirmaProducto
    const options = {
        method: "POST",
        url: "/addFirmaProducto",
        data: firma,
    };
    return axios.request(options);
};

export const getCierreDiario = async () => {
    //getCierreDiario
    const options = {
        method: "GET",
        url: "/getCierreDelDia",
    };
    return axios.request(options);
};

export const getCierreMensual = async (mes) => {
    //getCierreMensual
    const options = {
        method: "GET",
        url: `/getCierreDelMes/${mes}`,
    };
    return axios.request(options);
};

export const eliminarPedido = async (id) => {
    const options = {
        method: 'POST',
        url: `/deletePedido/${id}`
    };
    return axios.request(options);
}