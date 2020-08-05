import React from 'react';
import {BrowserRouter} from 'react-router-dom' 
import Routes from './routes/index'
import {Header,Footer} from './Components/common/index'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.sass'

const App = () => {
    return(
        <BrowserRouter>
            <Header/>
            <div className="main-container">
                <Routes/>
            </div>
            <Footer/>
            <ToastContainer/>
        </BrowserRouter>
    )
}

export default App;