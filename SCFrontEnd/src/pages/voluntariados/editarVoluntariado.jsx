import { useParams } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react'; 
import { useMutation, useQueryClient } from 'react-query';
import { updateVOluntariado, getVOluntariadoID } from '../../services/VOluntariadosServicios'; 
import { toast, ToastContainer } from 'react-toastify';

const EditarVOluntariado = () => {
  const { id } = useParams(); 
  console.log(id);
  const queryClient = useQueryClient();
  const VOluntariadonombre = useRef(null);
  const VOluntariadodescripcion = useRef(null);
  const VOluntariadoubicacion = useRef(null);
  const VOluntariadofecha = useRef(null);
  const [alimentacion, setAlimentacion] = useState('sí'); 
  const VOluntariadocapacidad = useRef(null);
  const VOluntariadotipo = useRef(null);
  const [inOex, setInOex] = useState('interno');
  

  const mutationKey = `voluntariado-update/${id}`;
  const mutation = useMutation(mutationKey, updateVOluntariado, {
    onSettled: () => queryClient.invalidateQueries(mutationKey),
  });


  const handleRegistro = (event) => {
    event.preventDefault();
    
    let newData = {
      id : id,
      nombre: VOluntariadonombre.current.value,
      descripcion: VOluntariadodescripcion.current.value,
      ubicacion: VOluntariadoubicacion.current.value,
      fecha: VOluntariadofecha.current.value,
      alimentacion,
      capacidad: VOluntariadocapacidad.current.value,
      tipo: VOluntariadotipo.current.value,
      inOex,
    };

    console.log(newData);
    mutation.mutateAsync( newData) 

    .catch((error) => {
      console.error('Error en la solicitud Axios:', error);
    });

    toast.success('¡Guardada Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    
    async function cargarDatosVOluntariado() {
      try {
        const datosVOluntariado = await getVOluntariadoID(id); 
        VOluntariadonombre.current.value = datosVOluntariado.nombre;
        VOluntariadodescripcion.current.value = datosVOluntariado.descripcion;
        VOluntariadoubicacion.current.value = datosVOluntariado.ubicacion;
        VOluntariadofecha.current.value = datosVOluntariado.fecha;
        setAlimentacion(datosVOluntariado.alimentacion);
        VOluntariadocapacidad.current.value = datosVOluntariado.capacidad;
        VOluntariadotipo.current.value = datosVOluntariado.tipo;
        setInOex(datosVOluntariado.inOex);
      } catch (error) {
        console.error(error);
      }
    }

    cargarDatosVOluntariado();
  }, [id]);

  return (
<div className="registro">
      <h2>Editar Voluntariado</h2>
      <p className="edit-id">ID del Tipo a editar: {id}</p>
      <form onSubmit={handleRegistro}>
        <div>
          <label htmlFor="nombre">Nombre del voluntariado:</label>
          <input
            type="text"
            id="nombre"
            ref={VOluntariadonombre}
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción del  voluntariado:</label>
          <input
            type="text"
            id="descripcion"
            ref={VOluntariadodescripcion}
            required
          />
        </div>
        <div>
          <label htmlFor="ubicacion">Ubicación del  voluntariado:</label>
          <input
            type="text"
            id="ubicacion"
            ref={VOluntariadoubicacion}
            required
          />
        </div>
        <div>
          <label htmlFor="fecha">Fecha del voluntariado:</label>
          <input
            type="date"
            id="fecha"
            ref={VOluntariadofecha}
            required
          />
        </div>
        <div>
            <label htmlFor="alimentacion" className="label">¿Se dará alimentación?</label>
            <select
                id="alimentacion"
                className="select" // Agrega una clase para el combobox
                onChange={(e) => setAlimentacion(e.target.value)}
                value={alimentacion}
                required
              >
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
        </div>
        <div>
          <label htmlFor="cupo">Capacidad:</label>
          <input
            type="text"
            id="cupo"
            ref={VOluntariadocapacidad}
            required
          />
        </div>
        <div>
          <label htmlFor="tipo">Tipo:</label>
          <input
            type="text"
            id="tipo"
            ref={VOluntariadotipo}
            required
          />
        </div>
        <div>
            <label htmlFor="inOex" className="label">¿Será para internos o externos?</label>
            <select
                  id="inOex"
                  className="select" // Agrega una clase para el combobox
                  onChange={(e) => setInOex(e.target.value)}
                  value={inOex}
                  required
                >
                  <option value="Interno">Interno</option>
                  <option value="Externo">Externo</option>
            </select>
          </div>
          <div className='center-buttonn'>
          <button type="submit">Crear</button>
          </div>
        
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditarVOluntariado;