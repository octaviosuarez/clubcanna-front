import axios from 'axios';
const URL = 'http://192.168.0.10:443';

axios.defaults.baseURL = URL;


//LOGIN

export const login = async (usuario) => {
    const options = {
        method: 'POST',
        url: '/login',
        data: usuario
    };
    return axios.request(options);
}

export const obtenerSocio = async (cedula) => {
    const options = {
        method: 'GET',
        url: `/getSociosByCi/${cedula}`
    };
    return axios.request(options);
}

export const obtenerSocios = async () => {
    const options = {
        method: 'GET',
        url: '/getSocios'
    };
    return axios.request(options);
}

export const crearSocio = async (socio) => {
    const options = {
        method: 'POST',
        url: '/socio',
        data: socio
    };
    return axios.request(options);
}

export const actualizarSocio = async (socio) => {
    const options = {
        method: 'PUT',
        url: '/socio',
        data: socio
    };
    return axios.request(options);
}

export const eliminarSocio = async (cedula) => {
    const options = {
        method: 'DELETE',
        url: `/socio/${cedula}`
    };
    return axios.request(options);
}

export const obtenerStock = async () => {
    //getProducts
    const options = {
        method: 'GET',
        url: '/getProducts'
    };
    return axios.request(options);
}

export const obtenerMisPedidos = async (cedula) => {
    ///getPedidosByCedula/:cedula_socio
    const options = {
        method: 'GET',
        url: `/getPedidosByCedula/${cedula}`
    };
    return axios.request(options);
}

export const crearRaza = async (raza) => {
    //addProduct
    const options = {
        method: 'POST',
        url: '/addProduct',
        data: raza
    };
    return axios.request(options);
}

export const crearPedido = async (pedido) => {
    //addPedido
    const options = {
        method: 'POST',
        url: '/addPedido',
        data: pedido
    };
    return axios.request(options);
}

export const crearUsuario = async (usuario) => {
    //addSocio
    const options = {
        method: 'POST',
        url: '/addUser',
        data: usuario
    };
    return axios.request(options);
}

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