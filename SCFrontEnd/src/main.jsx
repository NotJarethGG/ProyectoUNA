import React from 'react'
import ReactDOM from 'react-dom/client'
//estilos
import './index.css'
import './Styles/SidebarC.scss'
import './Styles/Home.scss'
import './Styles/Editar.css'
// import './Styles/SidebarC.css'
import './Styles/Botones.css'
import './Styles/Tablas.css'
import './Styles/Login.css'
import './Styles/EditCamp.css'
import './Styles/Registro.css' 
import './Styles/confirmacion.css'
import './Styles/EditarTipo.css'
import './Styles/CrearTipo.css'
import './Styles/Puntos.css'
import './Styles/Reservaciones.css'
import './Styles/editPunto.css'
//Rutas
import { Layout } from './pages/_layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Campañas from './pages/campanas/campanas'
import  Home from './pages/home/Home'
// import ListaVoluntarios from './pages/voluntarios/listaVoluntarios'
import ListUsuarios from './pages/Usuarios/ListUsuarios'
import ListaRoles from './pages/Roles/listRoles'
import Login from './pages/Login/Login'
import Registro from './pages/Login/Registro'
 import AgregarUsuAdmin from './pages/Usuarios/AgregarUsuAdmin'
import EditarUsuario from './pages/Usuarios/EditarUsuario'
import Reservacion from './pages/reservaciones/Reservacion'
import ListaReservaciones from './pages/reservaciones/listaReservaciones'
import ListaCampanas from './pages/campanas/listaCampanas'
import EditarCampaña from './pages/campanas/editarCampana'
import EditReservaciones from './pages/reservaciones/EditReservaciones'
import ListaTipos from './pages/tipoVC/listaTipo'
import EditarTipo from './pages/tipoVC/EditarTipo'
import CrearTipo from './pages/tipoVC/CrearTipo'
import Sidebar from './pages/_layout/components/Sidebar'
import ListaPuntos from './pages/nuevosPuntos/listaPuntos'
import NuevoPuntoForm from './pages/nuevosPuntos/NuevoPuntoForm'
import EditarPunto from './pages/nuevosPuntos/EditarPunto'
import VOluntariados from './pages/voluntariados/voluntariado'
import EditarVOluntariado from './pages/voluntariados/editarVoluntariado'
import ListaVOluntariados from './pages/voluntariados/listaVOluntariados'

import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

export const ThemeContext = React.createContext(null)


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <BrowserRouter>
    <Sidebar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} /> 
          <Route path="/campañas" element={<Campañas/>} /> 
          <Route path="/listUsuarios" element={<ListUsuarios/>} /> 
          <Route path="/ListRoles" element={<ListaRoles/>} /> 
          <Route path="/Login" element={<Login/>} /> 
          <Route path="/Registro" element={<Registro/>} /> 
          <Route path="/listaCampanas" element={<ListaCampanas/>} /> 
          <Route path='/campana-update/:id' element={<EditarCampaña/>} />
          {/* <Route path="/AgregarUsuAdmin" element={<AgregarUsuAdmin/>} />  */}
          <Route path="/user-update/:id" element={<EditarUsuario/>} />
          <Route path="/reservaciones" element={<Reservacion/>} /> 
          <Route path="/listaReservaciones" element={<ListaReservaciones/>} />
          <Route path="/reservaciones-update/:id" element={<EditReservaciones/>}/> 
          <Route path="/CrearTipo" element={<CrearTipo/>}/>
          <Route path='/listaTipos' element={<ListaTipos />}/>
          <Route path="/update-tipo/:id" element={<EditarTipo/>}/>
          <Route path='/listaPuntos' element={<ListaPuntos/>}/>
          <Route path='/nuevoPuntoForm'element={<NuevoPuntoForm/>}/>
          <Route path='/agregar-usuario-admin'element={<AgregarUsuAdmin/>}/>
          <Route path="/agregar-tipo-admin" element={<CrearTipo/>}/>
          <Route path="/crear-campana-admin" element={<Campañas/>} /> 
          <Route path="/update-punto/:id" element={<EditarPunto/>}/>
          <Route path="/crear-reservacion-admin" element={<Reservacion/>} /> 
          <Route path='/nuevo-punto-admin'element={<NuevoPuntoForm/>}/>
          <Route path="/listaVOluntariados"element={<ListaVOluntariados/>}/>
          <Route path='/voluntariado-update/:id'element={<EditarVOluntariado/>}/>
          <Route path="/voluntariados" element={<VOluntariados/>}/>
          {/* <Route path="/ListUsuarios/create-usuario" element={<AgregarUsuAdmin/>} /> 
           */}
        </Route>
      </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
