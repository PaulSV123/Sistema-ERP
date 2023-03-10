import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: '21rem',
      backgroundColor: theme.palette.background.paper,
      // }border: '2px solid #000',
      borderRadius: '0.3rem',
      boxshadow: theme.shadows[5],
      padding: theme.spacing(2, 3, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    modalAgregar: {
      position: 'absolute',
      overflow: 'scroll',
      overflowX: 'hidden',
      [theme.breakpoints.between('xs', 'sm')]: {
        width: '45%',
        height: '65%',
      },
      [theme.breakpoints.up('md')]: {
        width: '45%',
        height: '65%',
      },
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxshadow: theme.shadows[5],
      padding: theme.spacing(3, 4, 5),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    modal1: {
      position: 'absolute',
      width: '23rem',
      height: '10rem',
      backgroundColor: theme.palette.background.paper,
      boxshadow: theme.shadows[5],
      padding: theme.spacing(3, 4, 5),
      top: '50%',
      left: '45%',
      transform: 'translate(-50%, -50%)',
    },
    modal2: {
      position: 'absolute',
      [theme.breakpoints.between('xs', 'sm')]: {
        width: '80%',
        height: '50%',
      },
      [theme.breakpoints.up('md')]: {
        width: '80%',
        height: '50%',
      },
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxshadow: theme.shadows[5],
      padding: theme.spacing(3, 4, 5),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      overflow: 'scroll',
      overflowX: 'hidden',
    },
    inputlarge: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '12rem',
  
      [theme.breakpoints.between('md')]: {
        width: '100%',
      },
    },
    button_aceptar: {
      padding: '5px  12px 5px  12px',
      width: '100%',
      color: 'black',
      backgroundColor: '#f09208',
      border: '1px solid black',
      borderRadius: '5%',
    },
    button_cancelar: {
      padding: '5px  12px 5px  12px',
      width: '100%',
      color: 'white',
      backgroundColor: '#383837',
      border: '1px solid black',
      borderRadius: '5%',
    },
    error: {
      backgroundColor: 'red',
      padding: '3px  4px 3px  4px',
      color: 'white',
      textAlign: 'center',
      borderRadius: '5px',
      marginBottom: '0.5rem',
      fontSize: '1rem',
    },
    texto: {
      flex: '1 1 0%',
      fontWeight: '600',
      color: '#4B5563',
      fontSize: '1rem',
      fontFamily: 'Inter, sans-serif',
    },
  }));
  
  export default useStyles;