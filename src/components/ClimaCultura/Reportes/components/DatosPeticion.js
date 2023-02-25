import { getPeticionGraficoCircularMes } from "../apis/peticionGet"

const peticionesDatos = async (departamento, area, turno, tipoFecha, año, mes, semana) => {
    // if (tipoFecha == 2) {
    //     const datos = await getPeticionGraficoCircularMes(departamento, area, turno, tipoFecha, año, mes, semana);
    //     const dataMeses = datos.Meses;
    //     const dataAño = datos.Año;
    //     return {
    //         dataMeses, dataAño
    //     }
    // } else if (tipoFecha == 1) {
    //     const datos = await getPeticionGraficoCircularMes(departamento, area, turno, tipoFecha, año, mes, semana);
    //     const dataSemanas = datos.Semanas;
    //     const dataMes = datos.Mes;
    //     return {
    //         dataSemanas,
    //         dataMes
    //     }
    // } else if (tipoFecha == 0) {
    //     const datos = await getPeticionGraficoCircularMes(departamento, area, turno, tipoFecha, año, mes, semana);
    //     const dataSemana = datos.Semana;
    //     const nota = datos.semananota;
    //     return {
    //         dataSemana,
    //         nota
    //     }
    // }

    // Haciendo el filtrado para traer datos dependiendo el tipoFecha
    const datos = await getPeticionGraficoCircularMes(departamento, area, turno, tipoFecha, año, mes, semana);
    if (tipoFecha == 2) {
        const dataMeses = datos.Meses;
        const dataAño = datos.Año;
        return{
            dataMeses, dataAño
        }
    } else if (tipoFecha == 1) {
        const dataSemanas = datos.Semanas;
        const dataMes = datos.Mes;
        return {
            dataSemanas, dataMes
        }
    } else if(tipoFecha==0){
        const dataSemana = datos.Semana;
        const nota = datos.semananota;
        return {
            dataSemana, nota
        }
    }
}


// Obteniendo datos y pasarlo al componente layout
export const DatosPeticion = async (departamento, area, turno, tipoFecha, año, mes, semana) => {
    const datos = await peticionesDatos(departamento, area, turno, tipoFecha, año, mes, semana);
    return {
        datosAño: datos?.dataAño || {},
        datoMeses: datos?.dataMeses || {},
        datoMes: datos?.dataMes || {},
        datoSemanas: datos?.dataSemanas || {},
        datoSemana: datos?.dataSemana || {},
        datoNota: datos?.nota || {}
    }
}