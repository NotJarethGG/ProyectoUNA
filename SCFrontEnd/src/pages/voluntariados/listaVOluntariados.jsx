import { useState } from 'react';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate , Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { getVOluntariado, eliminarVOluntariado } from '../../services/VOluntariadosServicios';

const ListaVOluntariados = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery('mostrar-voluntariado', getVOluntariado, { enabled: true });

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handleShowConfirmation = (id) => {
    setDeleteConfirm(id);
    setIsConfirmationOpen(true);
  };

  const handleHideConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleDeleteVOluntariado = async () => {
    try {
      await eliminarVOluntariado(deleteConfirm);
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

  const handleEditVOluntariado = (id) => {
    navigate(`/voluntariado-update/${id}`);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">Error</div>;

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="campaign-registration">
        <h1 className="Namelist">Registro de Voluntariados</h1>
        <div className="Div-Table">
          <Link to="/nuevo-voluntariados-admin"><button className='btnAgregarDesdeAdmin'>Crear Voluntariado</button></Link>
          <table className="TableVOluntariado">
            <thead>
              <tr>
                <th>ID Voluntariado</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Ubicación</th>
                <th>Fecha</th>
                <th>Alimentación</th>
                <th>Capacidad</th>
                <th>Tipo</th>
                <th>Interna o Externa</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((voluntariados) => (
                <tr key={voluntariados.id}>
                  <td>{voluntariados.id}</td>
                  <td>{voluntariados.nombre}</td>
                  <td>{voluntariados.descripcion}</td>
                  <td>{voluntariados.ubicacion}</td>
                  <td>{voluntariados.fecha}</td>
                  <td>{voluntariados.alimentacion}</td>
                  <td>{voluntariados.capacidad}</td>
                  <td>{voluntariados.tipo}</td>
                  <td>{voluntariados.inOex}</td>
                  <td>
                    <button onClick={() => handleShowConfirmation(voluntariados.id)} className="btnEliminar">
                      <FontAwesomeIcon icon={faTrashAlt} /> Borrar
                    </button>
                    <button onClick={() => handleEditVOluntariado(voluntariados.id)} className="btnModificar">
                      <FontAwesomeIcon icon={faFolderPlus} /> Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>

      {/* Paginación */}
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />

      {/* Modal de confirmación */}
      {isConfirmationOpen && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <p>¿Estás seguro de que deseas eliminar este voluntariado?</p>
            <button onClick={handleDeleteVOluntariado} className="btn-confirm btn-yes">Sí</button>
            <button onClick={handleHideConfirmation} className="btn-confirm btn-no">No</button>
          </div>
        </div>
      )}

      {/* Estilos en línea */}
      
    </>
  );
};

export default ListaVOluntariados;