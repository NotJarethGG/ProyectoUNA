import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getPuntosDIS, eliminarPunto } from '../../services/NuevosPuntos';
import { useNavigate , Link } from 'react-router-dom';

const ListaPuntos = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery('Puntos', getPuntosDIS, { enabled: true });
  const navigate = useNavigate();
  // Define la función para eliminar un punto de interés
  const { mutate: eliminarPuntoMutation } = useMutation(eliminarPunto, {
    onSuccess: () => {
      // Actualiza la lista de puntos de interés después de la eliminación
      queryClient.invalidateQueries('Puntos');
    },
  });

  // Maneja la eliminación de un punto de interés
  const handleEliminarPunto = (puntoId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este punto de interés?')) {
      eliminarPuntoMutation(puntoId);
    }
  };
  const handleEditPunto = (id) => {
    navigate(`/update-punto/${id}`);
  };

  if (isLoading) return <div className="loading">Cargando...</div>;

  if (isError) return <div className="error">Error</div>;

  return (
    <>
      <div className="type-registration">
        <h1 className="Namelist">Lista Puntos De Interés Sostenible</h1>
        <Link to='/nuevo-punto-admin'>
        <button>Crear Punto</button></Link>
        <div className="Div-Table">
          <table className="tableInteresSostenible">
            <thead>
              <tr>
                <th>ID Punto</th>
                <th>Nombre Punto</th>
                <th>Descripción</th>
                <th>Ubicación</th>
                <th>Imagen</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((Puntos) => (
                <tr key={Puntos.id}>
                  <td>{Puntos.id}</td>
                  <td>{Puntos.nombrePunto}</td>
                  <td>{Puntos.descripcionPunto}</td>
                  <td>{Puntos.ubicacionPunto}</td>
                  <td>
                    <img
                      src={`http://127.0.0.1:8000/storage/app/public/galeria/${Puntos.galeria}`}
                      alt={Puntos.galeria}
                      style={{ maxWidth: '100px' }}
                    />
                  </td>
                  <td>{Puntos.statusPunto}</td>
                  <td>
                    <button className="EliminarPunto" onClick={() => handleEliminarPunto(Puntos.id)}>
                      Eliminar
                    </button>
                    <button onClick={() => handleEditPunto(Puntos.id)} className="modificar">Modificar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListaPuntos;
