import { getNotasIntegracion, getNotasIntegracionSemana } from "../../../../dist/ClimaCultura/getPeticiones";

const arrayMes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const peticionNotasIntegracion = async( year, departamento, turno, tipofecha, mes, semana ) => {
    if( tipofecha === 0 ){
        const datos = await getNotasIntegracionSemana( year, mes, departamento, turno );
        const datosDepartamento = datos.Departamento;
        const datosAreas = (datos.Areas).map(area => area.Area);
        const datosNotas = datos.Areas.map(area => area.Semanas );
        return {
            datosDepartamento,
            datosAreas,
            datosNotas,
        }
    } else {
        const datos = await getNotasIntegracion( year, departamento, turno );
        const datosDepartamento = datos?.Departamento || {};
        const datosAreas = (datos.Areas).map(area => area.Area);
        const datosNotas = datos.Areas.map(area => area.Notas);
        return {
            datosDepartamento,
            datosAreas,
            datosNotas,
        }
    }
}

/** AÑO */
const notasAño = (datosNotas) => {
    const Notas = [];

    for (let i = 0; i < datosNotas.length; i++) {
        let promedio = 0;
        let contador = 0;
        for (const key in datosNotas[i]) {
            if (datosNotas[i][key] > 0) {
                contador++;
                promedio += datosNotas[i][key];
            }
        }
        promedio = promedio / contador;
        if (isNaN(promedio)) {
            Notas.push(0);
        } else {
            Notas.push(promedio)
        }
    }
    return Notas;
}

/** MES */
const notasMes = (datosNotas, mes) => {
    const notas = [];
    for (let i = 0; i < datosNotas.length; i++) {
        notas.push(datosNotas[i][arrayMes[mes - 1]]);
    }
    return notas;
}

/** SEMANA */
const notasSemana = (datosNotas, semana) => {
    const notas = []
    for( let i = 0; i < datosNotas.length ;i++ ){
        notas.push( datosNotas[i][semana - 1] )
    }
    const promedioNotas = notas.map(( objeto ) => objeto[`Semana ${semana}`].Promedio )
    return promedioNotas;
}


export const NotasAdapter = async (year, departamento, turno, tipofecha, mes, semana) => {
    try {        
        const datos = await peticionNotasIntegracion(year, departamento, turno, tipofecha, mes, semana)
        let Notas = [];
    
        switch (tipofecha) {
            case 2:
                Notas = notasAño(datos.datosNotas);
                break;
            case 1:
                Notas = notasMes(datos.datosNotas, mes);
                break;
            case 0:
                Notas = notasSemana(datos.datosNotas, semana);
                break;
            default:
                console.log("ERROR tipo de fecha no encontrada")
                break;
        }
        return {
            datosDepartamento: datos?.datosDepartamento || "Sistemas",
            datosAreas: datos.datosAreas,
            Notas,
        }
    } catch (error) {
        console.log(error)
    }
}