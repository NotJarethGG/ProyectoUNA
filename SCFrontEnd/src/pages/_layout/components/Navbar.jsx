
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    
    return (
        
        <nav className='navbar'>
            
            
            <NavLink
                className='link parent-item capitalize nav-link'
                to="home"   style={{ color: 'white'}}><button className='BtnNav'><h3>Home</h3></button></NavLink >
            
            
            <NavLink
                className='link parent-item capitalize nav-link'
                to="listaVoluntarios"  style={{ color: 'white' }}><button className='BtnNav'><h3>Lista Voluntarios</h3></button></NavLink >
            
            <NavLink
                className='link parent-item capitalize nav-link'
                to="campañas"  style={{ color: 'white' }}><button className='BtnNav'><h3>Campañas</h3></button></NavLink >
             <NavLink
                className='link parent-item capitalize nav-link'
                to="ListUsuarios"  style={{ color: 'white' }}><button className='BtnNav'><h3>Usuarios</h3></button></NavLink >
          
      
        </nav>
    )
}

export default Navbar