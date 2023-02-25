import React, {
  useState,
  useEffect,
  useRef,
  //  useContext
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as GoIcons from "react-icons/go";
// import styled from "styled-components";
// import { UserContext } from "../components/context/UserContext";

function SidebarCapacitacion({ sidebarOpen, setSidebarOpen }) {
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
  }, [media, mql]);
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
        className={`fixed inset-0 bg-gray-800 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-50" : "opacity-0 pointer-events-none"
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
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 flex-shrink-0 bg-gray-700 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
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
                onClick={() => setSidebarOpen(!sidebarOpen)}
                alt=""
              />
            ) : (
              <img
                className="w-auto h-9 xl:h-10"
                src={`${process.env.REACT_APP_ASISTENCIA_URL}/recursos/Logo.svg`}
                //"https://desarrollo.consigueventas.com/Frontend/Recursos/Logo.svg"
                alt=""
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
                Capacitación
              </span>
            </h3>
            <ul className="mt-3">
              {/* Practicantes seleccionados */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === "/" && "bg-gray-900"
                }`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <NavLink
                  exact
                  to="/capacitacion/practicantes"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname === "/" && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-8 w-8 text-gray-50"
                      viewBox="0 0 24 24"
                    >
                      <RiIcons.RiUserFollowLine />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Practicantes seleccionados
                    </span>
                  </div>
                </NavLink>
              </li>
              <hr className="w-10/12 h-1 bg-yellow-600 opacity-100"></hr>

              {/* Cursos */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === "/" && "bg-gray-900"
                }`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <NavLink
                  exact
                  to="/capacitacion/recursos"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname === "/" && "hover:text-gray-200"
                  }`}
                >
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
                </NavLink>
              </li>
              <hr className="w-10/12 h-1 bg-yellow-600 opacity-100"></hr>

              {/* Personas a Evaluar*/}
              <SidebarLinkGroup activecondition={pathname.includes("team")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes("team") && "hover:text-gray-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (sidebarExpanded) {
                            handleClick();
                          } else {
                            setSidebarExpanded(true);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <svg
                              className="flex-shrink-0 h-8 w-8 text-gray-50"
                              viewBox="0 0 24 24"
                            >
                            <FiIcons.FiCheckCircle />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                             Personas a Evaluar
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex flex-shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-50 ${
                                open && "transform rotate-180"
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
                          className={`bg-naranjaBajo pl-9 mt-1 ${
                            !open && "hidden"
                          }`}
                        >
                            {/* Aspectos a Evaluar*/}
                            
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/capacitacion/aspectos"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >
                                Aspectos a Evaluar
                              </span>
                            </NavLink>
                          </li>
                          <hr className="w-10/12 h-1 bg-yellow-600"></hr>

                            {/* Actividades */}

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/capacitacion/actividades"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >
                              Actividades
                              </span>
                            </NavLink>
                          </li>
                          <hr className="w-10/12 h-1 bg-yellow-600"></hr>

                           {/* Plataformas */}

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/capacitacion/plataformas"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >
                               Plataformas
                              </span>
                            </NavLink>
                          </li>
                          <hr className="w-10/12 h-1 bg-yellow-600"></hr>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Evaluación */}
              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === "/" && "bg-gray-900"
                }`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <NavLink
                  exact
                  to="/capacitacion/evaluacion"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname === "/" && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-8 w-8 text-gray-50"
                      viewBox="0 0 24 24"
                    >
                      <FaIcons.FaFileContract />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Evaluación
                    </span>
                  </div>
                </NavLink>
              </li>
              <hr className="w-10/12 h-1 bg-yellow-600 opacity-100"></hr>

              {/* Evaluación de desempeño */}
              {/*
              /*<li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  pathname === "/" && "bg-gray-900"
                }`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <NavLink
                  exact
                  to="/"
                  className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                    pathname === "/" && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-8 w-8 text-gray-50"
                      viewBox="0 0 24 24"
                    >
                      <FaIcons.FaFileSignature />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Evaluación de desempeño
                    </span>
                  </div>
                </NavLink>
              </li>
                <hr className="w-10/12 h-1 bg-yellow-600 opacity-100"></hr>*/}

              {/* Reportes */}
              <SidebarLinkGroup activecondition={pathname.includes("team")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-200 hover:text-white truncate transition duration-150 ${
                          pathname.includes("team") && "hover:text-gray-200"
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
                              className={`w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-50 ${
                                open && "transform rotate-180"
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
                          className={`bg-naranjaBajo pl-9 mt-1 ${
                            !open && "hidden"
                          }`}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/capacitacion/ingresos"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >
                                Ingresos y retiros
                              </span>
                            </NavLink>
                          </li>
                          <hr className="w-10/12 h-1 bg-yellow-600"></hr>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/capacitacion/total-capacitados"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >
                                Total de capacitados
                              </span>
                            </NavLink>
                          </li>
                          <hr className="w-10/12 h-1 bg-yellow-600"></hr>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/capacitacion/reporte-semanal"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >
                                Reportes generales
                              </span>
                            </NavLink>
                          </li>
                          <hr className="w-10/12 h-1 bg-yellow-600"></hr>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/capacitacion/colaboradores"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >
                                Colaboradores a inducir
                              </span>
                            </NavLink>
                          </li>
                          <hr className="w-10/12 h-1 bg-yellow-600"></hr>

                          <li className="mb-1 last:mb-0">
                            <NavLink
                              exact
                              to="/capacitacion/capacitadosGeneral"
                              className="block text-gray-50 hover:text-gray-600 transition duration-150 truncate"
                            >
                              <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                              >
                                Capacitados en General
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
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

export default SidebarCapacitacion;
