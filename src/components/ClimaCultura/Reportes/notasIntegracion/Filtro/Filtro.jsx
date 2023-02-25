import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useEffect, useState } from "react";
import { DatePicker, Menu } from "antd";
import moment from "moment";
import { getPeticionDepartamentoFiltro, getPeticionAllDepartamentos } from "../../../../../dist/getPeticiones";
import "./Filtro.css";
import { areArraysEqual } from "@mui/base";


/* ------------------------------------------------------------------------------------------------- */


function ReportePracticantesInducidos({ setDatosFiltro }) {

    const [loading, setLoading] = useState(false);
    const [unidades, setUnidades] = useState([]);

    getPeticionAllDepartamentos(setUnidades, setLoading);

    const turnos = [
        { Id: '1', Turno: 'Mañana' },
        { Id: '2', Turno: 'Tarde' },
        { Id: '3', Turno: 'Mañana y Tarde' }
    ]

    const semanas = [
        { Id: '1', Semana: 'Semana 1' },
        { Id: '2', Semana: 'Semana 2' },
        { Id: '3', Semana: 'Semana 3' },
        { Id: '4', Semana: 'Semana 4' },

    ];

    const filtrarDatos = (datos) => {
        console.log(datos)
        setDatosFiltro(datos);
    }

    const departamentos = [];

    for (var i = 0; i < unidades.id?.length; i++) {
        departamentos[i] = { Id: unidades.id[i], Departamento: unidades.Unidades[i] }
    }

    return <FiltrosNotas departamentos={departamentos} turnos={turnos} filtrarDatos={filtrarDatos} semanas={semanas} />
    /* return <FiltrosGrafico departamentos={unidad} turnos={turnos} filtrarDatos={filtrarDatos} semanas={semanas} /> */
}



