import React, { useContext, useEffect, useState } from "react";
import UserMenu from "./header/UserMenu";
import * as AiIcons from "react-icons/ai";
import { Modal } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../components/context/UserContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: "14rem",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    backgroundColor: theme.palette.background.paper,
    boxshadow: theme.shadows[5],
    transform: "translate(5%, 5%)",
    borderRadius: "10px",
  },
}));

function Header({ sidebarOpen, setSidebarOpen, setSelectSidebar }) {
  // const menu = document.querySelector("#menu");
  const styles = useStyles();
  const { permisosUser, rolesUser } = useContext(UserContext);
  const tienePermisosReclutamiento = permisosUser.filter(permiso => permiso.includes('reclutamiento'))
  const tienePermisosCapacitacion = permisosUser.filter(permiso => permiso.includes('capacitacion'))
  const tienePermisosClima = permisosUser.filter(permiso => permiso.includes('climaycultura'))
  const tienePermisosJefeTh = permisosUser.filter(permiso => permiso.includes('jefeth'))
  const tienePermisosRoles = permisosUser.filter(permiso => permiso.includes('roles'))
  const tienePermisosRelacionesPublicas = permisosUser.filter(permiso => permiso.includes('relacionespublicas'))
  const [modalHeader, setModalHeader] = useState(false);
  const abrirCerrarModalHeader = () => {
    setModalHeader(!modalHeader);
  };
  const validarReclutar = rolesUser.filter(rol => rol.includes('reclutador'));
  const validarCapacitacion = rolesUser.filter(rol => rol.includes('capacitador'));
  const validarClima = rolesUser.filter(rol => rol.includes('clima'));
  const validarJefeTH = rolesUser.filter(rol => rol.includes('jefeth'));
  const validarGestion = rolesUser.filter(rol => rol.includes('roles'));
  const validarRelacionesPublicas = rolesUser.filter(rol => rol.includes('relacionespublicas'));


  //funcion validaciones
  const bodyHeader = (
    <div className={styles.modal}>
      <button
        onClick={() => {
          abrirCerrarModalHeader(false);
        }}
        className="absolute right-0 mt-2"
      >
        <svg
          className="flex-shrink-0 h-8 w-8 text-gray-900"
          viewBox="0 0 24 24"
        >
          <AiIcons.AiOutlineCloseCircle />
        </svg>
      </button>
      {(validarReclutar.length > 0 & tienePermisosReclutamiento.length > 0) ?
        (
          <NavLink
            exact
            to="/reclutamiento/tabla-requerimientos"
            className="font-bold text-black hover:text-gray-500 hover:underline my-3 mx-4" onClick={() => setSelectSidebar("Reclutamiento")} >
            Reclutamiento
          </NavLink>
        )
        : null}
      {(validarCapacitacion.length > 0 & tienePermisosCapacitacion.length > 0) ?
        (<NavLink
          exact
          to="/capacitacion/practicantes"
          className="font-bold text-black hover:text-gray-500 hover:underline my-3 mx-4" onClick={() => setSelectSidebar("Capacitacion")}>
          Capacitación
        </NavLink>) : null}
        {
            (validarRelacionesPublicas.length > 0 & tienePermisosRelacionesPublicas.length > 0) ? (
              <NavLink
                exact
                to="/boletines"
                className="font-bold text-black hover:text-gray-500 hover:underline my-3 mx-5 hidden lg:block" onClick={() => setSelectSidebar("Boletines")}>
                Boletines
              </NavLink>
            ): null
          }
      {(validarClima.length > 0 & tienePermisosClima.length > 0) ?
        (<NavLink
          exact
          to="/clima/colaboradores"
          className="font-bold text-black hover:text-gray-500 hover:underline my-3 mx-4" onClick={() => setSelectSidebar("ClimaCultura")}>
          Clima y cultura
        </NavLink>) : null}
      {/* {(validarJefeTH.length > 0 & tienePermisosJefeTh.length > 0) ?
        (<NavLink
          exact
          to="/"
          className="font-bold text-black hover:text-gray-500 hover:underline my-3 mx-4" onClick={() => setSelectSidebar("JefeTH")}>
          Jefe de TH
        </NavLink>) : null} */}
      {(validarGestion.length > 0 & tienePermisosRoles.length > 0) ?
        (<NavLink
          exact
          to="/roles/gestion-usuarios"
          className="font-bold text-black hover:text-gray-500 hover:underline my-3 mx-4" onClick={() => setSelectSidebar("Usuarios")}>
          Gestión de Roles
        </NavLink>) : null}
    </div>
  );


  return (
    <header className="sticky top-0 inset-0 bg-gray-300 text-gray-700 shadow-md border-b z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* boton para desplegar las opciones del header */}
          {((validarReclutar.length > 0 & tienePermisosReclutamiento.length > 0) & (validarCapacitacion.length > 0 & tienePermisosCapacitacion.length > 0) & (validarClima.length > 0 & tienePermisosClima.length > 0) & (validarJefeTH.length > 0 & tienePermisosJefeTh.length > 0) & (validarGestion.length > 0 & tienePermisosRoles.length > 0)) ?
            (<div className="block lg:hidden absolute left-5">
              <button
                onClick={() => {
                  abrirCerrarModalHeader();
                }}
                className="flex justify-self-center"
              >
                <svg
                  className={`w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-800 `}
                  viewBox="0 0 12 12"
                >
                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                </svg>
              </button>
            </div>) : null}

          {/* Hamburger button */}
          {((validarReclutar.length > 0 & tienePermisosReclutamiento.length > 0) & (validarCapacitacion.length > 0 & tienePermisosCapacitacion.length > 0) & (validarClima.length > 0 & tienePermisosClima.length > 0) & (validarJefeTH.length > 0 & tienePermisosJefeTh.length > 0) & (validarGestion.length > 0 & tienePermisosRoles.length > 0)) ? (<div className="flex absolute left-14">
            <button
              className="text-gray-700 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>) : null}
          {/* opciones del header */}
          {
            (validarReclutar.length > 0 & tienePermisosReclutamiento.length > 0) ?
              (
                <NavLink
                  exact
                  to="/reclutamiento/tabla-requerimientos"
                  className="font-bold text-black hover:text-gray-500 hover:underline my-3 mx-5 hidden lg:block" onClick={() => setSelectSidebar("Reclutamiento")}>
                  Reclutamiento
                </NavLink>
              ) : null
          }
          {
            (validarCapacitacion.length > 0 & tienePermisosCapacitacion.length > 0) ?
              (
                <NavLink
                  exact
                  to="/capacitacion/practicantes"
                  className="font-bold text-black hover:text-gray-500 hover:underline my-3 mx-5 hidden lg:block" onClick={() => setSelectSidebar("Capacitacion")}>
                  Capacitación
                </NavLink>
              ) : null
          }
          {
            (validarRelacionesPublicas.length > 0 & tienePermisosRelacionesPublicas.length > 0) ? (
              <NavLink
                exact
                to="/boletines"
                className="font-bold text-black hover:text-gray-500 hover:underline my-3 mx-5 hidden lg:block" onClick={() => setSelectSidebar("Boletines")}>
                Boletines
              </NavLink>
            ): null
          }
          {
            (validarClima.length > 0 & tienePermisosClima.length > 0) ?
              (
                <NavLink
                  exact
                  to="/clima/colaboradores"
                  className="font-bold text-black hover:text-gray-500 hover:underline my-3 mx-5 hidden lg:block" onClick={() => setSelectSidebar("ClimaCultura")}>
                  Clima y Cultura
                </NavLink>
              ) : null
          }
          {/* {
            (validarJefeTH.length > 0 & tienePermisosJefeTh.length > 0) ?
              (
                <NavLink
                  exact
                  to="/jefeth"
                  className="font-bold text-black hover:text-gray-500 hover:underline my-3 mx-5 hidden lg:block" onClick={() => setSelectSidebar("JefeTH")}>
                  Jefe de TH
                </NavLink>
              ) : null
          } */}
          {
            (validarGestion.length > 0 & tienePermisosRoles.length > 0) ?
              (<NavLink
                exact
                to="/roles/gestion-usuarios"
                className="font-bold text-black hover:text-gray-500 hover:underline my-3 mx-5 hidden lg:block" onClick={() => setSelectSidebar("Usuarios")}>
                Gestión de usuarios
              </NavLink>)
              : null
          }
          <div className="flex items-center ml-auto">
            <div style={{ width: '2.5rem', height: '2.5rem', padding: '0.5rem', backgroundColor: '#ffb45c', borderRadius: '10px' }}>
              <button onClick={() => {
                //let route = window.location;
                //console.log(route);
                //route['hash'] = 'https://desarrollo.consigueventas.com/Frontend/Asistencia/#/home';
                //window.location.replace("https://desarrollo.consigueventas.com/Frontend/Asistencia/#/home");
                window.location.replace(`${process.env.REACT_APP_ASISTENCIA_URL}/asistencia/#/home`);
              }}>
                <img src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-back-arrow-mintab-for-ios-becris-lineal-becris.png" alt="" />
              </button>
            </div>
            {/* Divider  */}
            <hr className="w-px h-6 bg-gray-800 mx-3 hidden lg:block" />
            <UserMenu />
          </div>
        </div>
        <Modal open={modalHeader} onClose={abrirCerrarModalHeader}>
          {bodyHeader}
        </Modal>
      </div>
    </header>
  );
}

export default Header;
