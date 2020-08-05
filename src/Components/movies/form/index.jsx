import React, { Component } from 'react'
import { createMovie, getMovie, updateMovie } from '../../../services/index'
import { schedulesOptions as SOptions } from '../../../consts/index'
import moment from 'moment'
import { toast } from 'react-toastify'
import './index.sass'

export default class MovieForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newMovie: {
                title: '',
                description: '',
                duration: '',
                ticketPrice: '',
                isOnCinemas: false,
                schedules: [],
            },
            schedulesOptions: [],
            isCreate: false,
            isReady: false,
        }
    }

    componentDidMount = async () => {
        if (this.props.match.params.movieId) { // se verifica si llega un ID de pelicula o no, para verificar si es crear o editar
            try {
                const { movieId } = this.props.match.params
                const data = await getMovie(movieId)
                if (!data.hasError) {
                    data.schedules = this.unFormatSchedulesOptions(data.schedules)
                    this.setState({
                        newMovie: data,
                        isReady: true,
                        schedulesOptions: this.filterSchedulesOptions(data.schedules)
                    })
                }
            } catch (error) {
                toast.error(error)
            }
        } else {
            this.setState({
                schedulesOptions: SOptions,
                isCreate: true,
                isReady: true
            })
        }
    }

    unFormatSchedulesOptions = (schedules) => {
        return schedules.map(schedule =>
            moment(schedule.time).format('HH:mm')
        )
    }

    handleChange = (event) => {
        const { name, value } = event.target //Como el name es el nombre del input, y el input tiene el nombre de la llave en el atributo name
        const { newMovie } = this.state
        newMovie[name] = value //por eso aqui queda automatico
        this.setState({
            newMovie
        })
    }

    handleChangeIsOnCinemas = (event) => {
        const { newMovie } = this.state
        newMovie.isOnCinemas = event.target.value === "true" ? true : false
        this.setState({ newMovie })
    }

    filterSchedulesOptions = (schedules) => {
        let { schedulesOptions } = this.state
        schedulesOptions = SOptions.filter(
            schedule => !schedules.includes(schedule) // si el arreglo incluye el elemento, se elimina, si no lo incluye se guarda
        )
        return schedulesOptions
    }

    addSchedule = (value) => {
        const { newMovie } = this.state
        newMovie.schedules.push(value)
        this.setState({ newMovie, schedulesOptions: this.filterSchedulesOptions(newMovie.schedules) })
    }

    deleteSchedule = index => {
        const { newMovie } = this.state
        newMovie.schedules.splice(index, 1)
        this.setState({ newMovie, schedulesOptions: this.filterSchedulesOptions(newMovie.schedules) })
    }

    formatSchedulesTimes = (schedules) => {
        return schedules.map((schedule) => {
            return {
                time: moment(`${moment().format('YYYY-MM-DD')} ${schedule}`)
                    .format('YYYY-MM-DD HH:mm')
            }
        })
    }

    resetForm = () => {
        this.setState({
            newMovie: {
                title: '',
                description: '',
                duration: '',
                ticketPrice: '',
                isOnCinemas: false,
                schedules: [],
            }
        })
    }

    handleSubmit = async () => {
        const { newMovie, isCreate } = this.state
        const successResponse = isCreate ? 'Pelicula Creada con Exito' : 'Pelicula Modificada con Exito'
        const errorResponse = isCreate ? 'Algo fallo al crear la Pelicula' : 'Algo fallo al editar la Pelicula'
        try {
            newMovie.schedules = this.formatSchedulesTimes(newMovie.schedules)
            newMovie.ticketPrice = parseFloat(newMovie.ticketPrice).toFixed(2)
            newMovie.duration = parseInt(newMovie.duration)
            let id = null
            if (!isCreate) {
                id = newMovie._id
                delete newMovie._id
                delete newMovie.createdAt
                delete newMovie.updatedAt
                delete newMovie.deletedAt

            }

            const result = await isCreate ? createMovie(newMovie) : updateMovie(id, newMovie)

            if (!result.hasError) {
                toast.success(successResponse)
                this.resetForm()
            } else {
                toast.error(errorResponse)
            }

        } catch (error) {
            toast.error(errorResponse)

        }
    }

    render() {
        const {
            title,
            description,
            duration,
            ticketPrice,
            isOnCinemas,
            schedules
        } = this.state.newMovie
        const {
            schedulesOptions,
            isCreate,
            isReady,
        } = this.state

        const formTitle = isCreate ? 'Crear Pelicula' : 'Editar Pelicula'
        const textButton = isCreate ? 'GUARDAR PELICULA' : 'GUARDAR CAMBIOS'

        return (
            <>
                {
                    isReady &&
                    <div className="movies-form-container">
                        <p>{formTitle}</p>
                        <div className="input-data-container">
                            <div className="input-data-container-left">
                                <input type="text" name="title" value={title} onChange={(event) => this.handleChange(event)} placeholder="Titulo de la pelicula" />
                                <textarea name="description" value={description} onChange={(event) => this.handleChange(event)} placeholder="Sinopsis" />
                                <input type="number" name="duration" value={duration} onChange={(event) => this.handleChange(event)} placeholder="Duracion pelicula (mins)" />
                            </div>
                            <div className="input-data-container-rigth">
                                <input type="number" name="ticketPrice" value={ticketPrice} onChange={(event) => this.handleChange(event)} placeholder="Precio de la entrada" />
                                <select name="isOnCinemas" defaultValue={isOnCinemas} onChange={(event) => this.handleChangeIsOnCinemas(event)} >
                                    <option value="" disabled defaultValue> Disponible en cines? </option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                                <select name="schedules" onChange={(event) => this.addSchedule(event.target.value)}>
                                    <option value="" defaultValue>Selecciona los horarios de transmision</option>
                                    {
                                        schedulesOptions.map((schedule) => {
                                            return (
                                                <option value={schedule}>{schedule}</option>
                                            )
                                        })
                                    }
                                </select>
                                <div className="schedules-selected-container">
                                    {
                                        schedules.length > 0 ?
                                            schedules.map((schedule, index) => (
                                                <div key={index} className="schedule-item" >
                                                    <p className="schedule-front"> {schedule} </p>
                                                    <p className="schedule-back" onClick={() => this.deleteSchedule(index)}> Eliminar </p>
                                                </div>
                                            ))
                                            : <p>No se han seleccionado horarios</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <button type="button" onClick={() => this.handleSubmit()}>{textButton}</button>
                    </div>
                }
            </>
        )
    }
}
