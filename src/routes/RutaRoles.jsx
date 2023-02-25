import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../components/context/UserContext';
import Page404 from '../components/Page404';
import TablaPermisos from '../components/TablaPermisos';
import TablaRoles from '../components/TablaRoles';
import TablaUsuarios from '../components/TablaUsuarios';

const RutaRoles = () => {
    const { permisosUser } = useContext(UserContext);
    return (
      <Switch>
        <Route path="/roles/gestion-usuarios" exact component={(permisosUser.includes("roles_usuarios")) ? TablaUsuarios  : Page404 } />
        <Route path="/roles/gestion-permisos" exact component={(permisosUser.includes("roles_roles")) ? TablaPermisos  : Page404 } />
        <Route path="/roles/gestion-roles" exact component={(permisosUser.includes("roles_permisos")) ? TablaRoles  : Page404 } />
        <Route path="/roles/*" component={Page404} />
      </Switch>
    );
};

export default RutaRoles;
