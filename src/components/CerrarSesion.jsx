import axios from "axios";
import { useContext } from "react";
import { distSetAutentication } from "../dist/Autentication";
import { getToken, removeToken } from "../dist/Token";
import { UserContext } from "./context/UserContext";
import Spinner from "./Spinner/Spinner";


const CerrarSesion= ()=>{
    const {user,setUser}=  useContext(UserContext);

    const peticionCerrarSesion = async ()=>{
        await axios.post(`${process.env.REACT_APP_API_URL}/api/cerrarsesion`,
        {
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      )
        .then(response => {
          distSetAutentication(false);
          setUser({});
          removeToken();
        }).catch(error => {
      });
    }

    
    const cerrarSesion = async()=>{
      await peticionCerrarSesion();
      //return window.location.href='https://desarrollo.consigueventas.com/Frontend/Asistencia/#/login'
      //return window.location.href='https://erp.consigueventas.com/asistencia/#/login'
      //return window.location.href=`${process.env.REACT_APP_ASISTENCIA_URL}/asistencia/#/login`
      window.location.replace(`${process.env.REACT_APP_ASISTENCIA_URL}/asistencia/#/login`);
    }
    cerrarSesion();
    //return (<Spinner /> );
}

export default CerrarSesion;