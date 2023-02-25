import React, { useEffect, useState } from 'react'
import GraficoNotasIntegracion from './graficoNotasIntegracion/GraficoNotasIntegracion';
import { NotasAdapter } from './NotasAdapter';
import ReportePracticantesInducidos from "./Filtro/Filtro";
import "./NotasIntegracion.css";

const NotasIntegracion = () => {
    const [datosFiltro, setDatosFiltro] = useState({
        departamento: "2",
        año: "2022",
        turno: "1",
        tipoFecha: 2,
        semana: 1,
    });

    const [departamento, setDepartamento] = useState("");
    const [areas, setAreas] = useState([]);
    const [notas, setNotas] = useState([]);
    
    const extraerDatos = async () => {
        if (datosFiltro.departamento !== "" && datosFiltro.año !== "" && datosFiltro.tipoFecha !== "" && datosFiltro.turno !== "") {
            const data = await NotasAdapter(
                datosFiltro.año,
                datosFiltro.departamento,
                datosFiltro.turno,
                datosFiltro.tipoFecha,
                datosFiltro.mes,
                datosFiltro.semana);
            setDepartamento(data.datosDepartamento);
            setAreas(data.datosAreas);
            setNotas(data.Notas);
        }
    }

    useEffect(() => {
        extraerDatos();

    }, [datosFiltro]);

    return (
        <div className='m-3'>
            <h3 className='text-xl font-bold ml-4 mb-2 xs:text-center md:text-left'>REPORTES DE NOTAS DE INTEGRACIÓN</h3>
            <ReportePracticantesInducidos setDatosFiltro={setDatosFiltro} />
            <div className="graficoNotasIntegracion">
                <GraficoNotasIntegracion
                    notas={notas}
                    departamento={departamento}
                    areas={areas} />
            </div>
        </div>
    )
}

export default NotasIntegracion;