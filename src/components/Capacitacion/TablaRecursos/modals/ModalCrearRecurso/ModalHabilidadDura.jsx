import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { postInsertarCurso } from '../../../../../dist/Capacitacion/postPeticiones';
import Error from '../../../../item/Error';
import useStyles from './styles/useStyles';

const ModalHabilidadDura = React.forwardRef(
  ({ info, closedModal, closedAll, openModalConfirmacion }, ref) => {
    const [dataNewCourse, setDataNewCourse] = useState({
      tipo: 4,
      codigo: '',
      enlace: '',
      evaluar: '',
      nombre: '',
      plataforma: '',
      perfilCurso: '',
      tiempo: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const styles = useStyles();
    const { perfiles, plataformas, actualizarTabla } = info;

    const handleSubmitNewCourse = (e) => {
      e.preventDefault();
      const newCourse = {
        fkTipoCur: dataNewCourse.tipo,
        fkPerfCur: dataNewCourse.perfilCurso,
        codigo: dataNewCourse.codigo,
        nombre: dataNewCourse.nombre,
        enlace: dataNewCourse.enlace,
        fkPlatCur: dataNewCourse.plataforma,
        tiempo: dataNewCourse.tiempo,
        modoEvaluar: dataNewCourse.evaluar,
        modoEvaluarEnlace: dataNewCourse.enlace,
      };
      console.log(newCourse);
      setLoading(true);
      postInsertarCurso(newCourse, setLoading).then((data) => {
        if (data?.errors) {
          setError(data.errors);
        } else {
          openModalConfirmacion();
          closedAll();
          actualizarTabla(1);
        }
      });
    };

    const handleAddDataNewCourse = (e) => {
      e.preventDefault();
      setDataNewCourse({
        ...dataNewCourse,
        [e.target.name]: e.target.value,
      });
    };
    return (
      <div className={styles.modalAgregar}>
        <h3 className="text-center text-lg font-bold">
          Agregar Habilidad Dura
        </h3>
        <hr />
        <br />
        <form
          className="flex flex-col align-middle "
          onSubmit={handleSubmitNewCourse}
        >
          <div className="flex  justify-evenly md:flex-col">
            <div className="flex flex-col ">
              <TextField
                disabled={loading}
                required
                className="flex-1"
                style={{ width: '200px' }}
                name="codigo"
                label="Codigo"
                type="text"
                onChange={handleAddDataNewCourse}
                value={dataNewCourse.codigo}
              />
              <Error errors={error['codigo']}></Error>
              <br />
              <TextField
                disabled={loading}
                required
                className="flex-1"
                style={{ width: '200px' }}
                name="enlace"
                label="Enlace"
                type="text"
                onChange={handleAddDataNewCourse}
                value={dataNewCourse.enlace}
              />
              <Error errors={error['enlace']}></Error>
              <br />
              <TextField
                disabled={loading}
                required
                className="flex-1"
                style={{ width: '200px' }}
                name="evaluar"
                label="Modo a Evaluar"
                type="text"
                onChange={handleAddDataNewCourse}
                value={dataNewCourse.evaluar}
              />
              <Error errors={error['evaluar']}></Error>

              <br />
              <TextField
                disabled={loading}
                required
                className="flex-1"
                style={{ width: '200px' }}
                name="nombre"
                label="Nombre"
                type="text"
                onChange={handleAddDataNewCourse}
                value={dataNewCourse.nombre}
              />
              <Error errors={error['nombre']}></Error>
              <br />
              <TextField
                disabled={loading}
                required
                className="flex-1"
                style={{ width: '200px' }}
                name="tiempo"
                label="Tiempo"
                type="time"
                onChange={handleAddDataNewCourse}
                value={dataNewCourse.tiempo}
              />
              <Error errors={error['tiempo']}></Error>
              <br />
            </div>

            <div className="flex flex-col ">
              <InputLabel id="PerfilHB" required>
                Perfil
              </InputLabel>
              <Select
                disabled={loading}
                required
                style={{ width: '200px' }}
                name="perfilCurso"
                label="Perfil"
                onChange={handleAddDataNewCourse}
                value={dataNewCourse.perfilCurso}
              >
                {perfiles.map((option, i) => {
                  return (
                    <MenuItem key={i} value={option.perfil_Id}>
                      {option.perfil_nombre}
                    </MenuItem>
                  );
                })}
                <MenuItem key={'none'} value=""></MenuItem>
              </Select>
              <Error errors={error['perfil']}></Error>
              <br />

              <InputLabel id="Plataforma" required>
                Plataforma
              </InputLabel>
              <Select
                disabled={loading}
                required
                style={{ width: '200px' }}
                name="plataforma"
                label="plataforma"
                onChange={handleAddDataNewCourse}
                value={dataNewCourse.plataforma}
              >
                {plataformas.map((option, i) => {
                  const id = parseInt(option.ID);
                  return (
                    <MenuItem key={i} value={id}>
                      {option.Plataforma}
                    </MenuItem>
                  );
                })}
                <MenuItem key={'none'} value=""></MenuItem>
              </Select>
              <Error errors={error['plataforma']}></Error>
              <br />
              <TextField
                disabled
                className="flex-1"
                style={{ width: '200px' }}
                name="tipo"
                label="Tipo de Curso"
                defaultValue="Habilidades Duras"
                type="text"
              />
              <Error errors={error['tipo']}></Error>
              <br />
            </div>
          </div>
          <br />
          <div align="center">
            <button
              disabled={loading}
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
              type="submit"
            >
              AGREGAR
            </button>
            <button
              disabled={loading}
              type="button"
              onClick={closedModal}
              className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    );
  }
);

export default ModalHabilidadDura;
