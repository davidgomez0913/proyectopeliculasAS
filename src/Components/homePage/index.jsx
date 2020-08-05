import React from 'react'
import './index.sass'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'

const HomePage = () => {
    return (
        <>
            <div className="welcome-container">
                <img src={Logo} alt="Logo de peliculas"/>
                <p className="welcome-test">
                    Bienvenido a la mejor plataforma de peliculas en React
                </p>
                <button type="button" className="welcome-button" >
                    <Link to="/peliculas">
                    Ver peliculas
                    </Link>
                </button>

            </div>
        </>
    )
}

export default HomePage
