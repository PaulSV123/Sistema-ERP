import React from 'react'
import { Redirect } from 'react-router';
import { distGetAutentication } from '../dist/Autentication';

const RoutePublic = ({children}) => {
    const autentication = distGetAutentication()
    return autentication ? <Redirect to="/*"/> : children
};

export default RoutePublic;
