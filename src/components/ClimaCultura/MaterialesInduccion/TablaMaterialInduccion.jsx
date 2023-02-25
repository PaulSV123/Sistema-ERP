import { Box, Button, Modal, Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { deleteEliminarDatosInduccion } from "../../../dist/ClimaCultura/deletePeticiones";
import { getPeticionRecursosInduccion } from "../../../dist/ClimaCultura/getPeticiones";
import { postPeticionAgregarRecurso } from "../../../dist/ClimaCultura/postPeticiones";
import { putActualizarDatosInduccion } from "../../../dist/ClimaCultura/putPeticiones";
import {
  getPeticionAreasApi,
  getPeticionDepartamentoApi,
  getPeticionMarcasApi,
  getPeticionPerfilesApi,
} from "../Integracion/Apis/getPeticonesApis";
import { columnas, localization, options } from "./configTabla";
import ModalActualizar from "./modals/ModalActualizar";
import ModalCrear from "./modals/ModalCrear";
import ModalEliminar from "./modals/ModalEliminar";

const Tabla = ({
  recursos,
  datosSelect,
  actualizarRecurso,
  eliminarRecurso,
}) => {
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  const [recursoActualizar, setRecursoActualizar] = useState();
  const [recursoIdEliminar, setRecursoIdEliminar] = useState();

  const handleOpenModalEditar = () => setOpenModalEditar(true);
  const handleOpenModalEliminar = () => setOpenModalEliminar(true);

  const handleCloseModalEditar = () => setOpenModalEditar(false);
  const handleCloseModalEliminar = () => setOpenModalEliminar(false);
  useEffect(() => {
    console.log("Repintando Tabla");
  });

  const abrirModalEditar = {
    icon: "edit",
    tooltip: "Editar",
    onClick: (event, recurso) => {
      let recursoAdaptado = adapterRecursoactualizar(recurso);
      setRecursoActualizar(recursoAdaptado);
      handleOpenModalEditar();
    },
  };

  const abrirModalEliminar = {
    icon: "delete",
    tooltip: "Eliminar",
    onClick: (event, recurso) => {
      let recursoId = adapterRecursoEliminar(recurso);
      setRecursoIdEliminar(recursoId);
      handleOpenModalEliminar();
    },
  };

  return (
    <>
      <Modal
        open={openModalEditar}
        onClose={handleCloseModalEditar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <ModalActualizar
            cerrarModals={handleCloseModalEditar}
            datosSelect={datosSelect}
            actualizarRecurso={actualizarRecurso}
            datosRecursoFila={recursoActualizar}
          />
        </>
      </Modal>
      <Modal
        open={openModalEliminar}
        onClose={handleCloseModalEliminar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <ModalEliminar
            cerrarModals={handleCloseModalEliminar}
            eliminarRecurso={eliminarRecurso}
            ID={recursoIdEliminar}
          />
        </>
      </Modal>
      <MaterialTable
        title={"Tabla Material de Inducción"}
        columns={columnas}
        data={recursos}
        actions={[abrirModalEditar, abrirModalEliminar]}
        options={options}
        localization={localization}
      />
    </>
  );
};

const useDataSelect = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [perfiles, setPerfiles] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    //getPeticionMarcasTodas(setMarcas);
    getPeticionMarcasApi().then((datos) => {
      setMarcas(datos);
    });
    getPeticionPerfilesApi().then((datos) => {
      setPerfiles(datos);
    });
    getPeticionDepartamentoApi().then((datos) => {
      setDepartamentos(datos);
    });
    getPeticionAreasApi().then((datos) => {
      setAreas(datos);
    });
  }, []);

  return [departamentos, marcas, perfiles, areas];
};

const adapterRecurso = (data) => {
  const recurso = {
    idRecurso: data.Idrecurso,
    actualizacion: data.Actualizacion,
    area: data.Area,
    departamento: data.Departamento,
    enlace: data.Enlace,
    idTurno: data.IdTurno,
    idArea: data.Idarea,
    idMarca: data.Idmarca,
    idNombrerecurso: data.Idnombrerecurso,
    idPerfil: data.Idperfil,
    idUnidad: data.Idunidad,
    marca: data.Marca,
    nombreRecurso: data.NombredeRecurso,
    perfil: data.Perfil,
    recurso: data.Recurso,
    turno: data.Turno,
  };
  return recurso;
};

