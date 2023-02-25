import axios from "axios";
import { getToken } from '../../../../dist/Token';

export const getPeticionPerfilesApiPersona = async (
    setState,
    setLoading
    ) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/clima/evaIntegracion/unidad`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((Response) => {
        setState(Response.data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
};
