import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { putActualizarLinkEntre } from "../../../dist/putPeticiones";

const styleInputLink = {
  border: "none",
  borderBottom: "2px solid #9B9B9B",
  background: "transparent",
  padding: "1px 1px",
  minWidth: "300px",
  fontSize: ".9rem",
};

const TableLinkReuEntre = ({ data }) => {
  const [onEditLink, setOnEditLink] = useState(false);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLink(data.linkEntrevista);
  }, []);

  const handleCancelEdit = () => {
    setLink(data.linkEntrevista);
    setOnEditLink(false);
  };

  const handleEditLink = (e) => {
    e.preventDefault();
    //console.log(data.idGrupo,link);
    setLoading(true);
    putActualizarLinkEntre(
      data.idGrupo,
      { Grup_Link_Entrevista: link },
      setLink,
      setOnEditLink,
      setLoading
    );
  };

  const iconsEdit = (
    <div className="flex align-items">
      {loading ? (
        <CircularProgress size={20} />
      ) : (
        <>
          <IconButton type="submit" className="p-2">
            <CheckIcon fontSize="small" />
          </IconButton>
          <IconButton
            type="button"
            onClick={handleCancelEdit}
            className="p-2 ml-2"
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </div>
  );

  return (
    <form onSubmit={handleEditLink}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <b>LINK DE LA REUNIÓN:</b>
            </TableCell>
            <TableCell>
              {onEditLink ? (
                <input
                  type="url"
                  value={link}
                  required
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Link de la Reunion"
                  style={styleInputLink}
                />
              ) : (
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              )}
            </TableCell>
            <TableCell colSpan={2}>
              {data.estado == 19 && (
                <>
                  {onEditLink ? (
                    iconsEdit
                  ) : (
                    <IconButton
                      type="button"
                      onClick={() => setOnEditLink(true)}
                      className="p-1"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                </>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </form>
  );
};

export default TableLinkReuEntre;
