import axios from "axios";

const baseUrl = process.env.REACT_APP_API;

//!Aborta el tiempo de conexion de la peticion despues de los milisegundos ingresados
//!Timeout: Tiempo de espera respuesta.
//!Signal: Tiempo de espera conexion.
const newAbortSignal = (timeout) => {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeout || 0);

  return abortController.signal;
};

const apiAxios = async (path, params) => {
  const result = {
    statusResponse: false,
    error: null,
    dataaxios: null,
    registros: null,
    message: null,
  };
  
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    signal: newAbortSignal(5000),
  };

  const baseFul = `${baseUrl}${path}`;
  console.log("Hola Mundo")
  console.log(baseFul)
  console.log(params)
  await axios
    .post(`${baseFul}`, params, defaultOptions)
    .then(function (response) {
      result.statusResponse = true;
      result.dataaxios = response.data.data;
      result.registros = response.data.registros;
      result.message = response.data.message;
    })
    .catch(function (error) {
      result.statusResponse = false;
      result.dataaxios = null;
      result.error = error;
      result.registros = null;
    });

  return result;
};

export default apiAxios;