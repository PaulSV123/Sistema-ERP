import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import styled from "styled-components";
import { UserContext } from "../components/context/UserContext";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const { user } = useContext(UserContext);
  const storedSidebarExpanded = true;
  //
  const mql = window.matchMedia('(min-width: 1536px)');
  let media = mql.matches;
  // 
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  const [expand, setExpand] = useState(
    // localStorage.getItem("sidebar-expanded") ? true : false
    // storedSidebarExpanded === null ? false : true
    false
  );

  const expandir = () => {
    setExpand(!expand);

  };

  useEffect(() => {
    mql.addEventListener('change', (e) => {
      let media = e.matches;
      media ? setExpand(true) : setExpand(false);
    });
    if (media) setExpand(true);

  })
  const handleExpanded = () => {
    setSidebarExpanded(!sidebarExpanded);
    expandir();
  };
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
    // if (localStorage.getItem("sidebar-expanded")) {
    //   setExpand(true);

    // } else {
    //   setExpand(false);

    // }

  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-800 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-50" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
        onClick={() => {
          setSidebarOpen(!sidebarOpen)
        }}
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 flex-shrink-0 bg-gray-700 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
          }`}
      >
        {/* Sidebar header */}
        <div
          className="flex bg-gray-700 justify-center py-4 pr-3 px-3 sm:px-2"
        // style="border: solid #2D2D2B 10px;"
        >
          {/* Close button */}

          {<button
            className="absolute right-0 top-0 p-1 m-2 hidden text-gray-500 hover:text-gray-400 bg-gray-300 rounded-full"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>}

          {/* Logo */}
          <NavLink exact to="/dashAdmin" className="block">
            {
              !expand ? (
                <img
                  className="w-auto h-9 xl:h-10"
                  src={`${process.env.REACT_APP_ASISTENCIA_URL}/recursos/logo%20mini.svg`}
                  //"https://desarrollo.consigueventas.com/Frontend/Recursos/logo%20mini.svg"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                />
              ) : (
                <img
                  className="w-auto h-9 xl:h-10"
                  src={`${process.env.REACT_APP_ASISTENCIA_URL}/recursos/Logo.svg`}
                  //"https://desarrollo.consigueventas.com/Frontend/Recursos/Logo.svg"
                  alt=""
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                />
              )
            }
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8 pl-2">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Asistencia
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === "/" && "bg-gray-900"
                  }`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <NavLink
                  exact
                  to="/"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname === "/" && "hover:text-gray-200"
                    }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-8 w-8 text-gray-50"
                      viewBox="0 0 24 24"
                    >
                      <IoIcons.IoMdPie />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              <hr className="w-10/12 h-1 bg-yellow-600 opacity-100"></hr>
              {/* Empleado */}

              {user['id_TipoUsuario'] == 1 ? (

                <SidebarLinkGroup activecondition={pathname.includes("team")}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname.includes("people") && "hover:text-gray-200"
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg
                                className="flex-shrink-0 h-8 w-8 text-gray-50"
                                viewBox="0 0 24 24"
                              >
                                <BsIcons.BsPeopleFill />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Empleado
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex flex-shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-50 ${open && "transform rotate-180"
                                  }`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className=" lg:hidden lg:sidebar-expanded:block 2xl:block">
                          <ul
                            className={`bg-naranjaBajo pl-9 mt-1 ${!open && "hidden"
                              }`}
                          >
                            {user['id_TipoUsuario'] == 1 ? (
                              <li className="mb-1 last:mb-0">

                                <NavLink
                                  exact
                                  to="/tablaEmpleados"
                                  className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                                >
                                  <span
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Administración de Empleados
                                  </span>
                                </NavLink>

                              </li>
                            ) : null
                            }
                            <hr className="w-10/12 h-1 bg-yellow-600"></hr>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                exact
                                to="/restablecimientoContraseña"
                                className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                              >
                                <span
                                  onClick={() => setSidebarOpen(!sidebarOpen)}
                                  className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Restablecimiento de Contraseña
                                </span>
                              </NavLink>
                            </li>
                            <hr className="w-10/12 h-1 bg-yellow-600"></hr>
                            {user['id_TipoUsuario'] == 1 ? (
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  exact
                                  to="/tablaFaltas"
                                  className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                                >
                                  <span
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Tabla Faltas
                                  </span>
                                </NavLink>
                              </li>
                            ) : null
                            }
                            <hr className="w-10/12 h-1 bg-yellow-600"></hr>
                            {user['id_TipoUsuario'] == 1 ? (

                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  exact
                                  to="/calendarioEmpleados"
                                  className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                                >
                                  <span
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Calendario de Empleados
                                  </span>
                                </NavLink>
                              </li>
                            ) : null
                            }
                            <hr className="w-10/12 h-1 bg-yellow-600"></hr>
                            {user['id_TipoUsuario'] == 1 ? (

                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  exact
                                  to="/listaAdministradores"
                                  className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                                >
                                  <span
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Lista Administradores
                                  </span>
                                </NavLink>
                              </li>
                            ) : null
                            }
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              ) : null
              }

              {user['id_TipoUsuario'] == 1 ? (

                <hr className="w-10/12 h-1 bg-yellow-600 opacity-100"></hr>
              ) : null
              }

              {/* Perfil */}
              <SidebarLinkGroup activecondition={pathname.includes("team")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname.includes("team") && "hover:text-gray-200"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (sidebarExpanded) {
                            handleClick()
                          } else {
                            setSidebarExpanded(true);
                            // setExpand(false);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="flex-shrink-0 h-8 w-8 text-gray-50"
                              viewBox="0 0 24 24"
                            >
                              <FaIcons.FaUserCircle />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Perfil
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex flex-shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-50 ${open && "transform rotate-180"
                                }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul
                          className={`bg-naranjaBajo pl-9 mt-1 ${!open && "hidden"
                            }`}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/calendarioAsistencia"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Calendario de Asistencia{" "}
                              </span>
                            </NavLink>
                          </li>
                          <hr className="w-10/12 h-1 bg-yellow-600"></hr>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/datosPersonales"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Datos Personales
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/tabla-perfil"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Perfiles
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/tabla-requerimientos"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Requerimiento de personal
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/tabla-competencias"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Manual de competencias
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <hr className="w-10/12 h-1 bg-yellow-600 opacity-100"></hr>
              {/* Calendario General */}
              {/* { user['id_TipoUsuario'] == 1 ? (                            
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname.includes("calendar") && "bg-gray-900"
                }`}
              >
                <NavLink
                  exact
                  to="/"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("calendar") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-8 w-8 text-gray-50"
                      viewBox="0 0 24 24"
                    >
                      <IoIcons.IoMdCalendar />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Calendario General
                    </span>
                  </div>
                </NavLink>
              </li>
              ) : null
              } */}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={handleExpanded}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-gray-50"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-gray-50" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
