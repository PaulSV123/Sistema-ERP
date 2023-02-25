import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useEffect, useState } from "react";
import { DatePicker, Menu } from "antd";
import { getPeticionAllDepartamentos, getPeticionAreasxDepartamento } from "../../../../dist/getPeticiones";
import moment from "moment";
import "./styles/styleFiltro.css";
import { GiConsoleController } from "react-icons/gi";

/* ------------------------------------------------------------------------------------------------- */


function ReportePracticantesInducidos({ setDatosFiltro }) {

    const [areas, setAreas] = useState([]);
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

    /* return <FiltrosGrafico departamentos={unidad} turnos={turnos} filtrarDatos={filtrarDatos} semanas={semanas} /> */
    return <FiltrosGrafico departamentos={departamentos} turnos={turnos} filtrarDatos={filtrarDatos} semanas={semanas} />
}

/* --------------------------------------------------------------------------------------------------- */
const { RangePicker } = DatePicker;
const FiltrosGrafico = ({ departamentos, turnos, filtrarDatos, semanas }) => {

    const [areaDep, setAreaDep] = useState([]);
    const [areasxDepa, setAreasxDepa] = useState([]);

    /* Capturamos el ID del Departamento */

    const [valueDep, setValueDep] = useState("");
    const handleDepartamento = (e) => {
        const optionDep = e.target.value;
        console.log(optionDep);
        setValueDep(optionDep);

        // if (optionDep !== undefined && optionDep !== null) {
        //     getPeticionAreasxDepartamento(setAreasxDepa, optionDep);
        //     console.log(areasxDepa?.data);
        //     const areasSelect = areasxDepa?.data
        //     // setAreaDep(areasSelect);
        //     // listarAreas(optionDep).then((rest) => { setAreaDep(rest) });
        // }

        if (optionDep !== 0) {
            getPeticionAreasxDepartamento(setAreasxDepa, optionDep);
            const areasSelect = areasxDepa?.data
            if (areasSelect !== undefined) {
                console.log(areasSelect);
                setAreaDep(areasSelect);
            }
            else {
                setAreasxDepa([]);
            }
            // listarAreas(optionDep).then((rest) => { setAreaDep(rest) });
        } else {
            alert("Departamento no seleccionado");
            setAreasxDepa([]);
        }
    }


    /* Capturamos el ID del Area */

    const [valueArea, setValueArea] = useState("");

    const handleArea = (e) => {
        const optionArea = e.target.value;
        setValueArea(optionArea);
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
            area: valueArea,
            turno: valueTurno,
            año,
            mes,
            semana: valueSemana,
            tipoFecha: idCategoria,
            selectDate: null
        }
        console.log("datos del filtro");
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
                // value={moment(mes, 'MM-YYYY')}
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
        const option = e.target.value;
        setIdCategoria(option);
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
                        <Select onChange={handleDepartamento} defaultValue="">
                            {departamentos.map((departamento, id) => {
                                return (

                                    <MenuItem key={id} value={departamento.Id} >{departamento.Departamento}</MenuItem>
                                )
                            })}

                        </Select>
                    </FormControl>
                </div>
                <div className="containerSelect">
                    <FormControl className="input">
                        <InputLabel>Área</InputLabel>
                        <Select onChange={handleArea} defaultValue="">
                            {areaDep.map((area, id) => {
                                return (
                                    <MenuItem key={id} value={area.Area_Id}>{area.Area_Nombre}</MenuItem>
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
                        <Select onClick={handlerCategoria} defaultValue="">
                            {categoriaFecha.map((valores, index) => {
                                return (
                                    <MenuItem key={index} value={index}>{valores.valor}</MenuItem>
                                )
                            })}
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
                    <div className="containerBoton2">
                        <button onClick={() => datosFiltro()} className="textBoton containerBoton">FILTRAR</button>
                    </div>
                </div>

            </div>
        </main>

    )
}

export default ReportePracticantesInducidos;