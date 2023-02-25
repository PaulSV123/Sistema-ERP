import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import  TablaCumpleañosColaboradores from './CumpleañosColaboradores';


describe('Pruebas  en CumpleañosColaboradores',()=>{

    test('Debe mostrar nombre de columnas',()=>{
        render(<TablaCumpleañosColaboradores/>);

        expect(screen.getByText('COLABORADORES')).toBeTruthy();
        expect(screen.getByText('DEPARTAMENTO')).toBeTruthy();
    });

    test('Debe iniciar con el buscador vacio', ()=>{   
        render(<TablaCumpleañosColaboradores/>);

        const search = screen.getByPlaceholderText('Buscar');
        expect(search.value).toContain('');

    })

    test('Debe renderizar las props', ()=>{
        const props = {
            columns: [],
            data: [],
           
        }

        const { getAllByText } = render(<TablaCumpleañosColaboradores {...props}/>);
        const columna = getAllByText(props.columns);
        expect(columna).toBeDefined();      
    })

});