import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import axios from 'axios';
import {Spinner} from 'reactstrap';
import { getToken, setToken } from "../dist/Token";
import { distSetUser,distSetAutentication, 
  // distGetUser 
} from "../dist/Autentication";
import { UserContext } from "../components/context/UserContext";


const ObtenerToken = ({match}) => {
    const [redirect, setRedirect] = useState(false);
    const { user, setUser, setPermisosUser, setRolesUser } = useContext(UserContext);
    // console.log(user);
    // const permisos = (Object.keys(user).length !== 0) ? user.permisos.map( item => item.name ) : {}
    // setPermisosUser(permisos)
    // setRolesUser((Object.keys(user).length !== 0) ? user.roles.map( item => item.name ) : {})
        
    useEffect(() => {
        setToken(match.params.token);        
        // document.cookie = `token=${match.params.token};domain=.consigueventas.com`;
        // let cookieValor = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // console.log(cookieValor);
        // console.log(match.params.token);
        // console.log("Ejecuto");
        axios.get(`${process.env.REACT_APP_API_URL}/api/identificarPorToken`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          }
        )
          .then(Response => {
            distSetAutentication(true);
            setUser(Response.data);     
            distSetUser(Response.data);
            setPermisosUser(Response.data.permisos.map( item => item.name ))         
            setRolesUser(Response.data.roles.map( item => item.name ))         
            setRedirect(false);

          }).catch(error => {
            console.log(error);
            distSetAutentication(false);
          })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])    
    
    if (redirect) {
    return <Redirect to='/dashadmin' />;
    }else{
        return (
            <div >
                <Spinner className="text-yellow-500" />
                <p>Ingresando al sistema erp</p>
            </div>
        );    
    }
    
}
export default ObtenerToken;