import { useParams } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react'; 
import { useMutation, useQueryClient } from 'react-query';
import { updateUsuario, getUsuariosID } from '../../services/UsuariosServicios'; 
import { toast, ToastContainer } from 'react-toastify';

const EditUsuario = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  
  const UsuarioNombre = useRef(null);
  const UsuarioApe1 = useRef(null);
  const UsuarioApe2 = useRef(null);
  const UsuarioCedula = useRef(null);
  const UsuarioNumero = useRef(null);
  const UsuarioOcupacion = useRef(null);
  const UsuarioRol = useRef(null);
  const UsuarioEmail = useRef(null);
  const UsuarioPassword = useRef(null);

  const [selectedRol, setSelectedRol] = useState(''); // Estado para almacenar el rol seleccionado

  const mutationKey = `user-update/${id}`;
  const mutation = useMutation(mutationKey, updateUsuario, {
    onSettled: () => queryClient.invalidateQueries(mutationKey),
  });


 

  const handleRegistro = (event) => {
    event.preventDefault();
    
    let newData = {
      id: id,
      nombre: UsuarioNombre.current.value,
      apell1: UsuarioApe1.current.value,
      apell2: UsuarioApe2.current.value,
      cedula: UsuarioCedula.current.value,
      numero: UsuarioNumero.current.value,
      ocupacion: UsuarioOcupacion.current.value,
      rol: selectedRol, // Usamos el valor seleccionado del estado
      email: UsuarioEmail.current.value,
      password: UsuarioPassword.current.value,
    };

    console.log(newData);
    // Enviar la solicitud de actualización al servidor
    mutation.mutateAsync(newData)
      .catch((error) => {
        console.error('Error en la solicitud Axios:', error);
      });

    toast.success('¡Guardado Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    async function cargarDatosUsuario() {
      try {
        const datosUsuario = await getUsuariosID(id);
        UsuarioNombre.current.value = datosUsuario.nombre;
        UsuarioApe1.current.value = datosUsuario.apell1;
        UsuarioApe2.current.value = datosUsuario.apell2;
        UsuarioCedula.current.value = datosUsuario.cedula;
        UsuarioNumero.current.value = datosUsuario.numero;
        UsuarioOcupacion.current.value = datosUsuario.ocupacion;
        setSelectedRol(datosUsuario.rol); // Establecer el valor seleccionado en el estado
        UsuarioEmail.current.value = datosUsuario.email;
        UsuarioPassword.current.value = datosUsuario.password;
      } catch (error) {
        console.error(error);
      }
    }

    cargarDatosUsuario();
  }, [id]);

return (
  <div className="edit-container">
    <h1 className="edit-title">Editar Usuario</h1>
    <p>ID del usuario a editar: {id}</p>
    <form onSubmit={handleRegistro}>
      <div className="edit-input">
        <label htmlFor="nombre" className="edit-label">Nombre:</label>
        <input
          type="text"
          id="nombre"
          ref={UsuarioNombre}
          required
          className="edit-input-field"
        />
      </div>
      <div className="edit-input">
        <label htmlFor="primerApellido" className="edit-label">Primer Apellido:</label>
        <input
          type="text"
          id="primerApellido"
          ref={UsuarioApe1}
          required
          className="edit-input-field"
        />
      </div>
      <div className='edit-input'>
          <label htmlFor="segundoApellido" className='edit-label'>Segundo Apellido:</label>
          <input
            type="text"
            id="segundoApellido"
            ref={UsuarioApe2}
            required
            className='edit-input-field'
          />
        </div>
        <div className='edit-input'>
          <label htmlFor="cedula" className='edit-label'>Cédula:</label>
          <input
            type="text"
            id="cedula"
            ref={UsuarioCedula}
            required
            className='edit-input-field'
          />
        </div>
        <div className='edit-input'>
          <label htmlFor="numero" className='edit-label'>Teléfono:</label>
          <input
            type="text"
            id="numero"
            ref={UsuarioNumero}
            required
            className='edit-input-field'
          />
        </div>
        <div className='edit-input'>
          <label htmlFor="ocupacion" className='edit-label'>Ocupación:</label>
          <input
            type="text"
            id="ocupacion"
            ref={UsuarioOcupacion}
            required
            className='edit-input-field'
          />
        </div>
      <div className="edit-input">
        <label htmlFor="rol" className="edit-label">Rol:</label>
        <select
          id="rol"
          ref={UsuarioRol}
          value={selectedRol}
          onChange={(e) => setSelectedRol(e.target.value)}
          required
          className="edit-input-field"
        >
          <option value="Admin">Admin</option>
          <option value="Voluntario">Voluntario</option>
        </select>
      </div>
      <div className='edit-input'>
          <label htmlFor="correo" className='edit-label'>Correo:</label>
          <input
            type="email"
            id="correo"
            ref={UsuarioEmail}
            required
            className='edit-input-field'
          />
        </div>
        <div className='edit-input'>
          <label htmlFor="contrasena" className='edit-label'>Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            ref={UsuarioPassword}
            required
            className='edit-input-field'
          />
        </div>
      <button className="btnGuardar" type="submit">Guardar</button>
    </form>
    <ToastContainer />
  </div>
);
};


export default EditUsuario;
