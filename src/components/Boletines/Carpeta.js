import React, { useState } from "react";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  makeStyles,
  Menu,
  MenuItem,
  Modal,
  TextField,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import MoreVertIcon from "@material-ui/icons/MoreVert";


const Carpeta = ({ carp, history,setDeleteCarp,handleOpenModalCarpetaUpdate }) => {
  const [openMenuCarpeta, setOpenMenuCarpeta] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleDeleteCarpeta = ()=>{
    //console.log(carp.Id_Año);
    setAnchorEl(null);
    setDeleteCarp({idcarp:carp.Id_Año,openModal:true});
  }
  const handleUpdateCarpeta = ()=>{
    setAnchorEl(null);
    handleOpenModalCarpetaUpdate(carp);
  }


  return (
    <div>
      <ListItem
        key={carp.Id_Año}
        //onClick={() => history.push(`boletines/carpeta/${carp.Año}`)}
        className="cursor-pointer duration-200 bg-white rounded shadow hover:shadow-2xl"
      >
        <ListItemIcon onClick={() => history.push(`boletines/carpeta/${carp.Año}`)} >
          <FolderIcon />
        </ListItemIcon>
        <div className="flex justify-between w-full">
        
        <span className=" w-full font-medium py-2" onClick={() => history.push(`boletines/carpeta/${carp.Año}`)} >{carp.Año.replace("_", " ")}</span>
      
          <div className="flex items-center">
            <IconButton className="p-1" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
      </ListItem>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="w-32 mt-12 "
      >
        <MenuItem onClick={handleUpdateCarpeta}>Editar</MenuItem>
        <MenuItem onClick={handleDeleteCarpeta}>Eliminar</MenuItem>
      </Menu>
    </div>
  );
};

export default Carpeta;
