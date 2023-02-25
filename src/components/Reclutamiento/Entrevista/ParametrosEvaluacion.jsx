import React from "react";

const ParametrosEvaluacion = ({
  calificacion,
  califAprobado,
  califAprobadoBajo,
  califDesaprobado,
  puntajeTotal,
  puntTotAprobado,
  puntTotDesaprobado,
}) => {
  return (
    <>
      <h2 className="font-bold  text-black">Parametros de Evaluacion</h2>
      <div className="flex p-3 ">
        <div>
          <h3 className="font-semibold  text-black">{calificacion}</h3>
          <ul>
            <li className="text-black">{califAprobado}</li>
            <li className="text-black">{califAprobadoBajo}</li>
            <li className="text-black">{califDesaprobado}</li>
          </ul>
        </div>
        <div className="ml-5">
          <h3 className="font-semibold text-black">{puntajeTotal}</h3>
          <ul>
            <li className="text-black">{puntTotAprobado}</li>
            <li className="text-black">{puntTotDesaprobado}</li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default ParametrosEvaluacion;
