import React, { useEffect, useState } from "react";
import { getPeticionDiagramaCascada, getPeticionGraficoCircularMes } from "../apis/peticionGet";
import { DatosPeticion } from "../components/DatosPeticion";
import DiagramaCascada from "../components/DiagramaCascada";
import GraficoCircular_Dia from "../components/GraficoCircular_Dia";
import GraficoCircular_Mes from "../components/GraficoCircular_Mes";
import GraficoCircular_Semana from "../components/GraficoCircular_Semana";
import ReportePracticantesInducidos from "../components/ReportePracticantesInducidos";

const LayoutView = () => {
  const [datosDiagramaCascada, setDatosDiagramaCascada] = useState([]);

  // Datos de prueba del componente ReportePracticantesInducidos
  const [reporteDatos, setReporteDatos] = useState({
    area: 59,
    año: "2023",
    departamento: 2,
    mes: 2,
    semana: 1,
    tipoFecha: 1,
    turno: 1,
  });


  // Estados que almacenan datos del componente DatosPeticion
  // Para año
  const [xaño, setXAño] = useState("");
  const [meses, setMeses] = useState([]);

  // para Mes
  const [xmes, setXMes] = useState("");
  const [xsemanas, setXSemanas] = useState([]);

  // Semanas
  const [xsemana, setXSemana] = useState("");
  const [nota, setNota] = useState([]);


  // crear una funcion async
  // Traigo mi DatosPeticion del componente DatosPeticion y le paso por parametros el estado ReporteDatos."Los atributos que necesita"
  const extrarDatos = async () => {
    const data = await DatosPeticion(reporteDatos.departamento, reporteDatos.area, reporteDatos.turno, reporteDatos.tipoFecha, reporteDatos.año, reporteDatos.mes, reporteDatos.semana);
    setXAño(data.datosAño);
    setMeses(data.datoMeses);
    setXMes(data.datoMes);
    setXSemanas(data.datoSemanas);
    setXSemana(data.datoSemana);
    setNota(data.datoNota);
  }

  useEffect(() => {
    getPeticionDiagramaCascada().then((dato) => {
      setDatosDiagramaCascada(dato);
    })
    // Acá Traigo mi funcion paticion para que me renderice una vez
    extrarDatos();
    // Si cambia mi estado ReporteDatos, que me cambien mis datos que le estoy pasando
  }, [reporteDatos]);
  

  // Funcion para hacer el filtrado por tipoFecha
  const escogiendoComponente = (datosReporte) => {
    let dato = [];
    if (datosReporte.tipoFecha == 2) {
      dato = <GraficoCircular_Mes añox={xaño} mess={meses} datos={reporteDatos} />
    } else if (datosReporte.tipoFecha == 1) {
      dato = <GraficoCircular_Semana semanax={xsemanas} mesx={xmes} datos={reporteDatos} />
    } else if (datosReporte.tipoFecha == 0) {
      dato = <GraficoCircular_Dia nota={nota} xsemana={xsemana} datos={reporteDatos} />
    }
    return dato;
  }


  return (

    <div className="container mx-auto">
      <ReportePracticantesInducidos setDatosFiltro={setReporteDatos}/>

      <div className="grid grid-cols-1 sm: grid-cols-2 gap-y-10 mt-0 sm:mt-4">
        <div className="grid-cols-1">
          {escogiendoComponente(reporteDatos)}
        </div>
        <div className="container mx-auto">
          <DiagramaCascada dataCascada={datosDiagramaCascada}/>
        </div>
      </div>
    </div>
  );
};
export default LayoutView;

