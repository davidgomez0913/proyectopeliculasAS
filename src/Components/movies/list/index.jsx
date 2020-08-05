import React from 'react'
import { Component } from 'react'
import { getMovies } from '../../../services/index'
import moment from 'moment'
import './index.sass'
import { Link } from 'react-router-dom'
import {cargando} from '../../../consts/index'

export default class MovieList extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            isReady: false,
            hasError: false,
            error: null,
        }
    }
    componentDidMount = async () => {
        const movies = await getMovies();
        if (!movies.hasError) {
            this.setState({
                //movies:movies, //Como son el mismo nombre se puede dejar en uno solo y JS sobre entiende que la llave y la variable se llaman igual
                movies,
                isReady: true,
            })
        } else {
            this.setState({
                hasError: true,
                error: movies.error,
            })
        }
    }

    render() {
        const {
            movies,
            isReady,
            hasError,
            error,
        } = this.state  //deconstruccion de las variables
        return (
            <>
                {
                    isReady ? 
                        <ListComponent movies={movies} />
                        :
                        hasError ?
                            <ErrorComponent error={error}/>
                        : 
                        <LoadingComponent/>
                }
            </>
        );
    }
};

const ListComponent=(props) => (
    <>
        {
            props.movies.length>0 ?
                props.movies.map((movie) => {
                    return (
                        <Link className="link-movie-detail" to={`/peliculas/${movie._id}`}>
                            <MovieCard movie={movie}/>
                        </Link>
                    )
                })
            : <p>No hay ninguna pelicula registrada :/</p>
        }
    </>
)

const MovieCard=({movie}) => (  //Deconstruccion implicita
    <>
        <div className="movie-card-container">
            <div className="movie-card-info">
                <div className="movie-card-basic-info">
                    <p className="movie-card-title"> {movie.title} </p>
                    <p className="movie-card-desc"> {movie.description} </p>
                </div>
                <div className="movie-card-details">
                    <p>
                        Costo de la entrada: <span> {movie.ticketPrice} </span>
                    </p>
                    <p>
                        Duracion: <span>{movie.duration} (min)</span>
                    </p>
                    <p>
                        Disponible en cines: <span> {movie.isOnCinemas ? 'SI' : 'NO'} </span>
                    </p>
                </div>
            </div>
            <div className="movie-card-schedules-container">
                <p className="text-schedules">Horarios disponibles:</p>
                <div className="movie-card-schedules">
                    {
                        movie.schedules.length > 0 ?
                            movie.schedules.map((schedule) => {
                                return(
                                    <p>{moment(schedule.time).format('HH:mm')}</p>
                                )
                            })
                        : <p>No hay horarios disponibles</p>
                    }
                </div>
            </div>
        </div>
    </>
)

const ErrorComponent=({error}) => (
    <>
        <p>UPS! Algo fallo al traer las peliculas</p>
        <p> {error} </p>
    </>
)

const LoadingComponent=() => (
    <>
        <div className="loading-container">
            <p>Cargando...</p>
            <img src={cargando} alt="Cargando"/>
        </div>
    </>
)
