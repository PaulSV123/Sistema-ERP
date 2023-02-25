import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// import UserAvatar from '../../images/user-avatar-32.png';
import { UserContext } from '../../components/context/UserContext';
import Transition from '../../utils/Transition';
import {
  // distGetPermisos, distGetRoles,
  distGetUser, distSetAutentication
} from '../../dist/Autentication';


function UserMenu() {
  // Obteniendo contexto
  const { user, setUser, setPermisosUser, setRolesUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  useEffect(() => {
    if (user?.dni == null) {
      distSetAutentication(true);
      setUser(distGetUser());
      // setPermisosUser(distGetPermisos())
      // setRolesUser(distGetRoles())
    }
  }, [setUser, user, setPermisosUser, setRolesUser]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const redirectConfiguration = () => {
    setDropdownOpen(!dropdownOpen)
    return window.location.href=`${process.env.REACT_APP_ASISTENCIA_URL}/asistencia/#/dashadmin/configuracion`
    //'https://erp.consigueventas.com/asistencia/#/dashadmin/configuracion';
  }

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {
          user && (
          <div className="flex items-center truncate">
            <span className="truncate ml-2 text-sm font-medium text-gray-800 group-hover:text-gray-900">{user['nombre'] + ' ' + user['apellido']}</span>
            <svg className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-800" viewBox="0 0 12 12">
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </div>
        )
        }
        
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          {
            user && (
              <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
                <div className="font-medium text-gray-800">{user['nombre'] + ' ' + user['apellido']}</div>
                <div className="text-xs text-gray-500 italic">{user['TipoUsuario']}</div>
              </div>
            )
          }
          
          <ul>
            <li>
              <button
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                href=''
                onClick={redirectConfiguration}
              >
                Configuración
              </button>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/cerrarSesion"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Cerrar Sesión
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default UserMenu;