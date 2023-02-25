import { IconButton, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import MoreVertIcon from "@material-ui/icons/MoreVert";

const SubmenuFile = ({file,setModalMovera}) => {
    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleDeleteCarpeta = ()=>{
   console.log('mover')
  }
  const handleUpdateCarpeta = ()=>{
    console.log('ver')
  }

  return (
    <div>
        <IconButton onClick={handleClick} >
            <MoreVertIcon/>
        </IconButton>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="w-32 mt-8 p-0"
      >
        <a href={file.Link_Boletin} target='_blank' rel='noreferrer' className='text-black'><MenuItem ><span className='text-sm'>Ver</span></MenuItem></a>
        <a className='text-black text-sm' href={file.Link_Boletin} download><MenuItem><span className='text-sm'>Descargar</span></MenuItem></a>
        <MenuItem onClick={()=>{handleClose();setModalMovera({idArchivo:file.Id_Boletin,open:true});}} ><span className='text-sm'>Mover a</span></MenuItem>
      </Menu>
    </div>
  )
}

export default SubmenuFile