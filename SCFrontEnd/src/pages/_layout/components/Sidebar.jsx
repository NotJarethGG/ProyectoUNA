import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {

    FaUserAlt,
    FaBars,
    FaCampground,
    FaCalendarCheck,
    FaTag 
}from "react-icons/fa";

const Sidebar = ({ children }) => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const navLinks = [
        { to: 'home', text: 'Home', icon: <FaUserAlt/> },
        // { to: 'reservaciones', text: 'Solicitar Reservaciones' },
        { to: 'listaReservaciones', text: 'Reservaciones', icon:<FaCalendarCheck/> },
        //{ to: 'campañas', text: 'Crear Campañas' },
        { to: 'listaCampanas', text: 'Campañas', icon:<FaCampground/> },
        { to: 'ListUsuarios', text: 'Usuarios', icon: <FaUserAlt/>},
        //{ to: 'CrearTipo', text: 'Crear Tipo Vol/camp' },
        { to: 'listaTipos', text: 'Tipo Vol/Camp', icon:<FaTag /> },
        { to: 'voluntariados', text: 'Crear Voluntariados' },
        { to: 'listaVOluntariados', text: 'Voluntariados'},
        //{ to: 'nuevoPuntoForm', text: 'Nuevos Puntos'},
        { to: 'listaPuntos', text: 'PuntosIS'},
        { to: 'Login', text: 'Iniciar Sesion' },
        { to: 'Registro', text: 'Registro' },
    ];

    return (
        <div className="container">
            <div style={{ width: sidebarVisible ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: sidebarVisible ? "block" : "none" }} className="logo">
                    <img src="/UNA.png" alt="UNA" />


                    </h1>
                    <div style={{ marginLeft: sidebarVisible ? "50px" : "0px" }} className="bars">
                        {/* <button className='btnSidebar' onClick={toggleSidebar}>
                            {sidebarVisible ? "Cerrar" : "Abrir"}
                        </button> */}
                          <FaBars onClick={toggleSidebar}/>
                    </div>
                </div>
                {navLinks.map((item, index) => (
                    <NavLink to={item.to} key={index} className="link" activeClassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{ display: sidebarVisible ? "block" : "none" }} className="link_text">
                            {item.text}
                        </div>
                    </NavLink>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
