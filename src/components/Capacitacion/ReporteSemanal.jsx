import React, { useEffect, useState, forwardRef } from "react";
import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import PickersDay from "@mui/lab/PickersDay";
import endOfWeek from "date-fns/endOfWeek";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfWeek from "date-fns/startOfWeek";
import { orange } from "@mui/material/colors";
import Button from "@mui/material/Button";
import DatePicker from "@mui/lab/DatePicker";
import Stack from "@mui/material/Stack";
import MaterialTable from "material-table";
import Spinner from "../Spinner/Spinner";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";

import {
  Modal,
  TextField,
  TextareaAutosize,
  MenuItem,
  Select,
  FormControl,
  Box,
  InputLabel,
} from "@material-ui/core";
import {
  getPeticionAreasFiltro,
  getPeticionDepartamentoFiltro,
  getPeticionPerfilesFiltro,
} from "../../dist/getPeticiones";
import {
  getPeticionCapacitacionesCulminadas,
  getPeticionPracticante,
} from "../../dist/Capacitacion/getPeticiones";
import { Doughnut, Bar, Line} from "react-chartjs-2";
import { 
  postListCapacitadosSemana, 
  postListCapacitadosMes,
  postListCapacitadosAnio,
  postListCapacitadosDia,
  postListCapacitadosRango,  
} from "../../dist/Capacitacion/postPeticiones";

