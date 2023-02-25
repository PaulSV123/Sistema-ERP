import React from "react";
import { Route, Switch } from "react-router-dom";
import TablaPracticantes from "../components/Capacitacion/TablaPracticantes";
import TablaEvaluacion from "../components/Capacitacion/TablaEvaluacion";
import TablaRecursos from "../components/Capacitacion/TablaRecursos";
import TablaActividades from "../components/Capacitacion/TablaActividades";
import TablaListadoCurso from "../components/Capacitacion/TablaListadoCurso";
import TablaDetalleCursos from "../components/Capacitacion/TablaDetalleCursos";
import { TablaIngresos } from "../components/Capacitacion/TablaIngresos";
import TablaTotalCapacitados from "../components/Capacitacion/TablaTotalCapacitados";
import { ReporteSemanal } from "../components/Capacitacion/ReporteSemanal";
import { ColaboradoresInducir } from "../components/Capacitacion/ColaboradoresInducir";
import TablaAspectos from "../components/Capacitacion/TablaAspectos";
import TablaPlataformas from "../components/Capacitacion/TablaPlataformas";
import TablaCapacitadosGeneral from "../components/Capacitacion/TablaCapacitadosGeneral";

const RutaCapacitacion = () => {
  return (
    <Switch>
      <Route path="/capacitacion/practicantes" exact component={TablaPracticantes} />
      <Route path="/capacitacion/evaluacion"exact component={TablaEvaluacion} />
      <Route path="/capacitacion/recursos" exact component={TablaRecursos} />
      <Route path="/capacitacion/aspectos" exact component={TablaAspectos} />
      <Route path="/capacitacion/actividades" exact component={TablaActividades} />
      <Route path="/capacitacion/plataformas" exact component={TablaPlataformas} />
      <Route path="/capacitacion/listadoCurso" exact component={TablaListadoCurso} />
      <Route path="/capacitacion/detalleCurso/:ID" exact component={TablaDetalleCursos} />
      <Route path="/capacitacion/ingresos" exact component={TablaIngresos} />
      <Route path="/capacitacion/total-capacitados" exact component={TablaTotalCapacitados} />
      <Route path="/capacitacion/reporte-semanal" exact component={ReporteSemanal} />
      <Route path="/capacitacion/colaboradores" exact component={ColaboradoresInducir} />
      <Route path="/capacitacion/capacitadosGeneral" exact component={TablaCapacitadosGeneral} />
    </Switch>
  );
};

export default RutaCapacitacion;
