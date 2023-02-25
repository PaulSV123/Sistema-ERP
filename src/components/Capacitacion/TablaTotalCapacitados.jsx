import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { getPeticionCulminadosMes } from "../../dist/Capacitacion/getPeticiones";
import { getPeticionDepartamentoId } from "../../dist/getPeticiones";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { MenuItem, Select } from "@material-ui/core";


const useStyles = makeStyles({
  caja:{
    display:'flex',
    justifyContent:'center',
  },

  espaciado:{
    marginRight:'30px'
  }
});

function TablaTotalCapacitados() {

  const styles = useStyles();
  //API
  const [culminados, setCulminados] = useState([]);
  const [dataListarCulminados, setDataListarCulminados] = useState([]);
  const areaCulminados = dataListarCulminados.map((post) => post.Area);
  const cantidadCulminados = dataListarCulminados.map((post) => Number(post.Culminados) );
 
  //departamentos
  const [departamentos, setDepartamentos] = useState([]);
  //const [departamentoFiltroM, setDepartamentoFiltroM] = useState([]);
  
  const dateFormat = "YYYY/MM/DD";

  const [dataBody, setDataBody] = useState({
    fecha: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeticionCulminadosMes(setCulminados,dataBody,setDataListarCulminados, setLoading);
    //Peticion LISTAR Departamentos
    getPeticionDepartamentoId(setDepartamentos, setLoading);
  }, [loading]);

  // Funcion que almacena los cambios en el state de inputs de los departamentos
  const handleChangeDepM = (e) => {
    const { value } = e.target;
    setCulminados({ value });
  };

  //Funcion para los cambios para la fecha del Picker
  function handlePicker(date, dateString) {
    setDataBody({
        fecha: dateString,
      });
  }

  const peticionTotalCapacitados = async () => {
    getPeticionCulminadosMes(
      culminados.value,
      dataBody,
      setDataListarCulminados,
      setLoading
    );
  };

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          TOTAL DE CAPACITADOS FINALIZADOS
        </h3>
        <hr></hr>
      </div>
      <div>
          <br></br>

         <div className={ ` row p-4  ${styles.caja}` }>

            <div className={`md-col-6 ${styles.espaciado}`}>
                      <Select 
                        style={{ width: "240px" }}
                        className="flex-1 w-1/2"
                        onChange={handleChangeDepM}
                        value={culminados.value}
                        name="departamento"
                        label="Departamento"
                      >
                        {departamentos.map((option, i) => {
                          return (
                            <MenuItem key={i} value={option.id}>
                              {option.Unidades}
                            </MenuItem>
                          );
                        })}
                      </Select>
            </div>

            <div className="md-col-6">
              <DatePicker
                          selected={moment(dataBody.fecha)} 
                          format={dateFormat}
                          onChange={handlePicker}
                          size="large"
                          placeholder={["Fecha"]}
              />
            </div>

            <button
                className=" btn btn btn-warning mx-4 px-3 flex justify-center content-center"
                onClick={ peticionTotalCapacitados}
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/search.png"
                  style={{ width: "0.8rem", height: "0.8rem" }}
                  alt=""
                />
                <div className="font-semibold ml-1 text-gray-700">
                  Filtrar 
                </div>
              </button>

          </div>

          <div>
          <Bar
              data={{
                labels:  areaCulminados,
                datasets: [
                  {
                    label: "Capacitados",
                    data: cantidadCulminados ,
                    backgroundColor: ["#c7ae1eae"],
                    borderColor: ["#c7ae1eae"],
                    borderWidth: 2,
                    hoverBackgroundColor: ["#c7ae1e"],
                  },
                ],
              }}
              height={400}
              width={600}
             
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
               
              }}
            />
          </div>
      </div>
    </div>

  )
}

export default TablaTotalCapacitados