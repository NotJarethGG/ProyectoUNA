import { useState } from 'react';
import { useQuery } from 'react-query';
import { getPuntosDIS, eliminarPunto } from '../../services/NuevosPuntos';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ReactPaginate from 'react-paginate';

const ListaPuntos = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery('Puntos', getPuntosDIS, { enabled: true });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handleShowConfirmation = (id) => {
    setDeleteConfirm(id);
    setIsConfirmationOpen(true);
  };

  const handleHideConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleDeleteNuevoPunto = async () => {
    try {
      await eliminarPunto(deleteConfirm);
      await refetch();
      toast.success('¡Eliminada Exitosamente!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error(error);
      toast.error('Error al eliminar: ' + error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setIsConfirmationOpen(false);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEditPunto = (id) => {
    navigate(`/update-punto/${id}`);
  };

  if (isLoading) return <div className="loading">Cargando...</div>;

  if (isError) return <div className="error">Error</div>;

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="type-registration">
        <h1 className="Namelist">Lista Puntos De Interés Sostenible</h1>
        <Link to='/nuevo-punto-admin'>
          <button>Crear Punto</button>
        </Link>
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
              {currentData.map((Puntos) => (
                <tr key={Puntos.id}>
                  <td>{Puntos.id}</td>
                  <td>{Puntos.nombrePunto}</td>
                  <td>{Puntos.descripcionPunto}</td>
                  <td>{Puntos.ubicacionPunto}</td>
                  <td>
                    <img
                      src={`http://127.0.0.1:8000/storage/app/public/galeria/${Puntos.galeria}`}
                      alt={Puntos.galeria}
                      style={{ maxWidth: '100%', maxHeight: '200px'  }}
                    />
                  </td>
                  <td>{Puntos.statusPunto}</td>
                  <td>
                    <button className="btnEliminar" onClick={() => handleShowConfirmation(Puntos.id)}>
                      Borrar
                    </button>
                    <button onClick={() => handleEditPunto(Puntos.id)} className="btnModificar">Modificar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>

      {/* Paginación */
      
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      }

      {isConfirmationOpen && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <p>¿Estás seguro de que deseas eliminar este punto?</p>
            <button onClick={handleDeleteNuevoPunto} className="btn-confirm btn-yes">
              Sí
            </button>
            <button onClick={handleHideConfirmation} className="btn-confirm btn-no">
              No
            </button>
          </div>
        </div>
      )}

    
    </>
  );
};

export default ListaPuntos;
