import React, { useEffect } from "react";
import { HashRouter as Switch, Route, useLocation } from "react-router-dom";

import { focusHandling } from "cruip-js-toolkit";
import "./charts/ChartjsConfig";

import { useState } from "react";
import DashAdmin from "./pages/DashAdmin";

import RoutePrivate from "./routes/RoutePrivate";
// import RoutePublic from "./routes/RoutePublic";
// import { distGetAutentication, distSetAutentication } from "./dist/Autentication";
import ObtenerToken from "./components/ObtenerToken";
import { UserContext } from "./components/context/UserContext";
import { distGetAutentication, distGetRolesPermisos, distSetAutentication } from "./dist/Autentication";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const [user, setUser] = useState({});
  
  const [permisosUser, setPermisosUser] = useState([])
  const [rolesUser, setRolesUser] = useState([])
  const [loadingGlobalRoles, setLoadingGlobalRoles] = useState(false)
  const location = useLocation();
  
  // useEffect(() => {
  //   distSetAutentication(true)
  //   console.log(distGetAutentication());
  // }, [])
  

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
  }, [location.pathname]); // triggered on route change

  useEffect(() => {      
    distGetRolesPermisos(setPermisosUser, setRolesUser)
  }, [loadingGlobalRoles])  

  return (
    <>
      <Switch>
        <UserContext.Provider value={{ user, permisosUser, rolesUser, loadingGlobalRoles, setUser, setPermisosUser, setRolesUser, setLoadingGlobalRoles }}>
          <Route exact path="">
            {/* <RoutePublic> */}
            {/* <Login /> */}
            {/* </RoutePublic> */}
          </Route>
          <Route exact path="/getToken/:token" component={ObtenerToken}>
            {/* <RoutePrivate> */}
            {/* <ObtenerToken/> */}
            {/* </RoutePrivate> */}
          </Route>
          {/* {
            autentication ? (
              <Route exact path="/*">
                <RoutePrivate>
                  <DashAdmin />
                </RoutePrivate>
              </Route>
            ) : <Spinner />
          } */}
          <Route exact path="/*">
              <DashAdmin />
          </Route>
          
        </UserContext.Provider>

        {/* <Route path='/admin' exact component={Dashboard} /> */}
      </Switch>
    </>
  );
}

export default App;
