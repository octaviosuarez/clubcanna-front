import axios from "axios";
const URL = "http://localhost:443";

axios.defaults.baseURL = URL;

//LOGIN

export const login = async (usuario) => {
  const options = {
    method: "POST",
    url: "/login",
    data: usuario,
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
    url: "/socio",
    data: socio,
  };
  return axios.request(options);
};

export const eliminarSocio = async (cedula) => {
  const options = {
    method: "DELETE",
    url: `/socio/${cedula}`,
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

export const obtenerPedidos = async () => {
  //getPedidos
  const options = {
    method: "GET",
    url: "/getPedidos",
  };
  return axios.request(options);
};

export const listarSociosConDeudaNoPaga = async () => {
  const options = {
    method: "POST",
    url: "/listarSociosConDeudaNoPaga",
  };
  return axios.request(options);
};

export const listarSociosConDeudaPaga = async () => {
  const options = {
    method: "POST",
    url: "/listarSociosConDeudaPaga",
  };
  return axios.request(options);
};

export const listarPedidosQueTienenDeuda = async () => {
  const options = {
    method: "POST",
    url: "/listarPedidosQueTienenDeuda",
  };
  return axios.request(options);
};

export const listarPedidosQueTienenDeudaPagada = async () => {
  const options = {
    method: "POST",
    url: "/listarPedidosQueTienenDeudaPagada",
  };
  return axios.request(options);
};

export const listarPedidosQueTienenDeudaNoPagada = async () => {
  const options = {
    method: "POST",
    url: "/listarPedidosQueTienenDeudaNoPagada",
  };
  return axios.request(options);
};

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
};

export const addFirmaProducto = async (firma) => {
  //addFirmaProducto
  const options = {
    method: "POST",
    url: "/addFirmaProducto",
    data: firma,
  };
  return axios.request(options);
};

export const getFirmasProducto = async (fecha, idPlanta) => {
  //getFirmasProducto
  const options = {
    method: "GET",
    url: `/getFirmasProducto/${fecha}/${idPlanta}`,
  };
  return axios.request(options);
};

export const updateFirma = async (observaciones, cedulaJardinero, fecha) => {
  //updateFirma
  const options = {
    method: "PUT",
    url: `/updateFirma/${observaciones}/${cedulaJardinero}/${fecha}`,
  };
  return axios.request(options);
};

export const getUserByCi = async (cedula) => {
  //getUserByCi
  const options = {
    method: "GET",
    url: `/getUserByCi/${cedula}`,
  };
  return axios.request(options);
}
