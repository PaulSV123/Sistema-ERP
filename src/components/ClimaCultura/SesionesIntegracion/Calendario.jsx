import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import CreateModal from './Modals/CreateModal'
import timeGridPlugin from '@fullcalendar/timegrid'
import { getPeticionSesionesIntegracion, getPeticionSesionesIntegracionDepartamento, getPeticionSesionesIntegracionEncargado, getPeticionSesionesIntegracionTipo, getPeticionSesionesIntegracionTurno } from '../../../dist/ClimaCultura/getPeticiones'
import { putPeticionActualizarSesionIntegracion } from '../../../dist/ClimaCultura/putPeticiones'

export const Calendario = () => {

  const [modal, setModal] = useState(false);
  const [dateModal, setDateModal] = useState("");
  const [eventos, setEventos] = useState([]);
  const [datosSelects, setDatosSelects] = useState({
    ses_integra_tipo: [],
    ses_integra_encargado: [],
    ses_integra_departamento: [],
    ses_integra_area: [],
    ses_integra_turno: []
  })

  const handleModal = ( date ) => { 
    setDateModal(date)
    setModal(!modal)
  }

  const handleActualizarCalendario = () => {
    getPeticionSesionesIntegracion()
      .then( sesiones => setEventos([...sesiones]))
  }

  useEffect(() => {
    Promise.all([
      getPeticionSesionesIntegracion(),
      getPeticionSesionesIntegracionTipo(),
      getPeticionSesionesIntegracionEncargado(),
      getPeticionSesionesIntegracionDepartamento(),
      getPeticionSesionesIntegracionTurno()
    ])
      .then( values => {
        const [sesiones, tipos, encargados, departamentos, turno] = values;

        setDatosSelects({
          ses_integra_tipo: tipos,
          ses_integra_encargado: encargados,
          ses_integra_departamento: departamentos,
          ses_integra_turno: turno
        })
        setEventos(sesiones)
      })
  },[])


  const handleActualizarEvento = (startStr, endStr, evento, title) => {
    let start = formatFechaDrop(startStr)
    let end = formatFechaDrop(endStr)

    const nuevoEvento = {
        "id":evento.Id,
        "title":title,
        "ses_integra_enlace":evento.Meet,
        "start":start,
        "end":end,
        "ses_integra_tipo":evento.Id_Tipo,
        "ses_integra_encargado":evento.Id_encargado,
        "ses_integra_departamento":evento.Id_departamento,
        "ses_integra_area":evento.Id_area,
        "ses_integra_turno":evento.Id_turno
    }

    // console.log(nuevoEvento)
    putPeticionActualizarSesionIntegracion(evento.Id,nuevoEvento)
  }

  const formatFechaDrop = (fecha) => {
    let nuevaFecha = fecha.replace('T', ' ')
    nuevaFecha = nuevaFecha.replace('Z', ' ')
    return nuevaFecha.slice(0, 19)
  }

  return (
    <>
      <div className="main mt-3 relative h-full w-full">
        <h3 className="text-xl font-bold ml-4 mb-2 xs:text-center md:text-left">Notas de las sesiones de Integración</h3>
        <div style={{ padding: '2rem 4rem' }}>

          <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            buttonText={{
              today:  'Hoy',
              month: "Mes",
              week: "Semana",
              day: "Día"
            }}
            dateClick={ ({ date }) =>  handleModal(date.toLocaleDateString('fr-CA'))}
            height= "auto"
            // windowResize = {true}
            // handleWindowResize = {true}
            locale= "esLocale"
            
            events = {eventos}
            editable = {true}
            eventDrop = {({ event }) => {
              const { startStr, endStr, extendedProps, _def } = event
              handleActualizarEvento(startStr,endStr, extendedProps, _def.title)
            }}
          />
          {
            modal 
              ? 
              <CreateModal
                isOpen={modal}
                close={handleModal}
                dateModal={dateModal}
                datosSelects={datosSelects}
                actualizarCalendario={ handleActualizarCalendario }
              />
              : <></>
          }
        </div>
      </div>
    </>
  )
}
