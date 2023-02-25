import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getCarpetasBoletines,
  putMoverArchivoOtraCarpeta,
} from "../../dist/Boletines/peticiones";
import MyModal from "../../partials/MyModal";

const ModalMoverA = ({ modalMovera, setModalMovera, setResponse }) => {
  const [carpetas, setCarpetas] = useState([]);
  const [idcarp, setIdcarp] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCarpetasBoletines(setCarpetas);
  }, []);

  useEffect(() => {
    if (modalMovera.open) {
      setError(null);
      setIdcarp(0);
    }
  }, [modalMovera.open]);

  const handleSubmitMoveFile = () => {
    if (idcarp === 0) {
      setError("Elija una carpeta");
    } else {
      setError(null);
      setLoading(true);
      putMoverArchivoOtraCarpeta(
        modalMovera.idArchivo,
        idcarp,
        setResponse,
        setLoading
      );
      //console.log(idcarp,modalMovera.idArchivo);
    }
  };

  /* useEffect(()=>{
        if(!loading){

        }
      },[loading]) */

  const bodyMoverFileA = (
    <div className="flex flex-col  px-1">
      <h1 className="text-2xl font-medium text-center mb-4">
        Mover de Carpeta
      </h1>
      <br />
      <div>
        <FormControl variant="outlined" fullWidth error={error ? true : false}>
          <InputLabel id="demo-simple-select-outlined-label">
            Mover a
          </InputLabel>
          <Select
            id="slect-carpetas"
            value={idcarp}
            onChange={(e) => setIdcarp(e.target.value)}
            label="Mover a "
            disabled={loading}
          >
            <MenuItem value={0}>--Elija una carpeta--</MenuItem>
            {carpetas.map((carp, index) => (
              <MenuItem key={index} value={carp.Id_Año}>
                {carp.Año}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error && error}</FormHelperText>
        </FormControl>
      </div>
      <br />
      <div align="center" className=" mt-6">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <button
              className={`bg-naranja h-1/5 py-2 px-3 mx-2 hover:bg-gray-700 hover:text-white border `}
              onClick={handleSubmitMoveFile}
            >
              Mover
            </button>
            <button
              onClick={() => setModalMovera({ idArchivo: null, open: false })}
              className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
            >
              CANCELAR
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <MyModal
      openModal={modalMovera.open}
      onCloseModal={() => setModalMovera({ idArchivo: null, open: false })}
    >
      {bodyMoverFileA}
    </MyModal>
  );
};

export default ModalMoverA;
