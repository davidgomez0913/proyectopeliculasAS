import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from '../Components/homePage/index'
import { MovieList, MovieDetail, MovieForm } from '../Components/movies/index'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/peliculas/crear" component={MovieForm} />
            <Route exact path="/peliculas/editar/:movieId" component={MovieForm} />
            <Route exact path="/peliculas" component={MovieList} />
            <Route exact path="/peliculas/:movieId" component={MovieDetail} />
            <Route render={() => <p>Pagina no encontrada</p>} />
            <Redirect to="/" />
        </Switch>
    )
}

export default Routes