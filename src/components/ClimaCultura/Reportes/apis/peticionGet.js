import axios from "axios";
import { getToken } from "../../../../dist/Token";

const clienteConfig = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});
// Grafico Circular
export const getPeticionGraficoCircularMes = async (
  dep,
  area,
  turno,
  tipoDate,
  año,
  mes,
  semana
) => {
  let data_mes = [];
  try {
    let { data } = await clienteConfig(`/clima/cantidadInducidos`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        params: {
          departamento: dep,
          area: area,
          turno: turno,
          tipoFecha: tipoDate,
          año: año,
          mes: mes,
          semana: semana,
        },
      }
    );
    data_mes = data.data;
    // data_mes = response.data.data;
  } catch (e) {
    console.log("Datos no traido correctamente " + e);
  }
  return data_mes;
};

// https://desarrollo.consigueventas.com/backend/public/api/clima/recursos/induccion/totalii
// api/clima/recursos/induccion/totalii
// /api/clima/recursos/induccion/total
// Grafico de cascada
export const getPeticionDiagramaCascada = async () => {
  let cascada_data = [];
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/clima/recursos/induccion/totalii`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    cascada_data = response.data.data;
  } catch (e) {
    console.error("Verificar el Api Cascada" + e);
  }
  return cascada_data;
};
