import { useRef, useState } from 'react';
import {  useMutation, useQueryClient } from 'react-query';
import { create } from '../../services/VOluntariadosServicios';
import { toast, ToastContainer } from 'react-toastify';


const VOluntariados = () => {
  const queryClient = useQueryClient();
  const nombreRef = useRef(null);
  const descripcionRef = useRef(null);
  const ubicacionRef = useRef(null);
  const fechaRef = useRef(null);
  const [alimentacion, setAlimentacion] = useState('sí'); 
  const capacidadRef = useRef(null);
  const tipoRef = useRef(null);
  const [inOex, setInOex] = useState('interno'); // Estado para rastrear la selección


  const mutation = useMutation("create-voluntariado", create, {
    onSettled: () => queryClient.invalidateQueries("create-voluntariado"),
    mutationKey: "create-voluntariado",
    onError: (error) => {
      toast.error('Error al guardar: ' + error.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  });

  const handleRegistro = async (e) => {
    e.preventDefault();

    let newVOluntariado = {
      nombre: nombreRef.current.value,
      descripcion: descripcionRef.current.value,
      ubicacion: ubicacionRef.current.value,
      fecha: fechaRef.current.value,
      alimentacion,
      capacidad: capacidadRef.current.value,
      tipo: tipoRef.current.value,
      inOex,
    };

    await mutation.mutateAsync(newVOluntariado);

    toast.success('¡Guardado Exitosamente!', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="registro">
      <h2>Nuevo Voluntariado</h2>
      <form onSubmit={handleRegistro}>
        <div>
          <label htmlFor="nombre">Nombre del voluntariado:</label>
          <input
            type="text"
            id="nombre"
            ref={nombreRef}
            required
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción del  voluntariado:</label>
          <input
            type="text"
            id="descripcion"
            ref={descripcionRef}
            required
          />
        </div>
        <div>
          <label htmlFor="ubicacion">Ubicación del  voluntariado:</label>
          <input
            type="text"
            id="ubicacion"
            ref={ubicacionRef}
            required
          />
        </div>
        <div>
          <label htmlFor="fecha">Fecha del voluntariado:</label>
          <input
            type="date"
            id="fecha"
            ref={fechaRef}
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
            ref={capacidadRef}
            required
          />
        </div>
        <div>
          <label htmlFor="tipo">Tipo:</label>
          <input
            type="text"
            id="tipo"
            ref={tipoRef}
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
        <button type="submit">Crear</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default VOluntariados;