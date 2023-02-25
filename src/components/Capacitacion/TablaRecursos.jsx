import React, { useEffect, useState } from 'react';
import { Tabs, Tab, AppBar, Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { getPeticionesListarCursos } from '../../dist/Capacitacion/getPeticiones';

import TablaHabilidadesBlandas from './TablaHabilidadesBlandas';
import TablaHabilidadesDuras from './TablaHabilidadesDuras';
import { getPeticionPerfiles } from '../../dist/getPeticiones';
import { getPeticionPlataformas } from '../../dist/Capacitacion/getPeticiones';
import ModalCrearRecurso from './TablaRecursos/modals/ModalCrearRecurso/ModalCrearRecurso';



function TablaRecursos() {
  const [listarCursos, setListarCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [error, setError] = useState(false);
  const [perfilLista, setPerfilLista] = useState([]);
  const [plataformaLista, setPlataFormaLista] = useState([]);

  useEffect(() => {
    getPeticionesListarCursos(setListarCursos, setLoading);
    getPeticionPerfiles(setPerfilLista, setLoading);
    getPeticionPlataformas(setPlataFormaLista, setLoading);
  }, []);
  const actualizarTabla = (seccion=0) => {
    setSelectedTab(-1);
    setSelectedTab(seccion);
  }

  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          RECURSOS
        </h3>
      </div>
      <div className="mt-3">
        <div>
          <button
            className="bg-naranja -400 px-4 py-2 rounded ml-3 mb-3 border-2 border-orange-900 font-semibold text-white hover:bg-gray-700"
            onClick={() => setOpenModalCreate(true)}
          >
            AGREGAR
          </button>
        </div>
        <div>
          <AppBar position="static" className="md:w-1/" color="inherit">
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              aria-label="primary tabs example"
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="HABILIDADES BLANDAS" />
              <Tab label="HABILIDADES DURAS" />
            </Tabs>

            {selectedTab === 0 && <TablaHabilidadesBlandas />}
            {selectedTab === 1 && <TablaHabilidadesDuras />}
          </AppBar>
        </div>
      </div>
     <ModalCrearRecurso
        openModal={openModalCreate}
        closedModal={() => setOpenModalCreate(false)}
        error={error}
        perfilLista={perfilLista}
        plataformaLista={plataformaLista}
        actualizarTabla={actualizarTabla}
      /> 
      
      <div className="flex justify-center mt-3">
        <NavLink
          exact
          to="/capacitacion/listadoCurso"
          className="p-2 border rounded-lg bg-gray-700 text-gray-50 hover:text-gray-50 hover:bg-naranja text-lg"
        >
          Ver listado de cursos
        </NavLink>
      </div>
      <br />
    </div>
  );
}

export default TablaRecursos;