const adapterRecursos = (data = []) => {
  const recursos = data.map((recurso) => adapterRecurso(recurso));
  return recursos;
};

const adapterRecursoEnviar = (data) => {
  const recursoEnv = {
    marca: data.marca,
    nombre: data.nombreRecurso,
    perfil: data.perfil,
    turno: data.turno,
    actualizacion: data.actualizacion,
    area: data.area,
    unidad: data.departamento,
    enlace: data.enlace,
  };
  return recursoEnv;
};

const adapterRecursoactualizar = (data) => {
  const recursoActualizar = {
    id: data.idRecurso,
    marca: data.idMarca,
    nombreRecurso: data.nombreRecurso,
    perfil: data.idPerfil,
    turno: data.idTurno,
    actualizacion: data.actualizacion,
    area: data.idArea,
    departamento: data.idUnidad,
    enlace: data.enlace,
  };
  return recursoActualizar;
};

const adapterRecursoEliminar = (data) => {
  const recursoEliminar = {
    id: data.idRecurso,
    marca: data.idMarca,
    nombreRecurso: data.nombreRecurso,
    perfil: data.idPerfil,
    turno: data.idTurno,
    actualizacion: data.actualizacion,
    area: data.idArea,
    departamento: data.idUnidad,
    enlace: data.enlace,
  };
  return recursoEliminar;
};

const useAdministrarRecursos = () => {
  const [recursos, setRecursos] = useState([]);

  useEffect(() => {
    getPeticionRecursosInduccion().then((recursos_) => {
      setRecursos(adapterRecursos(recursos_));
    });
  }, []);

  const repintarTabla = () => {
    setRecursos([]);
    getPeticionRecursosInduccion().then((recursos_) => {
      setRecursos(adapterRecursos(recursos_));
    });
  };

  const actualizarRecurso = (id, data, cerrarModals) => {
    const recursoActualizar = adapterRecursoEnviar(data);
    putActualizarDatosInduccion(id, recursoActualizar).then((exito) => {
      if (exito) {
        cerrarModals();
        repintarTabla();
      } else {
        console.log("Error al actualizar un recurso");
      }
    });
  };

  const eliminarRecurso = (id, data, cerrarModals) => {
    const recursoEliminar = adapterRecursoEnviar(data);
    deleteEliminarDatosInduccion(id, recursoEliminar).then((exito) => {
      if (exito) {
        cerrarModals();
        repintarTabla();
      } else {
        console.log("Error eliminar un recurso");
      }
    });
  };
  const agregarRecurso = (data, cerrarModals) => {
    const nuevoRecurso = adapterRecursoEnviar(data);
    postPeticionAgregarRecurso(nuevoRecurso).then((exito) => {
      if (exito) {
        cerrarModals();
        repintarTabla();
      } else {
        console.log("Error al agregar un Recurso");
      }
    });
  };
  return [recursos, agregarRecurso, actualizarRecurso, eliminarRecurso];
};

const BotonModalCrear = ({ datosSelect, agregarRecurso }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        className="bg-yellow-400 px-4 py-2 rounded ml-3 mb-3 border-2 border-gray-900 font-semibold text-black"
        onClick={handleOpen}
      >
        AGREGAR
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <ModalCrear
            cerrarModals={handleClose}
            datosSelect={datosSelect}
            agregarRecurso={agregarRecurso}
          />
        </>
      </Modal>
    </div>
  );
};

const TablaMaterialInduccion = () => {
  //const [r, setR]=useState(0);
  const [departamentos, marcas, perfiles, areas] = useDataSelect();

  const datosSelect = { departamentos, marcas, perfiles, areas };

  const [recursos, agregarRecurso, actualizarRecurso, eliminarRecurso] =
    useAdministrarRecursos();
  return (
    <div className="container mx-auto">
      <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
        Material de Inducción
      </h3>

      <BotonModalCrear
        datosSelect={datosSelect}
        agregarRecurso={agregarRecurso}
      />
      <Tabla
        recursos={recursos}
        datosSelect={datosSelect}
        actualizarRecurso={actualizarRecurso}
        eliminarRecurso={eliminarRecurso}
      />
    </div>
  )
};

export default TablaMaterialInduccion;
