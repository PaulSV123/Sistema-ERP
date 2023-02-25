// import axios from "axios";
import "../css/style.scss";
//import "../css/DashAdmin.css";
import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
// import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import SidebarReclutamiento from "../partials/SidebarReclutamiento";

// import { UserContext } from "../components/context/UserContext";
// import { getToken, removeToken } from "../dist/Token";
// import { distSetAutentication } from "../dist/Autentication";

import SidebarCapacitacion from "../partials/SidebarCapacitacion";
import SidebarClimayCultura from "../partials/SidebarClimayCultura";
import SidebarJefedeTH from "../partials/SidebarJefedeTH";
import SidebarUsuarios from "../partials/SidebarUsuarios";
import RutaReclutamiento from "../routes/RutaReclutamiento";
import RutaCapacitacion from "../routes/RutaCapacitacion";
// import RutaClimaCultura from "../routes/RutaClimaCultura";
// import RutaJefeTH from "../routes/RutaJefeTH";
import RutaRoles from "../routes/RutaRoles";
import RutaClimaCultura from "../routes/RutaClimaCultura";
import RutaJefeTH from "../routes/RutaJefeTH";
import CerrarSesion from "../components/CerrarSesion";
import SidebarBoletines from "../partials/SidebarBoletines";
import RutaBoletines from "../routes/RouteBoletines";

function DashAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectSidebar, setSelectSidebar] = useState("");
  let location = useLocation();

  useEffect(()=>{
    let modulo = location.pathname.split('/')[2];
    //console.log(location,location.pathname.split('/'),modulo.charAt(0).toUpperCase() + modulo.slice(1));
    //setSelectSidebar(modulo.charAt(0).toUpperCase() + modulo.slice(1));
  },[location])

  const showSidebar = (type) => {
    switch (type) {
      case "Reclutamiento":
        return (
          <SidebarReclutamiento
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );
      case "Capacitacion":
        return (
          <SidebarCapacitacion
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );
        case "Boletines":
          return (
            <SidebarBoletines
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          );
      case "ClimaCultura":
        return (
          <SidebarClimayCultura
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );
      case "JefeTH":
        return (
          <SidebarJefedeTH
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );
      case "Usuarios":
        return (
          <SidebarUsuarios
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );
      default:
        return (
          <SidebarReclutamiento
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* <Router basename={'dashadmin'}> */}
      <Router basename="/dashadmin">
        {/* Sidebar */}
        {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        {showSidebar(selectSidebar)}

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            setSelectSidebar={setSelectSidebar}
          />

          <main className="w-full h-full">
            <Switch>
              {/* <Route path="/dashboard" exact component={Dashboard} /> */}

              <Route path="/reclutamiento" component={RutaReclutamiento} />

              <Route path="/capacitacion" component={RutaCapacitacion} />

              <Route path="/boletines" component={RutaBoletines} />

              <Route path="/clima" component={RutaClimaCultura} />
              <Route path="/jefeth" component={RutaJefeTH} />

              <Route path="/roles" component={RutaRoles} />

              <Route path="/cerrarSesion" exact component={CerrarSesion} />
              
              {/* En caso de redireccion a /tabla */}
              <Route
                render={() => (
                  <Redirect to="/reclutamiento/tabla-requerimientos" />
                )}
              />
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default DashAdmin;
