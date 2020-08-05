import React from 'react'
import './index.sass'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header className="header-container">
                <ul>
                    <li>
                        <Link to="/"> Inicio </Link>
                    </li>
                    <li>
                        <Link to="/peliculas"> Peliculas </Link>
                    </li>
                    <li>
                        <Link to="/peliculas/crear">Crear Pelicula</Link>
                    </li>
                </ul>
                <div className="search-container">
                    <input type="text" name="search" placeholder="Busca una pelicula" />
                    <button type="button">Buscar</button>
                </div>
            </header>
        </>
    )
}

export default Header
