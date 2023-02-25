import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import Grid from "@mui/material/Grid";
import {getPeticionDiagramaCascada} from '../apis/peticionGet.js'
import '../components/styles/StyleCascada.css'

const DiagramaCascada = ({dataCascada}) => {

  const [datos, setDatos] = useState([])

  const dataAdapter = (data) => {
    let datos = [];
    data.map((element) => {
      const dataGraficoBarra = {
        año: element?.Año || [],
        meses: element?.Meses.map((mes) => {
          return {
            mes: mes?.Mes,
            departamentos: mes?.Departamentos.map((dp) => {
              return {
                departamento: dp?.Departamento,
                inducidos: dp?.NroInducidosDepartamento,
                areas: dp?.Areas.map((area) => {
                  return {
                    area: area?.Area,
                    aInducidos: area?.NroInducidosArea,
                    colaboradores: area?.Colaboradores
                  };
                })
              };
            })
          };
        })
      };
      datos.push(dataGraficoBarra);
    });

    return datos;
  };
  const traerData = () => {
    const data = dataAdapter(dataCascada);
    setDatos(data)
  }
  useEffect(() => {
    traerData();
  }, [dataCascada])
  
  return (
    <div className="contenedor_general">
      <div className="title">
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <div className="title-diagrama">
              <h3 className="titulo-text">Año - Mes - Area</h3>
            </div>
          </Grid>
          <Grid item xs={4}>
            <h3 className="titulo-text2">Cantidad de Inducidos</h3>
          </Grid>
        </Grid>
      </div>
      <div>
        {datos.map((d) => {
          return (
            <details className="an" key={d.año}>
              <summary className="summary-style">
                <AiFillCaretDown className="imgFlecha" size="1rem" />
                <div>{d.año}</div>
              </summary>
              {d.meses.map((m) => (
                <details className="mes" key={m.mes}>
                  <summary className="summary-style">
                    <AiFillCaretDown className="imgFlecha2" size="1rem" />
                    {m.mes}
                  </summary>
                  {m.departamentos.map((dp) => (
                    <details className="dpto" key={dp.departamento}>
                      <summary >
                        <Grid  container spacing={2}>
                          <Grid className="summary-style" item xs={8}>
                            <AiFillCaretDown
                              className="imgFlecha3"
                              size="1rem"
                            />
                            <div>{dp.departamento}</div>
                          </Grid>
                          <Grid item xs={4}>
                            <p>{dp.inducidos}</p>
                          </Grid>
                        </Grid>
                      </summary>
                      {dp.areas.map((ar) => (
                        <details className="ar" key={ar.area}>
                          <summary >
                            <Grid container spacing={2}>
                              <Grid className="summary-style" item xs={9.5}>
                                <AiFillCaretDown
                                  className="imgFlecha4"
                                  size="1rem"
                                />
                                <div>{ar.area}</div>
                              </Grid>
                              <Grid item xs={2.5}>
                                {ar.aInducidos}
                              </Grid>
                            </Grid>
                          </summary>
                          {ar.colaboradores.map((c) => (
                            <summary className="col summary-style">
                              <AiOutlineUser size="1rem" />
                              {ar.colaboradores}
                            </summary>
                          ))}
                        </details>
                      ))}
                    </details>
                  ))}
                </details>
              ))}
            </details>
          )
        })}
      </div>
    </div>
  )
}

export default DiagramaCascada;
