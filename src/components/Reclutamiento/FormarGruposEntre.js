import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateTimePicker } from "@mui/lab";
import { useStepContext } from "@mui/material";
import MyModal from "../../partials/MyModal";
import { postGenerarGrupoEntrevista } from "../../dist/postPeticiones";
import { formatDateTime } from "../../helpers/fecha";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 280,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const validationsCrearGrupoEntre = (form) => {
  let errors = {};
  if (!form.idEncargado.toString().trim()) {
    errors.idEncargado = "Seleccione a un encargado del grupo";
  }
  if (form.fechaEntre === null) {
    errors.fechaEntre = "Seleccione una fecha de entrevista";
  } else if (new Date(form.fechaEntre) < new Date()) {
    errors.fechaEntre = "La fecha de entrevista debe ser mayor a la de hoy";
  }
  if (form.postulantes.length === 0) {
    errors.postulantes = "Debe escoger al menos un postulante";
  }
  return errors;
};

const FormarGruposEntre = ({
  left,
  setLeft,
  grupoEntre,
  setGrupoEntre,
  reclutadores,
  setResponse,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, grupoEntre.postulantes);
  const [errors, setErrors] = useState({});
  const [openModalErrors, setOpenModalErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    //setRight(grupoEntre.postulantes.concat(leftChecked));
    setGrupoEntre({
      ...grupoEntre,
      postulantes: grupoEntre.postulantes.concat(leftChecked),
    });
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    //setRight(not(grupoEntre.postulantes, rightChecked));
    setGrupoEntre({
      ...grupoEntre,
      postulantes: not(grupoEntre.postulantes, rightChecked),
    });
    setChecked(not(checked, rightChecked));
  };

  const handleSubmitCrearGrupoEntre = () => {
    let err = validationsCrearGrupoEntre(grupoEntre);
    setErrors(err);
    if (Object.keys(err).length !== 0) {
      setOpenModalErrors(true);
    } else {
      let bodyForm = {
        /* fecha: new Date(
          grupoEntre.fechaEntre.getTime() -
            grupoEntre.fechaEntre.getTimezoneOffset() * 60000
        ).toISOString(), */
        fecha:formatDateTime(new Date(grupoEntre.fechaEntre)),
        id_encargado: grupoEntre.idEncargado,
        postulantes: grupoEntre.postulantes.map((post) => post.idPost),
        link:grupoEntre.link,
      };
      //console.log(new Date(grupoEntre.fechaEntre).toLocaleString(),formatDateTime(new Date(grupoEntre.fechaEntre)))
      setLoading(true);
      postGenerarGrupoEntrevista(bodyForm, setResponse, setLoading);
      //console.log(bodyForm);
    }
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} seleccionados`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value.idPost}-label`;

          return (
            <ListItem
              key={value.idPost}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.descrip}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <div className="pt-4">
      <div className=" gap-6 grid grid-cols-1 sm:grid-cols-2 mt-4 mb-6">
        <div className="flex align-items justify-center">
          <FormControl className="w-64">
            <InputLabel id="area">Encargado *</InputLabel>
            <Select
              fullWidth
              className="flex-1"
              onChange={(newValue) => {
                setGrupoEntre({
                  ...grupoEntre,
                  idEncargado: newValue.target.value,
                });
              }}
              value={grupoEntre.idEncargado}
              label="Reclutadores"
              name="id_reclutadores"
              defaultMenuIsOpen={false}
              isSearchable={false}
            >
              {reclutadores.map((item) => (
                <MenuItem key={item.Emp_Id} value={item.Emp_Id}>
                  {item.Reclutador}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="text-center">
          <LocalizationProvider
            dateAdapter={AdapterDateFns} /* adapterLocale={} */
          >
            <DateTimePicker
              label="Fecha Entrevista *"
              value={grupoEntre.fechaEntre}
              //inputFormat="yyyy-MM-dd"
              onChange={(newValue) => {
                setGrupoEntre({
                  ...grupoEntre,
                  fechaEntre: newValue,
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="col-span-2 flex justify-center">
        <TextField
              size="small"
              name="link"
              className="w-[200px]"
              value={grupoEntre.link}
              onChange={(e)=>{
                setGrupoEntre({
                  ...grupoEntre,
                  [e.target.name]: e.target.value,
                });
              }}
              label="Enlace de la entrevista"
              //error={errors.apellidos ? true : false}
              //helperText={errors.apellidos && errors.apellidos}
            />
        </div>
      </div>
      <div className="mt-8">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item>{customList("Postulantes a Entrevistar", left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            {customList("Grupo Entrevista", grupoEntre.postulantes)}
          </Grid>
        </Grid>
      </div>
      <div className=" p-4 flex align-items justify-end">
        {loading ? (
          <CircularProgress />
        ) : (
          <button
            className="bg-yellow-400 px-4 py-2 rounded   border-1 border-gray-900 font-semibold text-black duration-300 hover:opacity-80"
            onClick={handleSubmitCrearGrupoEntre}
          >
            Crear Grupo de Entrevista
          </button>
        )}
      </div>
      <MyModal
        openModal={openModalErrors}
        onCloseModal={() => {
          setErrors({});
          setOpenModalErrors(false);
        }}
      >
        <div className="p-3 pb-0">
          <ul className="list-disc pb-0 text-red-500 font-medium">
            {errors.idEncargado && <li>{errors.idEncargado}</li>}
            {errors.fechaEntre && <li>{errors.fechaEntre}</li>}
            {errors.postulantes && <li>{errors.postulantes}</li>}
          </ul>

          <button
            onClick={() => {
              setErrors({});
              setOpenModalErrors(false);
            }}
            className="flex place-content-center bg-naranja hover:border-gray-700 border-2  p-2 w-auto mx-auto rounded-full"
            // className="bg-gray-700 text-gray-50 h-1/5 py-2 px-3 mx-2 hover:bg-naranja border"
          >
            <img
              src={"https://img.icons8.com/windows/32/undefined/error.png"}
              style={{ width: "1.5rem", height: "1.5rem" }}
              alt="error"
            />
          </button>
        </div>
      </MyModal>
    </div>
  );
};

export default FormarGruposEntre;
