import React, { Component } from 'react'
import { getMovie, deleteMovie } from '../../../services/index'
import { cargando } from '../../../consts'
import './index.sass'
import { toast } from 'react-toastify'

export default class MovieDetail extends Component {
    constructor() {
        super()
        this.state = {
            movie: {},
            isReady: false,
            hasError: false,
            error: null,
        }
    }

    componentDidMount = async () => {

        const movie_Id = this.props.match.params.movieId;
        const response = await getMovie(movie_Id)
        if (response) {
            this.setState({
                movie: response,
                isReady: true
            })
        } else {
            this.setState({
                hasError: true,
                error: "No se encuentra la pelicula"
            })
        }
    }

    redirectToUpdateMovie = () => {
        const {_id} = this.state.movie
        this.props.history.push(`/peliculas/editar/${_id}`)
    }

    redirectMovies=() => {
        this.props.history.push(`/peliculas`)    
    }

    deleteMovie = async () => {
        if (window.confirm('¿Deseas eliminar esta pelicula')) {
            try {
                const movieId = this.state.movie._id
                const response = await deleteMovie(movieId)
                if (!response.hasError) {
                    toast.info('Pelicula Eliminada con Exito')
                    this.redirectMovies()
                } else {
                    toast.error('Ha ocurrido un error al eliminar la pelicula')
                }
            } catch (error) {
                toast.error('Ha ocurrido un error al eliminar la pelicula')
            }
        }
    }

    /*componentDidMount = async () => {
        const { movieId } = this.props.match.params;
        const data = await getMovie(movieId);
        if (!data.hasError) {
            this.setState({
                data,
                isReady: true
            });
        } else {
            this.setState({
                hasError: true,
                error: data.error
            });
        };
    };*/

    render() {
        const {
            movie,
            isReady,
            hasError,
            error
        } = this.state
        return (
            <>
                {
                    isReady ?
                        <DetailComponent movie={movie}
                            redirectToUpdateMovie={this.redirectToUpdateMovie}
                            deleteMovie={this.deleteMovie} />

                        : hasError ?
                            <ErrorComponent error={error} />

                            : <LoadingComponent />
                }
            </>
        )
    }
}

const DetailComponent = ({ movie, redirectToUpdateMovie, deleteMovie }) => (
    <>
        <div className="movie-detail-container">
            <div className="movie-detail-header">
                <img width="200px" src="https://previews.123rf.com/images/n7atal7i/n7atal7i1110/n7atal7i111000010/10797969-personas-3d-con-una-se%C3%B1al-vac%C3%ADa-en-manos.jpg" alt="Imagen de pelicula" />
                <p>{movie.title}</p>
            </div>
            <div className="movie-detail-body">
                <div className="movie-detail-body-left">
                    <p className="sinopsis">SINOPSIS</p>
                    <p className="movie-description"> {movie.description} </p>
                </div>
                <div className="movie-detail-body-rigth">
                    <p>Costo de la Entrada: <span> {parseFloat(movie.ticketPrice).toFixed(2)} </span> </p>
                    <p>Duracion en minutos: <span> {movie.duration} </span></p>
                    <p className="is-on-cinemas"> {movie.isOnCinemas ? 'En Cartelera' : 'No disponible en Cines'} </p>
                </div>
            </div>
            <div className="movie-detail-actions">
                <button type="button" className="edit-button" onClick={() => redirectToUpdateMovie()}>Editar pelicula</button>
                <button type="button" className="delete-button" onClick={() => deleteMovie()} >Eliminar pelicula</button>
            </div>
        </div>
    </>
)

const ErrorComponent = ({ error }) => (
    <>
        <p>UPS! Algo fallo al traer las peliculas</p>
        <p> {error} </p>
    </>
)

const LoadingComponent = () => (
    <>
        <div className="loading-container">
            <p>Cargando...</p>
            <img src={cargando} alt="Cargando" />
        </div>
    </>
)
