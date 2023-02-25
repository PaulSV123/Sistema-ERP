import React, {
  useState, useEffect, useRef, useContext,
  // useContext 
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as GoIcons from "react-icons/go";
import * as GiIcons from "react-icons/gi";
import * as TiIcons from "react-icons/ti";
import { UserContext } from "../components/context/UserContext";
// import styled from "styled-components";
// import { UserContext } from "../components/context/UserContext";

function SidebarReclutamiento({ sidebarOpen, setSidebarOpen }) {
  const { permisosUser } = useContext(UserContext);
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef(null);
  const sidebar = useRef(null);

  // const { user } = useContext(UserContext);
  const storedSidebarExpanded = true;
  //
  const mql = window.matchMedia("(min-width: 1536px)");
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
    mql.addEventListener("change", (e) => {
      let media = e.matches;
      media ? setExpand(true) : setExpand(false);
    });
    if (media) setExpand(true);
  }, [mql, media]);
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
          setSidebarOpen(!sidebarOpen);
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

          {
            <button
              className="absolute right-0 top-0 p-1 m-2 hidden text-gray-500 hover:text-gray-400 bg-gray-300 rounded-full"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
              </svg>
            </button>
          }

          {/* Logo */}
          <NavLink exact to="/dashAdmin" className="block">
            {!expand ? (
              <img
                className="w-auto h-9 xl:h-10"
                src={`${process.env.REACT_APP_ASISTENCIA_URL}/recursos/logo%20mini.svg`}
                //"https://desarrollo.consigueventas.com/Frontend/Recursos/logo%20mini.svg"
                alt="logo Consigue Ventas"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              />
            ) : (
              <img
                className="w-auto h-9 xl:h-10"
                src={`${process.env.REACT_APP_ASISTENCIA_URL}/recursos/Logo.svg`}
                //"https://desarrollo.consigueventas.com/Frontend/Recursos/Logo.svg"
                alt="logo Consigue Ventas"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              />
            )}
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
                Reclutamiento
              </span>
            </h3>
            <ul className="mt-3">
              {/* Requerimiento de personal */}
              {
                (permisosUser.includes("reclutamiento_requerimiento_personal")) && 
                (
                  <>
                    <li
                      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === "/" && "bg-gray-900"
                        }`}
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                      <NavLink
                        exact
                        to="/reclutamiento/tabla-requerimientos"
                        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname === "/" && "hover:text-gray-200"
                          }`}
                      >
                        <div className="flex items-center">
                          <svg
                            className="flex-shrink-0 h-8 w-8 text-gray-50"
                            viewBox="0 0 24 24"
                          >
                            <BsIcons.BsFillPersonLinesFill />
                          </svg>
                          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Requerimiento personal
                          </span>
                        </div>
                      </NavLink>
                    </li>
                    <hr className="w-10/12 h-1 bg-yellow-600 opacity-100"></hr>
                  </>
                )
              }

              {/* Recursos */}
              {
                (!permisosUser.includes("reclutamiento_recursos_perfil") & !permisosUser.includes("reclutamiento_recursos_manucomp")) ? 
                (
                  null
                ) : (
                  <>
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
                                    <FiIcons.FiLayers />
                                  </svg>
                                  <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Recursos
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
                                {
                                  (permisosUser.includes("reclutamiento_recursos_perfil")) && (
                                    <>
                                      <li className="mb-1 last:mb-0">
                                        <NavLink
                                          exact
                                          to="/reclutamiento/tabla-perfil"
                                          className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                                        >
                                          <span
                                            onClick={() => setSidebarOpen(!sidebarOpen)}
                                            className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                          >
                                            Perfiles
                                          </span>
                                        </NavLink>
                                        <hr className="w-10/12 h-0 bg-yellow-600"></hr>
                                      </li>
                                    </>
                                  )
                                }
                                {
                                  (permisosUser.includes("reclutamiento_recursos_manucomp")) && (
                                    <li className="mb-1 last:mb-0">
                                      <NavLink
                                        exact
                                        to="/reclutamiento/tabla-competencias"
                                        className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                                      >
                                        <span
                                          onClick={() => setSidebarOpen(!sidebarOpen)}
                                          className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                        >
                                          Manual de competencias
                                        </span>
                                      </NavLink>
                                    </li>
                                  )
                                }

                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                    <hr className="w-10/12 h-1 bg-yellow-600 opacity-100"></hr>
                  </>
                )
              }
              

              {/* Lista de postulantes */}
              {
                (permisosUser.includes("reclutamiento_lista_postulantes")) && 
                (
                  <>
                    <li
                      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === "/" && "bg-gray-900"
                        }`}
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                      <NavLink
                        exact
                        to="/reclutamiento/tabla-postulantes"
                        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname === "/" && "hover:text-gray-200"
                          }`}
                      >
                        <div className="flex items-center">
                          <svg
                            className="flex-shrink-0 h-8 w-8 text-gray-50"
                            viewBox="0 0 24 24"
                          >
                            <FaIcons.FaList />
                          </svg>
                          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Lista de postulantes
                          </span>
                        </div>
                      </NavLink>
                    </li>
                    <hr className="w-10/12 h-1 bg-yellow-600 opacity-100"></hr>
                  </>
                )
              }

              {/* Postulantes a entrevistar */}
              {permisosUser.includes("reclutamiento_postulante_a_entrevistar") && (<>
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === "/" && "bg-gray-900"
                    }`}
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <NavLink
                    exact

                    to="/reclutamiento/postulantes-entrevistar"
                    className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname === "/" && "hover:text-gray-200"
                      }`}

                  >
                    <div className="flex items-center">
                      <svg
                        className="flex-shrink-0 h-8 w-8 text-gray-50"
                        viewBox="0 0 24 24"
                      >
                        <FaIcons.FaUserFriends />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Postulantes entrevistar
                      </span>
                    </div>
                  </NavLink>
                </li>
                <hr className="w-10/12 h-1 bg-yellow-600 opacity-100"></hr>
              </>)}
              {/* Grupos entrevistas */}
              {permisosUser.includes("reclutamiento_postulante_a_entrevistar") && (<>
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === "/" && "bg-gray-900"
                    }`}
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <NavLink
                    exact

                    to="/reclutamiento/grupos-entrevistas"
                    className={`block text-gray-200 hover:text-white truncate transition duration-150 ${pathname === "/" && "hover:text-gray-200"
                      }`}

                  >
                    <div className="flex items-center">
                      <svg
                        className="flex-shrink-0 h-8 w-8 text-gray-50"
                        viewBox="0 0 24 24"
                      >
                        <TiIcons.TiGroup />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Grupos Entrevistas
                      </span>
                    </div>
                  </NavLink>
                </li>
                <hr className="w-10/12 h-1 bg-yellow-600 opacity-100"></hr>
              </>)}
              {/* Entrevista */}
              {(!permisosUser.includes('reclutamiento_entrevista_evaluacion_resugene')
                & !permisosUser.includes('reclutamiento_entrevista_evaluacioncv') & !permisosUser.includes('reclutamiento_entrevista_evaluacion_cond') & !permisosUser.includes('reclutamiento_entrevista_evaluacion_star') & !permisosUser.includes('reclutamiento_entrevista_evaluacion_conoci')) ? null : (<>
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
                                handleClick();
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
                                  <GiIcons.GiTalk />
                                </svg>
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Entrevista
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
                              {permisosUser.includes('reclutamiento_entrevista_resugene') && (<>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    exact
                                    to="/reclutamiento/tabla-resumen-general"
                                    className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                                  >
                                    <span
                                      onClick={() => setSidebarOpen(!sidebarOpen)}
                                      className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                    >
                                      Resumen general
                                    </span>
                                  </NavLink>
                                </li>
                                <hr className="w-10/12 h-0 bg-yellow-600"></hr>
                              </>)}
                              {permisosUser.includes('reclutamiento_entrevista_evaluacioncv') && (<>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    exact
                                    to="/reclutamiento/tabla-evaluacion-cv"
                                    className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                                  >
                                    <span
                                      onClick={() => setSidebarOpen(!sidebarOpen)}
                                      className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                    >
                                      Evaluación de CV
                                    </span>
                                  </NavLink>
                                </li>
                                <hr className="w-10/12 h-0 bg-yellow-600"></hr>
                              </>)}
                              {permisosUser.includes('reclutamiento_entrevista_evaluacion_cond') && (<>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    exact
                                    to="/reclutamiento/tabla-evaluacion-conducta"
                                    className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                                  >
                                    <span
                                      onClick={() => setSidebarOpen(!sidebarOpen)}
                                      className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                    >
                                      Evaluación de conducta
                                    </span>
                                  </NavLink>
                                </li>
                                <hr className="w-10/12 h-0 bg-yellow-600"></hr>
                              </>)}
                              {permisosUser.includes('reclutamiento_entrevista_evaluacion_star') && (<>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    exact
                                    to="/reclutamiento/tabla-evaluacion-star"
                                    className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                                  >
                                    <span
                                      onClick={() => setSidebarOpen(!sidebarOpen)}
                                      className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                    >
                                      Evaluación STAR
                                    </span>
                                  </NavLink>
                                </li>
                                <hr className="w-10/12 h-0 bg-yellow-600"></hr>
                              </>)}
                              {permisosUser.includes('reclutamiento_entrevista_evaluacion_conoci') && (<>
                                <li className="mb-1 last:mb-0">
                                  <NavLink
                                    exact
                                    to="/reclutamiento/tabla-evaluacion-conocimiento"
                                    className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                                  >
                                    <span
                                      onClick={() => setSidebarOpen(!sidebarOpen)}
                                      className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                    >
                                      Evaluación conocimiento
                                    </span>
                                  </NavLink>
                                </li>
                              </>)}
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                  <hr className="w-10/12 h-1 bg-yellow-600 opacity-100"></hr>
                </>
              )}
              {/* Reportes */}
              {permisosUser.includes('reclutamiento_reportes_graficos') && (<SidebarLinkGroup activecondition={pathname.includes("team")}>
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
                            handleClick();
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
                              <GoIcons.GoGraph />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Reportes
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
                              to="/reclutamiento/reporte-reclutados"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >
                                Total de reclutados
                              </span>
                            </NavLink>
                          </li>
                          <hr className="w-10/12 h-0 bg-yellow-600"></hr>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/reclutamiento/reporte-aceptacion-llamadas"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >
                                Total de aceptación llamadas
                              </span>
                            </NavLink>
                          </li>
                          <hr className="w-10/12 h-0 bg-yellow-600"></hr>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/reclutamiento/reporte-ingresantes"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >
                                Total de ingresantes
                              </span>
                            </NavLink>
                          </li>
                          <hr className="w-10/12 h-0 bg-yellow-600"></hr>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/reclutamiento/reporte-llamadas-entrevistas"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >
                                Total de llamadas/entrevistas
                              </span>
                            </NavLink>
                          </li>
                          <hr className="w-10/12 h-0 bg-yellow-600"></hr>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/reclutamiento/reporte-entrevistados"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >
                                Total de entrevistados
                              </span>
                            </NavLink>
                          </li>

                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>)}
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

export default SidebarReclutamiento;
