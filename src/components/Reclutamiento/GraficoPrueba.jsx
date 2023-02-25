
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { Modal, TextField, Button,Select,MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const dataRequerimientosEntrevistado = [

    {
        SUBAREA:'BACKEND',
        CANTIDAD: '3',
        FECHA: '6/11/2021'
        
        
        
    },
    {
        SUBAREA:'BACKEND',
        CANTIDAD: '2',
        FECHA: '7/11/2021'
        
        
    },
    {
        SUBAREA:'BACKEND',
        CANTIDAD: '3',
        FECHA: '8/11/2021'
        
        
    },
    {
        SUBAREA:'BACKEND',
        CANTIDAD: '2',
        FECHA: '9/11/2021'
        
        
    },


    
]

const TablaEntrevistado = () => {

    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState([])

    useEffect(() => {
        setData(dataRequerimientosEntrevistado)      
    }, [])

    return (
        <div className='container mx-auto'>
            <div className='mt-5'>

                <MaterialTable
                    columns={[
                        {title: 'SUB AREA',field: 'SUBAREA'},
                        {title: 'CANTIDAD',field: 'CANTIDAD'},
                        {title: 'FECHA',field: 'FECHA'}
                        
                    ]}

                    data={data}
                    

                    onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}

                    options={{
                        headerStyle: {
                        backgroundColor: '#E2E2E2  ',
                        },
                        rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                        }),
                        searchFieldAlignment: 'left',
                        showTitle: false,
                        exportButton: false,
                        search: false,
                        actionsColumnIndex: -1  
                    }}
                   
                    
                    />
            </div>
        </div>
    )
}

export default TablaEntrevistado
