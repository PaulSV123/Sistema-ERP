import { InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './styles/useStyles';
const ModalTipoHabilidad =React.forwardRef(({ closedModal, openHD, openHB },ref)=> {
  const styles = useStyles();
  const [tipoHabilidad, setTipoHabilidad] = useState(0);


  return ( 
    <div className={styles.modal}>
      <h3 className="text-center text-lg font-bold">Tipo de Habilidad</h3>
      <hr />
      <br />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col align-middle "
      >
        <InputLabel id="habilidad" required>
          Escoja un tipo de Habilidad
        </InputLabel>
        <Select
          labelId="Tipo"
          id="Tipo"
          label="Tipo de habilidad"
          name="tipo"
          value={tipoHabilidad}
          onChange={(e) => setTipoHabilidad(e.target.value)}
        >
          <MenuItem value={10}>Habilidades Blandas</MenuItem>
          <MenuItem value={20}>Habilidades Duras</MenuItem>
          <MenuItem value={0}></MenuItem>
        </Select>

        <br />
        {tipoHabilidad === 10 && (
          <div align="center">
            <button
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
              type="submit"
              onClick={openHB}
            >
              SIGUIENTE
            </button>
            <button
            type='button'
              onClick={closedModal}
              className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
            >
              
              CANCELAR
            </button>
          </div>
        )}
        {tipoHabilidad === 20 && (
          <div align="center">
            <button
              className="bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border"
              type="submit"
              onClick={openHD}
            >
              SIGUIENTE
            </button>
            <button
              onClick={closedModal}
              type='button'
              className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
            >
              CANCELAR
            </button>
          </div>
        )}
      </form>
    </div>
  );
});


export default ModalTipoHabilidad;
