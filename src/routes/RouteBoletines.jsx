import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import BoletinesCarpeta from '../components/Boletines/BoletinesCarpeta'
import ListaCarpetas from '../components/Boletines/ListaCarpetas'
import { UserContext } from '../components/context/UserContext'
import Page404 from '../components/Page404'

const RouteBoletines = () => {
  const { permisosUser } = useContext(UserContext);
  return (
    <Switch>
      <Route path="/boletines" exact component={permisosUser.includes('relacionespublicas_boletines') ? ListaCarpetas : Page404} />
      <Route path="/boletines/carpeta/:nomCarpeta" exact component={permisosUser.includes('relacionespublicas_boletines') ? BoletinesCarpeta : Page404} />
    </Switch>
  )
}

export default RouteBoletines