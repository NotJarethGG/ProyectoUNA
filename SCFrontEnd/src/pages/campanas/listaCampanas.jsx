

import { useState } from 'react';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate , Link} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { getCampaña, eliminarCampana } from '../../services/CampanasServicios';

const ListaCampanas = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery('campana', getCampaña, { enabled: true });

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

  const handleDeleteCampaña = async () => {
    try {
      await eliminarCampana(deleteConfirm);
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

  const handleEditCampaña = (id) => {
    navigate(`/campana-update/${id}`);
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
        <h1 className="Namelist">Registro de Campañas</h1>
        <Link to='/crear-campana-admin'>
        <button className='btnAgregarDesdeAdmin'>Crear Campaña</button>
        </Link>
        <div className="Div-Table">
          <table className="TableCampaña">
            <thead>
              <tr>
                <th>ID Campaña</th>
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
              {currentData.map((campanas) => (
                <tr key={campanas.id}>
                  <td>{campanas.id}</td>
                  <td>{campanas.nombre}</td>
                  <td>{campanas.descripcion}</td>
                  <td>{campanas.ubicacion}</td>
                  <td>{campanas.fecha}</td>
                  <td>{campanas.alimentacion}</td>
                  <td>{campanas.capacidad}</td>
                  <td>{campanas.tipo}</td>
                  <td>{campanas.inOex}</td>
                  <td>
                    <button onClick={() => handleShowConfirmation(campanas.id)} className="btnEliminar">
                      <FontAwesomeIcon icon={faTrashAlt} /> Borrar
                    </button>
                    <button onClick={() => handleEditCampaña(campanas.id)} className="btnModificar">
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
            <p>¿Estás seguro de que deseas eliminar esta campaña?</p>
            <button onClick={handleDeleteCampaña} className="btn-confirm btn-yes">Sí</button>
            <button onClick={handleHideConfirmation} className="btn-confirm btn-no">No</button>
          </div>
        </div>
      )}

      {/* Estilos en línea */}
      <style>
        
      </style>
    </>
  );
};

export default ListaCampanas;
