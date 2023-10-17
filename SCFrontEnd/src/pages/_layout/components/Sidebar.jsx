// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import {

//     FaUserAlt,
//     FaBars,
//     FaCampground,
//     FaCalendarCheck,
//     FaTag 
// }from "react-icons/fa";

// const Sidebar = ({ children }) => {
//     const [sidebarVisible, setSidebarVisible] = useState(true);

//     const toggleSidebar = () => {
//         setSidebarVisible(!sidebarVisible);
//     };

//     const navLinks = [
//         { to: 'home', text: 'Home', icon: <FaUserAlt/> },
//         // { to: 'reservaciones', text: 'Solicitar Reservaciones' },
//         { to: 'listaReservaciones', text: 'Reservaciones', icon:<FaCalendarCheck/> },
//         //{ to: 'campañas', text: 'Crear Campañas' },
//         { to: 'listaCampanas', text: 'Campañas', icon:<FaCampground/> },
//         { to: 'ListUsuarios', text: 'Usuarios', icon: <FaUserAlt/>},
//         //{ to: 'CrearTipo', text: 'Crear Tipo Vol/camp' },
//         { to: 'listaTipos', text: 'Tipo Vol/Camp', icon:<FaTag /> },
//         { to: 'voluntariados', text: 'Crear Voluntariados' },
//         { to: 'listaVOluntariados', text: 'Voluntariados'},
//         //{ to: 'nuevoPuntoForm', text: 'Nuevos Puntos'},
//         { to: 'listaPuntos', text: 'PuntosIS'},
//         { to: 'Login', text: 'Iniciar Sesion' },
//         { to: 'Registro', text: 'Registro' },
//     ];

//     return (
//         <div className="container">
//             <div style={{ width: sidebarVisible ? "200px" : "50px" }} className="sidebar">
//                 <div className="top_section">
//                     <h1 style={{ display: sidebarVisible ? "block" : "none" }} className="logo">
//                     <img src="/UNA.png" alt="UNA" />


//                     </h1>
//                     <div style={{ marginLeft: sidebarVisible ? "50px" : "0px" }} className="bars">
//                         {/* <button className='btnSidebar' onClick={toggleSidebar}>
//                             {sidebarVisible ? "Cerrar" : "Abrir"}
//                         </button> */}
//                           <FaBars onClick={toggleSidebar}/>
//                     </div>
//                 </div>
//                 {navLinks.map((item, index) => (
//                     <NavLink to={item.to} key={index} className="link" activeClassName="active">
//                         <div className="icon">{item.icon}</div>
//                         <div style={{ display: sidebarVisible ? "block" : "none" }} className="link_text">
//                             {item.text}
//                         </div>
//                     </NavLink>
//                 ))}
//             </div>
//             <main>{children}</main>
//         </div>
//     );
// };

// export default Sidebar;



import Icon from '../../Img/Icon.svg'

import { NavLink } from 'react-router-dom'
import * as FaIcons from 'react-icons/im'
import * as FaIconss from 'react-icons/md'
import * as FaIconsd from 'react-icons/fa'
import * as FaIconsc from 'react-icons/md'
import * as FaIconscs from 'react-icons/ai'
import * as FaIconsci from 'react-icons/md'
import * as FaIconsce from 'react-icons/bs'




const Sidebar =() => {

    return(
    <div className="sidebar bg-light">
       <div className='logoContainer'>
        <img src= {Icon} alt ='icon' className ='logo' />
        <h5 className='title'>Sendero Cornizuelo.</h5>
        </div>
        <div className='burgerContainer'>
            <div className='trigger'></div>
            <div className='Menu'></div>
        </div>
       <ul>
        <li>
            <NavLink to = "/home" exact className='text-dark rounded py-2 w-100 d-inline-block px-3' 
             activeclassname="active"><FaIcons.ImHome className='me-2'/> Inicio</ NavLink>
        </li>  
        <li>
            <NavLink to = "/login" exact className='text-dark rounded py-2 w-100 d-inline-block px-3' 
            activeclassname="active"><FaIconss.MdAppRegistration className='me-2'/> Registro</ NavLink>
        </li>
        <li>
            < NavLink to = "/listaUsuarios" exact className='text-dark rounded py-2 w-100 d-inline-block px-3'
            activeclassname="active"><FaIconsd.FaUsers className='me-2'/> Usuarios</ NavLink>
        </li>
        <li>
             <NavLink to = "/listaCampanas" exact className='text-dark rounded py-2 w-100 d-inline-block px-3'
            activeclassname="active"><FaIconsc.MdNewspaper className='me-2'/>Campañas</NavLink>
        </li>
        <li>
             <NavLink to = "/listaReservaciones" exact className='text-dark rounded py-2 w-100 d-inline-block px-3'
            activeclassname="active"><FaIconscs.AiOutlineAudit className='me-2'/> Reservaciones</NavLink>
        </li>
        <li>
             <NavLink to = "/listaTipos" exact className='text-dark rounded py-2 w-100 d-inline-block px-3'
            activeclassname="active"><FaIconsci.MdVolunteerActivism className='me-2'/>TipoVC</NavLink>
         </li>
         <li>
             <NavLink to = "/listaVOluntariados" exact className='text-dark rounded py-2 w-100 d-inline-block px-3'
            activeclassname="active"><FaIconsce.BsFillFileEarmarkTextFill className='me-2'/>Voluntariados</NavLink>
         </li>
         <li>
             <NavLink to = "/listaPuntos" exact className='text-dark rounded py-2 w-100 d-inline-block px-3'
            activeclassname="active"><FaIconsce.BsFillFileEarmarkTextFill className='me-2'/>Puntos De interes</NavLink>
         </li>
      </ul>
    </div>
    );
   
}

export default Sidebar