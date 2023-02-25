import { Modal } from '@material-ui/core';
import { useState } from 'react';
import ModalConfirmacion from './ModalConfirmacion';
import ModalHabilidadBlanda from './ModalHabilidadBlanda';
import ModalHabilidadDura from './ModalHabilidadDura';
import ModalTipoHabilidad from './ModalTipoHabilidad';

const ModalCrearRecurso = ({
  openModal,
  closedModal,
  error,
  perfilLista,
  plataformaLista,
  actualizarTabla
}) => {
  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  // ESTADO DE LOS MODALS SECUNDARIOS
  const [modalAgregarHD, setModalAgregarHD] = useState(false);
  const [modalAgregarHB, setModalAgregarHB] = useState(false);

  const info = {
    perfiles: perfilLista,
    plataformas: plataformaLista,
    error: error,
    actualizarTabla: actualizarTabla
  };
  // CERRAR TODOS LOS MODALS
  const closedAll = () => {
    setModalAgregarHD(false);
    setModalAgregarHB(false);
    closedModal();
  };
  // FUNCIONES PARA ABRIR Y CERRAR MODALS
  const openModalConfirmacion = () => {
    setModalConfirmacion(true);
  };
  const closedModalConfirmacion = () => {
    setModalConfirmacion(false);
  };
  const openHD = () => {
    setModalAgregarHD(true);
  };
  const openHB = () => {
    setModalAgregarHB(true);
  };
  const closedHD = () => {
    setModalAgregarHD(false);
  };
  const closedHB = () => {
    setModalAgregarHB(false);
  };

  return (
    <>
      <Modal open={modalConfirmacion} onClose={closedModalConfirmacion}>
        <ModalConfirmacion />
      </Modal>


      {/* MODAL PRINCIPAL */}
      <Modal open={openModal} onClose={closedModal}>
        <ModalTipoHabilidad
          closedModal={closedModal}
          openHD={openHD}
          openHB={openHB}
        />
      </Modal>
      {/* MODALS SECUNDARIOS */}

      {/* MODAL HABILIDAD BLANDA */}
      <Modal open={modalAgregarHB} onClose={closedAll}>
        <ModalHabilidadBlanda
          closedModal={closedHB}
          closedAll={closedAll}
          openModalConfirmacion={openModalConfirmacion}
          info={info}
        />
      </Modal>
      {/* MODAL HABILIDAD DURA */}
      <Modal open={modalAgregarHD} onClose={closedAll}>
        <ModalHabilidadDura
          closedModal={closedHD}
          closedAll={closedAll}
          openModalConfirmacion={openModalConfirmacion}
          info={info}
        />
      </Modal>
    </>
  );
};

export default ModalCrearRecurso;