/* --------------------------------------------------------------------------------------------------- */
const { RangePicker } = DatePicker;
const FiltrosNotas = ({ departamentos, turnos, filtrarDatos, semanas }) => {

    /* Capturamos el ID del Departamento */

    const [valueDep, setValueDep] = useState([]);
    const handleDepartamento = (e) => {
        const optionDep = e.target.value;
        if (optionDep !== undefined && optionDep !== 0) {
            console.log(optionDep);
            setValueDep(optionDep);
        }
        else {
            alert("Departamento no seleccionado");
        }
    }

    /* Capturamos el ID del Turno */

    const [valueTurno, setValueTurno] = useState("");

    const handleTurno = (e) => {
        const optionTurno = e.target.value;
        setValueTurno(optionTurno);
    }

    /* SEMANAS */
    const [valueSemana, setValueSemana] = useState(1);

    const handleSemana = (e) => {
        e.preventDefault();
        const optionSemana = e.target.value;
        setValueSemana(optionSemana);
    }
    /* MES */

    const [mes, setMes] = useState();

    useEffect(() => {
        const fechaActualMes = new Date();
        const formatoMes = fechaActualMes.getMonth();
        setMes(formatoMes);
    }, [])

    const ingresarMes = (date) => {
        const valorMes = new Date(date);
        const formatoValorMes = valorMes.getMonth() + 1;
        setMes(formatoValorMes);
    }


    /* AÑO */

    const [año, setAño] = useState();

    useEffect(() => {
        const fechaActual = new Date();
        const formatoAño = fechaActual.getFullYear();
        setAño(formatoAño);
    }, [])

    const ingresarAño = (date) => {
        const valorAño = new Date(date);
        const formatoValorAño = valorAño.getFullYear();
        setAño(formatoValorAño);
    }

    /* ENVIAR DATOS  */
    const datosFiltro = () => {
        const dataFiltro = {
            departamento: valueDep,
            turno: valueTurno,
            año: año,
            mes,
            semana: valueSemana,
            tipoFecha: idCategoria,
            selectDate: null
        }
        filtrarDatos(dataFiltro);
    }

    /* LISTA DE FECHAS */

    const categoriaFecha = [
        {
            "valor": "Semanas",
            /*  fecha:<RangePicker
                   format={format}
                   onChange={ingresarRango}
                   placeholder={["Inicio", "Fin"]}
                 /> */
            fecha: <Select className="input" onClick={handleSemana} defaultValue="">
                {
                    semanas.map((resultado, i) => {
                        return (
                            <MenuItem key={i} value={resultado.Id}>{resultado.Semana}</MenuItem>
                        )
                    })
                }
            </Select>
        },
        {
            "valor": "Mes",

            fecha: <DatePicker
                picker="month"
                value={moment(mes, 'MM-YYYY')}
                onChange={(date) => ingresarMes(date)}
            />
        },
        {
            "valor": "Año",

            fecha: <DatePicker
                picker="year"
                value={moment(año, 'YYYY')}
                onChange={(date) => ingresarAño(date)}
            />
        }

    ]

    const [idCategoria, setIdCategoria] = useState(-1);

    const handlerCategoria = (e) => {
        e.preventDefault();
        const option = e.target.value;
        setIdCategoria(option);
        e.stopPropagation();
    }

    function responseDate(typedate) {
        if (typedate == 0) {
            return (
                {
                    week: valueSemana,
                    month: mes,
                    year: año
                }
            )
        } else if (typedate == 1) {
            return (
                {
                    month: mes,
                    year: año
                }
            )
        } else if (typedate == 2) {
            return (
                { year: año }
            )
        }
    }

    function fecha(category) {
        if (idCategoria == 0) {
            return (
                <div className="option" id="fechaInput">
                    <div className="space">
                        {categoriaFecha[0].fecha}
                    </div>
                    <div className="space">
                        {categoriaFecha[1].fecha}
                    </div>
                    <div>
                        {categoriaFecha[2].fecha}
                    </div>
                </div>
            )
        } else if (idCategoria == 1) {
            return (
                <div className="option">
                    <div className="space">
                        {categoriaFecha[1].fecha}
                    </div>
                    <div>
                        {categoriaFecha[2].fecha}
                    </div>
                </div>
            )
        } else if (idCategoria == 2) {
            return (
                <div className="height">
                    {categoriaFecha[2].fecha}
                </div>
            )
        }

    }
    return (

        <main className="main">

            <div className="container-filtro">

                <div className="containerSelect">
                    <FormControl className="input">
                        <InputLabel>Departamento</InputLabel>
                        <Select onClick={handleDepartamento} defaultValue="" >
                            {departamentos.map((rest, i) => {
                                return (

                                    <MenuItem key={i} value={rest.Id} >{rest.Departamento}</MenuItem>
                                )
                            })}

                        </Select>
                    </FormControl>
                </div>

                <div className="containerSelect">
                    <FormControl className="input">
                        <InputLabel>Turno</InputLabel>
                        <Select onClick={handleTurno} defaultValue="">
                            {turnos.map((rest, i) => {
                                return (
                                    <MenuItem key={i} value={rest.Id} >{rest.Turno}</MenuItem>
                                )
                            })}
                        </Select>

                    </FormControl>
                </div>

                <div className="containerSelect">
                    <FormControl className="input">
                        <InputLabel>Tipo de Fecha</InputLabel>
                        <Select >
                            <opcion onClick={handlerCategoria} defaultValue="">
                                {categoriaFecha.map((valores, index) => {
                                    return (
                                        <MenuItem key={index} value={index}>{valores.valor}</MenuItem>
                                    )
                                })}
                            </opcion>
                        </Select>
                    </FormControl>
                </div>

                <div className="containerSelect">
                    {
                        /* idCategoria > -1 && (categoriaFecha[idCategoria].fecha) */
                        idCategoria > -1 && (fecha(idCategoria))
                    }
                </div>

                <div className="containerSelectBoton">
                    <div className="">
                        <button onClick={() => datosFiltro()} className="textBoton containerBoton">FILTRAR</button>
                    </div>
                </div>

            </div>
        </main>

    )
}

export default ReportePracticantesInducidos;