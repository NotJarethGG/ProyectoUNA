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
  // const UsuarioPassword = useRef(null);

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
      // password: UsuarioPassword.current.value,
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
        // UsuarioPassword.current.value = datosUsuario.password;
      } catch (error) {
        console.error(error);
      }
    }

    cargarDatosUsuario();
  }, [id]);

return (
  <div className="registro">
  <h2>Modificar Usuario</h2>
  <form onSubmit={handleRegistro}>
    <div>
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        ref={UsuarioNombre}
        required
      />
    </div>
    <div>
      <label htmlFor="primerApellido">Primer Apellido:</label>
      <input
        type="text"
        id="primerApellido"
        ref={UsuarioApe1}
        required
      />
    </div>
    <div>
      <label htmlFor="segundoApellido">Segundo Apellido:</label>
      <input
        type="text"
        id="segundoApellido"
        ref={UsuarioApe2}
        required
      />
    </div>
    <div>
      <label htmlFor="cedula">Cédula:</label>
      <input
        type="text"
        id="cedula"
        ref={UsuarioCedula}
        required
      />
    </div>
    <div>
      <label htmlFor="numero">Telefono:</label>
      <input
        type="text"
        id="numero"
        ref={UsuarioNumero}
        required
      />
    </div>
    <div>
      <label htmlFor="ocupacion">Ocupación:</label>
      <input
        type="text"
        id="ocupacion"
        ref={UsuarioOcupacion}
        required
      />
    </div>
    <div>
        <label htmlFor="rol" className="label-rol">Seleccione el rol:</label>
        <select
            id="rol"
            className="select" // Agrega una clase para el combobox
            onChange={(e) => setSelectedRol(e.target.value)}
            value={UsuarioRol}
            required
          >
            <option value="voluntario">voluntario</option>
            <option value="admin">admin</option>
        </select>
    </div>
    <div>
      <label htmlFor="correo">Correo:</label>
      <input
        type="email"
        id="correo"
        ref={UsuarioEmail}
        required
      />
    </div>
    {/* <div>
      <label htmlFor="contrasena">Contraseña:</label>
      <input
        type="password"
        id="contrasena"
        ref={UsuarioPassword}
        required
      />
    </div> */}
    <div className="center-buttonn">
    <button type="submit">Registrar</button>
    </div>
    
  </form>
  <ToastContainer />
</div>
);
};


export default EditUsuario;
