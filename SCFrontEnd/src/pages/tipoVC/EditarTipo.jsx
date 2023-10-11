import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { updateTipo, getTipoID } from '../../services/TiposServicios';
import { toast, ToastContainer } from 'react-toastify';

const EditarTipo = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const NombreTipo = useRef(null);

  const mutationKey = `update-tipo/${id}`;
  const mutation = useMutation(mutationKey, updateTipo, {
    onSettled: () => queryClient.invalidateQueries(mutationKey),
  });

  const handleRegistro = (event) => {
    event.preventDefault();

    let newData = {
      id: id,
      nombreTipo: NombreTipo.current.value,
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
    async function cargarDatosTipo() {
      try {
        const datosTipo = await getTipoID(id);
        NombreTipo.current.value = datosTipo.nombreTipo;

      } catch (error) {
        console.error(error);
      }
    }

    cargarDatosTipo();
  }, [id]);

  return (
    <div className="edit-container-tipo">
      <h1 className="edit-tipo">Editar Tipo</h1>
      <p className="edit-id">ID del Tipo a editar: {id}</p>
      <form onSubmit={handleRegistro} className="edit-form">
        <div className="edit-input">
          <label htmlFor="nombreTipo" className="edit-label">
            Nombre:
          </label>
          <input
            type="text"
            id="nombreTipo"
            ref={NombreTipo}
            required
            className="edit-input-field"
          />
        </div>
        <button className="btnGuardar" type="submit">
          Guardar
        </button>
      </form>
      <ToastContainer />
    </div>
  );

};

export default EditarTipo;
