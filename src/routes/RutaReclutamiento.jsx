import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";
import Page404 from "../components/Page404";
import TablaEvaluacionConducta from "../components/Reclutamiento/Entrevista/TablaEvaluacionConducta";
import TablaEvaluacionConocimiento from "../components/Reclutamiento/Entrevista/TablaEvaluacionConocimiento";
import TablaEvaluacionCV from "../components/Reclutamiento/Entrevista/TablaEvaluacionCV";
import TablaEvaluacionStar from "../components/Reclutamiento/Entrevista/TablaEvaluacionStar";
import GraficoAceptacionLlamadas from "../components/Reclutamiento/GraficoAceptacionLlamadas";
import GraficoIngresantes from "../components/Reclutamiento/GraficoIngresantes";
import GraficoReclutados from "../components/Reclutamiento/GraficoReclutados";
import GraficoLlamadasEntrevistas from "../components/Reclutamiento/GraficoLlamadasEntrevistas";
import GraficoEntrevistados from "../components/Reclutamiento/GraficoEntrevistados";
import TablaCompetencias from "../components/Reclutamiento/TablaCompetencias";
import TablaEntrevistado from "../components/Reclutamiento/TablaEntrevistado";
import TablaPerfil from "../components/Reclutamiento/TablaPerfil";
import TablaPostulantes from "../components/Reclutamiento/TablaPostulantes";
import TablaRequerimientos from "../components/Reclutamiento/TablaRequerimientos";
import TablaResumGeneral from "../components/Reclutamiento/Entrevista/TablaResumGeneral";
import GruposEntrevistas from "../components/Reclutamiento/GruposEntrevistas";
import PostulantesEntrevistar from "../components/Reclutamiento/PostulantesEntrevistar";
//import TablaResumenGen from "../components/Reclutamiento/TablaResumenGen";

const RutaReclutamiento = () => {
  const { permisosUser } = useContext(UserContext);
  return (
    <Switch>
      {/* {
        (permisosUser.includes("reclutamiento_requerimiento_personal")) &&
        (
          <Route
            path="/reclutamiento/tabla-requerimientos"
            exact
            component={TablaRequerimientos}
          />
        )

      } */}
      
      <Route
        path="/reclutamiento/tabla-requerimientos"
        exact
        component={ (permisosUser.includes("reclutamiento_requerimiento_personal")) ? TablaRequerimientos : Page404  }
      />

      <Route 
        path="/reclutamiento/tabla-perfil" 
        exact 
        component={ (permisosUser.includes("reclutamiento_recursos_perfil")) ? TablaPerfil : Page404 } 
      />

      <Route
        path="/reclutamiento/tabla-competencias"
        exact
        component={ (permisosUser.includes("reclutamiento_recursos_manucomp")) ? TablaCompetencias  : Page404}
      />

      <Route
        path="/reclutamiento/tabla-postulantes"
        exact
        component={ (permisosUser.includes("reclutamiento_lista_postulantes")) ? TablaPostulantes  : Page404}
      />

      <Route
        path="/reclutamiento/postulantes-entrevistar"
        exact
        component={ (permisosUser.includes("reclutamiento_postulante_a_entrevistar")) ? /*TablaEntrevistado*/ PostulantesEntrevistar : Page404}
      />

      <Route
        path="/reclutamiento/grupos-entrevistas"
        exact
        component={ (permisosUser.includes("reclutamiento_postulante_a_entrevistar")) ? GruposEntrevistas : Page404}
      />

      <Route
        path="/reclutamiento/tabla-resumen-general"
        exact
        component={ (permisosUser.includes("reclutamiento_entrevista_resugene")) ? /* TablaResumenGen */  TablaResumGeneral : Page404}
      />

      {/* Entrevistas */}
      <Route
        path="/reclutamiento/tabla-evaluacion-cv"
        exact
        component={ (permisosUser.includes("reclutamiento_entrevista_evaluacioncv")) ? TablaEvaluacionCV  : Page404}
      />

      <Route
        path="/reclutamiento/tabla-evaluacion-conducta"
        exact
        component={ (permisosUser.includes("reclutamiento_entrevista_evaluacion_cond")) ? TablaEvaluacionConducta  : Page404}
      />

      <Route
        path="/reclutamiento/tabla-evaluacion-star"
        exact
        component={ (permisosUser.includes("reclutamiento_entrevista_evaluacion_star")) ? TablaEvaluacionStar  : Page404}
      />

      <Route
        path="/reclutamiento/tabla-evaluacion-conocimiento"
        exact
        component={ (permisosUser.includes("reclutamiento_entrevista_evaluacion_conoci")) ? TablaEvaluacionConocimiento  : Page404}
      />

      {/* Reportes */}

      <Route
        path="/reclutamiento/reporte-reclutados"
        exact
        component={ (permisosUser.includes("reclutamiento_reportes_graficos")) ? GraficoReclutados  : Page404}
      />

      <Route
        path="/reclutamiento/reporte-ingresantes"
        exact
        component={ (permisosUser.includes("reclutamiento_reportes_graficos")) ? GraficoIngresantes  : Page404}
      />

      <Route
        path="/reclutamiento/reporte-llamadas-entrevistas"
        exact
        component={ (permisosUser.includes("reclutamiento_reportes_graficos")) ? GraficoLlamadasEntrevistas : Page404}
      />

      <Route
        path="/reclutamiento/reporte-entrevistados"
        exact
        component={ (permisosUser.includes("reclutamiento_reportes_graficos")) ? GraficoEntrevistados  : Page404}
      />
     
      <Route
        path="/reclutamiento/reporte-aceptacion-llamadas"
        exact
        component={ (permisosUser.includes("reclutamiento_reportes_graficos")) ? GraficoAceptacionLlamadas  : Page404}
      />

      {/* <Route path="/reclutamiento/*" component={Page404} /> */}
    </Switch>
  );
};

export default RutaReclutamiento;