const useStyles = makeStyles({});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[200]),
  backgroundColor: orange[400],
  "&:hover": {
    backgroundColor: orange[700],
  },
}));

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export const ReporteSemanal = () => {
  const [reporteTotal, setResporteTotal] = useState({});
  const [age, setAge] = React.useState("");
  const [idFilter, setIdFilter] = useState();
  const [idMes, setidMes] = useState();
  const [idYear, setIdYear] = useState();
  const classes = useRowStyles();
  const [value, setValue] = React.useState(new Date());
  //console.log(value)
 
  //console.log(JSON.stringify(value).slice(6, 8))
  const [valueRange, setValueRange] = React.useState([null, null]);
  //console.log(JSON.stringify(valueRange).slice(2,12))
  //console.log(JSON.stringify(valueRange).slice(29,39))
  const [valueM, setValueM] = React.useState(new Date());
  //console.log(JSON.stringify(valueM).slice(1,8))
  const [valueY, setValueY] = React.useState(new Date());
  //console.log(JSON.stringify(valueY).slice(1, 5))
  const [valueD, setValueD] = React.useState(new Date());
  //console.log(valueD)
  //console.log(JSON.stringify(valueY).slice(1, 11))
  const [openTabla, setOpenTabla] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [fechaSemanal, setFechaSemanal] = useState("");
  const [reporteSemana, setReporteSemana] = useState([]);
  const [reporteMes, setReporteMes] = useState([]);
  const [reporteAnio, setReporteAnio] = useState([]);
  const [reporteDia, setReporteDia] = useState([]);
  const [reporteRango, setReporteRango] = useState([]);
  const [UsuariosCulminados, setUsuariosCulminados] = useState("");
  const [UsuariosRetirados, setUsuariosRetirados] = useState("");

  const datosdb = [reporteTotal.PracticantesCulminados,reporteTotal.PracticantesRetirados];

  const handleChange = function (event) {
    setAge(event.target.value);
  };

  const handleChange2 = function (e) {
    const opcion = e.target.value;
    console.log(opcion);
    setIdFilter(opcion);
  };

  const handleChange3 = function (event) {
    setidMes(event.target.value);
  };

  const handleChangeWeek = (newValue) => {
    setValue(newValue);
  };

  const handleOpenTabla = () => {
    setOpenTabla(true);
  };

  useEffect(() => {
    getPeticionCapacitacionesCulminadas(setResporteTotal, setLoading);
  }, []);
  const datosReporte = [
    1,2,3
  ];
  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = startOfWeek(value);
    const end = endOfWeek(value);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);
    console.log(isFirstDay);
    console.log(isLastDay);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  const bodyTablaSemana = (
    <Box margin={4}>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Perfil</b>{" "}
            </TableCell>
            <TableCell>
              <b>Nombres</b>
            </TableCell>
            <TableCell align="right">
              <b>Apellidos</b>
            </TableCell>
            <TableCell align="right">
              <b>Dias</b>
            </TableCell>
            {/* <TableCell>
              <b>Promedio</b>
            </TableCell>
            <TableCell align="right">
              <b>Condicion</b>
            </TableCell> */}
            <TableCell align="right">
              <b>Fecha Inicio</b>
            </TableCell>
            <TableCell>
              <b>Fecha Fin</b>
            </TableCell>
            <TableCell>
              <b>Estado</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reporteSemana.map((n,index) => {
            return (
                <TableRow key={index}>
                  <TableCell>
                    <h1>{n.Perfil}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Nombre}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Apellido}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Dias}</h1>
                  </TableCell>
                  {/* <TableCell>
                    <h1>{n.Promedio}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Condicion}</h1>
                  </TableCell> */}
                  <TableCell>
                    <h1>{n.Fecha_Inicio}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Fecha_Termino}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Estado}</h1>
                  </TableCell>
                </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );

  const bodyTablaMes = (
    <Box margin={4}>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Perfil</b>{" "}
            </TableCell>
            <TableCell>
              <b>Nombres</b>
            </TableCell>
            <TableCell align="right">
              <b>Apellidos</b>
            </TableCell>
            <TableCell align="right">
              <b>Dias</b>
            </TableCell>
            {/* <TableCell>
              <b>Promedio</b>
            </TableCell>
            <TableCell align="right">
              <b>Condicion</b>
            </TableCell> */}
            <TableCell align="right">
              <b>Fecha Inicio</b>
            </TableCell>
            <TableCell>
              <b>Fecha Fin</b>
            </TableCell>
            <TableCell>
              <b>sub estado</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reporteMes.map((n,index) => {
            return (
                <TableRow key={index}>
                  <TableCell>
                    <h1>{n.Perfil}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Nombre}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Apellido}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Dias}</h1>
                  </TableCell>
                  {/* <TableCell>
                    <h1>{n.Promedio}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Condicion}</h1>
                  </TableCell> */}
                  <TableCell>
                    <h1>{n.Fecha_Inicio}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Fecha_Termino}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Estado}</h1>
                  </TableCell>
                </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );

  const bodyTablaAnio = (
    <Box margin={4}>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Perfil</b>{" "}
            </TableCell>
            <TableCell>
              <b>Nombres</b>
            </TableCell>
            <TableCell align="right">
              <b>Apellidos</b>
            </TableCell>
            <TableCell align="right">
              <b>Dias</b>
            </TableCell>
            {/* <TableCell>
              <b>Promedio</b>
            </TableCell>
            <TableCell align="right">
              <b>Condicion</b>
            </TableCell> */}
            <TableCell align="right">
              <b>Fecha Inicio</b>
            </TableCell>
            <TableCell>
              <b>Fecha Fin</b>
            </TableCell>
            <TableCell>
              <b>Estado</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reporteAnio.map((n,index) => {
            return (
                <TableRow key={index}>
                  <TableCell>
                    <h1>{n.Perfil}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Nombre}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Apellido}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Dias}</h1>
                  </TableCell>
                  {/* <TableCell>
                    <h1>{n.Promedio}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Condicion}</h1>
                  </TableCell> */}
                  <TableCell>
                    <h1>{n.Fecha_Inicio}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Fecha_Termino}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Estado}</h1>
                  </TableCell>
                </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );

  const bodyTablaDia = (
    <Box margin={4}>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Perfil</b>{" "}
            </TableCell>
            <TableCell>
              <b>Nombres</b>
            </TableCell>
            <TableCell align="right">
              <b>Apellidos</b>
            </TableCell>
            <TableCell align="right">
              <b>Dias</b>
            </TableCell>
            {/* <TableCell>
              <b>Promedio</b>
            </TableCell>
            <TableCell align="right">
              <b>Condicion</b>
            </TableCell> */}
            <TableCell align="right">
              <b>Fecha Inicio</b>
            </TableCell>
            <TableCell>
              <b>Fecha Fin</b>
            </TableCell>
            <TableCell>
              <b>sub estado</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reporteDia.map((n,index) => {
            return (
                <TableRow key={index}>
                  <TableCell>
                    <h1>{n.Perfil}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Nombre}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Apellido}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Dias}</h1>
                  </TableCell>
                  {/* <TableCell>
                    <h1>{n.Promedio}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Condicion}</h1>
                  </TableCell> */}
                  <TableCell>
                    <h1>{n.Fecha_Inicio}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Fecha_Termino}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Estado}</h1>
                 </TableCell>
                </TableRow>
            );
         })}
        </TableBody>
      </Table>
      </Box>
  );

  const bodyTablaRango = (
    <Box margin={4}>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Perfil</b>{" "}
            </TableCell>
            <TableCell>
              <b>Nombres</b>
            </TableCell>
            <TableCell align="right">
              <b>Apellidos</b>
            </TableCell>
            <TableCell align="right">
              <b>Dias</b>
            </TableCell>
            {/* <TableCell>
              <b>Promedio</b>
            </TableCell>
            <TableCell align="right">
              <b>Condicion</b>
            </TableCell> */}
            <TableCell align="right">
              <b>Fecha Inicio</b>
            </TableCell>
            <TableCell>
              <b>Fecha Fin</b>
            </TableCell>
            <TableCell>
              <b>sub estado</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reporteRango.map((n,index) => {
            return (
                <TableRow key={index}>
                  <TableCell>
                    <h1>{n.Perfil}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Nombre}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Apellido}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Dias}</h1>
                  </TableCell>
                  {/* <TableCell>
                    <h1>{n.Promedio}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Condicion}</h1>
                  </TableCell> */}
                  <TableCell>
                    <h1>{n.Fecha_Inicio}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Fecha_Termino}</h1>
                  </TableCell>
                  <TableCell>
                    <h1>{n.Estado}</h1>
                  </TableCell>
                </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );

  return (
    <div className="container mx-auto">
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">
          REPORTE GENERAL
        </h3>
      </div>

      <div className="mt-0 sm:mt-5">
          <Doughnut
            data={{
              labels: ["Culminado", "Retirado"],
              datasets: [
                {
                  label: "# total",
                  data: datosdb,
                  backgroundColor: ["#0996F3", "#EF8711"],
                  borderColor: ["#0996F3", "#EF8711"],
                  borderWidth: 1,
                  hoverOffset: 7,
                  hoverBackgroundColor: ["#0996F3", "#EF8711"],
                },
              ],
            }}
              height={400}
              width={300}
              options={{
              indexAxis: 'y',
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  stacked: true,
                },
                x: {
                  stacked: true,
                },
              },
              interaction: {
                mode: 'index',
                intersect: true,
              },
            }}
          />
      </div>

      <br />

      <FormControl>
        <div className="row p-4">
          <div className="md-col-3">
            <InputLabel id="demo-simple-select-label">Filtro</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
              onClick={handleChange2}
              style={{ width: "240px" }}
            >
              <MenuItem value="">
                {/* <em>None</em> */}
              </MenuItem>
              {/* <MenuItem value={10}>Dia</MenuItem>
              <MenuItem value={20}>Semana</MenuItem>
              <MenuItem value={30}>Mes</MenuItem> */}
              <MenuItem value={40}>Año</MenuItem>
              {/* <MenuItem value={50}>Rango de Fechas</MenuItem> */}
            </Select>
          </div>
        </div>
        {idFilter == 10 && (
        <div className="row p-4">
          <div className="md-col-3">
            <Box>
              <form className={classes.container} noValidate>
                <Stack spacing={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Fecha :"
                      value={valueD}
                      inputFormat="yyyy-MM-dd"
                      onChange={(newValue) => {
                        setValueD(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <ColorButton variant="contained"
                          onClick={() => {
                            postListCapacitadosDia(
                              JSON.stringify(valueD).slice(1, 11),
                              setReporteDia
                            );
                          }}
                        >
                      <b> Filtrar </b>{" "}
                    </ColorButton>
                  </LocalizationProvider>
                </Stack>
              </form>
            </Box>
          </div>
            <div className="md-col-9">
              <Box open={openTabla}>
                {bodyTablaDia}
              </Box>
            </div>
        </div>
        )}{" "}
        {idFilter == 20 && (
          <>
            <div className="row p-4">
              <div className="md-col-3">
                <Box>
                  <form className={classes.container} noValidate>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <StaticDatePicker
                          displayStaticWrapperAs="desktop"
                          label="Week picker"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          // onChange={(e)=>setFechaSemanal(e.target.value)}
                          renderDay={renderWeekPickerDay}
                          renderInput={(params) => <TextField {...params} />}
                          inputFormat="'Week of' MMM d"
                        />
                        <ColorButton
                          variant="contained"
                          onClick={() => {
                            postListCapacitadosSemana(
                              JSON.stringify(value).slice(1, 11),
                              setReporteSemana
                            );
                          }}
                        >
                          <b> Filtrar </b>{" "}
                        </ColorButton>
                      </Stack>
                    </LocalizationProvider>
                  </form>
                </Box>
              </div>
              <div className="md-col-9">
                <Box open={openTabla}>
                  {/*openTabla ? {bodyTabla} : false*/}
                  {bodyTablaSemana}
                </Box>
              </div>
            </div>
          </>
        )}
        {idFilter == 30 && (
          <>
            <div className="row p-4">
              <div className="md-col-3">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    views={["year", "month"]}
                    label="Mes y Año"
                    minDate={new Date("2015-03-01")}
                    maxDate={new Date("2026-06-01")}
                    value={valueM}
                    onChange={(newValue) => {
                      setValueM(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                  />

                      <ColorButton
                          variant="contained"
                          onClick={() => {
                            postListCapacitadosMes(
                              JSON.stringify(valueM).slice(1, 11),
                              setReporteMes
                            );
                          }}
                        >
                          <b> Filtrar </b>{" "}
                      </ColorButton>

                </Stack>
              </LocalizationProvider>
              </div>
              <div className="md-col-9">
                <Box open={openTabla}>
                  {bodyTablaMes}
                </Box>
              </div>
            </div>
          </>
        )}
        {idFilter == 40 && (
          <>
            <div className="row p-4">
              <div className="md-col-3">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DatePicker
                      views={["year"]}
                      label="Año: "
                      value={valueY}
                      onChange={(newValue) => {
                        setValueY(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} helperText={null} />
                      )}
                    />
                    <ColorButton
                      variant="contained"
                      onClick={() => {
                        postListCapacitadosAnio(
                          JSON.stringify(valueY).slice(1, 5),
                          setReporteAnio
                        );
                      }}
                    >
                      <b> Filtrar </b>{" "}
                    </ColorButton>
                  </Stack>
                </LocalizationProvider>
              </div>
              <div className="md-col-9">
                <Box open={openTabla}>
                  {bodyTablaAnio}
                </Box>
              </div>
            </div>
          </>
        )}
        {idFilter == 50 && (
          <>
            <div className="row p-4">
              <div className="md-col-3">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DateRangePicker
                      startText="Inicio"
                      endText="Fin"
                      value={valueRange}
                      onChange={(newValue) => {
                        setValueRange(newValue);
                      }}
                      renderInput={(startProps, endProps) => (
                        <React.Fragment>
                          <TextField
                            {...startProps}
                            style={{ width: "90px" }}
                          />
                          <Box sx={{ mx: 1 }}> hasta </Box>
                          <TextField {...endProps} style={{ width: "90px" }} />
                        </React.Fragment>
                      )}
                    />
                    <ColorButton 
                    variant="contained" 
                    id="boton"
                    onClick={() => {
                      postListCapacitadosRango(
                        JSON.stringify(valueRange).slice(2,12),
                        JSON.stringify(valueRange).slice(29,39),
                        setReporteRango
                      );
                    }}
                    >
                      <b> Filtrar </b>{" "}
                    </ColorButton>
                  </Stack>
                </LocalizationProvider>
              </div>
              <div className="md-col-9">
                <Box open={openTabla}>
                  {/*openTabla ? {bodyTabla} : false*/}
                  {bodyTablaRango}
                </Box>
              </div>
            </div>
          </>
        )}
      </FormControl>
    </div>
  );
};
