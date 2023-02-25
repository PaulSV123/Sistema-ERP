import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";
import Page404 from "../components/Page404";
import TablaMaterialInduccion from "../components/ClimaCultura/MaterialesInduccion/TablaMaterialInduccion";
import exporTablaIntegracion from "../components/ClimaCultura/Integracion/TablaIntegracion";
import TablaColaboradoresInducir from '../components/ClimaCultura/ColaboradoresInducir/TablaColaboradoresInducir';
import TablaActividadesGerenciales from "../components/ClimaCultura/AtividadesGerenciales/TablaActividadesGerenciales";
import TablaCumpleañosColaboradores from "../components/ClimaCultura/CumpleañosColaboradores/CumpleañosColaboradores";
import ReportePracticantesInducidos from "../components/ClimaCultura/Reportes/PracticantesInducidos";
import TablaListadoSesiones from "../components/ClimaCultura/SesionIntegracion/ListadoSesiones";
import { Calendario } from "../components/ClimaCultura/SesionesIntegracion/Calendario";
import { ListadoSesiones } from "../components/ClimaCultura/SesionesIntegracion/ListadoSesiones";
import ReporteNotasIntegracion from "../components/ClimaCultura/Reportes/notasIntegracion/NotasIntegracion";
import EvaluacionSesionIntegracion from "../components/ClimaCultura/EvaluacionSesionesIntegracion/EvaluacionSesionIntegracion";


const RutaClimaCultura = () => {
    const { permisosUser } = useContext(UserContext);
    return (
        <Switch>
            <Route
            // colocando la nueva ruta
            path="/clima/MaterialesInduccion"
            exact
            component={TablaMaterialInduccion}
            />

            <Route
            path="/clima/integracion"
            exact
            component={exporTablaIntegracion}
            />
            <Route
            path="/clima/colaboradores"
            exact
            component={TablaColaboradoresInducir}
            />
            <Route
            path="/clima/ActividadesGerenciales/TablaActividadesGerenciales"
            exact
            component={ TablaActividadesGerenciales}
            />

            <Route
            path="/clima/cumpleaños"
            exact
            component={TablaCumpleañosColaboradores}
            />  

            <Route
            path="/clima/sesiones-calendario"
            exact
            component={Calendario}
            /> 

            <Route
            path="/clima/sesiones-listado"
            exact
            component={ListadoSesiones}
            /> 

            <Route
            path="/clima/reporte-inducidos"
            exact
            component={ReportePracticantesInducidos}
            />

            <Route
                path="/clima/reporte-notasIntegracion"
                exact
                component={ReporteNotasIntegracion}
            />

            <Route
            path="/clima/listadoSesiones"
            exact
            component={TablaListadoSesiones}
            />

            <Route 
            path="/clima/EvaluacionSesiones"
            exact
            component={EvaluacionSesionIntegracion}/>
        </Switch>
    );
};

export default RutaClimaCultura;
