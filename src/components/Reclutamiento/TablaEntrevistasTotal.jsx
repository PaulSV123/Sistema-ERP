
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
// import { Modal, TextField, Button,Select,MenuItem } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { 
    getPeticionAreasFiltro,getPeticionPerfilesFiltro, //filtros
    getPeticionListarEntrevistas,
 } from '../../dist/getPeticiones';

const TablaEntrevistasTotal = () => {

    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [perfilesFiltro, setPerfilesFiltro] = useState([]);  
    const [areasFiltro, setAreasFiltro] = useState([]);

    const filtroTurno={'Mañana':'Mañana','Mañana y tarde':'Mañana y tarde','Tarde':'Tarde'};
    const resultadoFiltro={'Desaprobado':'Desaprobado','Aprobado':'Aprobado'};
    

    useEffect(() => {               
        getPeticionListarEntrevistas(setData,setLoading);
        getPeticionPerfilesFiltro(setPerfilesFiltro,setLoading);
        getPeticionAreasFiltro(setAreasFiltro, setLoading);
    }, [])

    return (
        <div className='container mx-auto'>
                       
            <div className='mt-3'>
                <h1 className="text-center text-lg font-semibold col-span-2  text-black">
                    Tabla Lista Entrevistas
                </h1> 
                <MaterialTable
                    columns={[
                        {title: 'FECHA DE ENTREVISTA',field: 'Fecha de Entrevista',filtering: false,},
                        {title: 'TURNO',field: 'Turno',lookup:filtroTurno},
                        {title: 'NOMBRES Y APELLIDOS',field: 'Nombres y Apellidos',filtering: false,},
                        {title: 'EDAD',field: 'Edad',filtering: false,},
                        {title: 'CELULAR',field: 'Celular',filtering: false,},
                        {title: 'AREA',field: 'Area',lookup: areasFiltro},
                        {title: 'PERFIL',field: 'Perfil',lookup: perfilesFiltro},
                        {title: 'ASISTENCIA',field: 'Asistencia',filtering: false},
                        {title: 'OBSERVACION',field: 'Observacion',filtering: false},
                        {title: 'RESULTADO',field: 'Resultado de Entrevista',lookup:resultadoFiltro}
                        
                    ]}

                    data={data}

                    onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}

                    options={{
                        filtering: true,
                        headerStyle: {
                        backgroundColor: '#E2E2E2  ',
                        },
                        rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                        }),
                        searchFieldAlignment: 'left',
                        showTitle: false,
                        exportButton: false,
                        actionsColumnIndex: -1,
                        
                    }}

                    localization={{
                        body: {
                        emptyDataSourceMessage: "No hay registro para mostrar",
                        addTooltip: 'Agregar',
                        deleteTooltip: 'Eliminar',
                        editTooltip: 'Editar',
                        filterRow: {
                            filterTooltip: 'Filtrar'
                        },
                        },
                        pagination: {
                            labelDisplayedRows: '{from}-{to} de {count}',
                            labelRowsSelect: 'filas',
                            labelRowsPerPage: 'filas por pagina:',
                            firstAriaLabel: 'Primera pagina',
                            firstTooltip: 'Primera pagina',
                            previousAriaLabel: 'Pagina anterior',
                            previousTooltip: 'Pagina anterior',
                            nextAriaLabel: 'Pagina siguiente',
                            nextTooltip: 'Pagina siguiente',
                            lastAriaLabel: 'Ultima pagina',
                            lastTooltip: 'Ultima pagina'
                        },
                        toolbar: {
                            nRowsSelected: '{0} ligne(s) sélectionée(s)',
                            showColumnsTitle: 'Ver columnas',
                            showColumnsAriaLabel: 'Ver columnas',
                            exportTitle: 'Exportar',
                            exportAriaLabel: 'Exportar',
                            exportCSVName: "Exportar en formato CSV",
                            exportPDFName: "Exportar como PDF",
                            searchTooltip: 'Buscar',
                            searchPlaceholder: 'Buscar'
                        },
                        header: {
                            actions: 'ACCIONES',
                            
                        }
                    }}
                    />
            </div>
        </div>
    )
}

export default TablaEntrevistasTotal
