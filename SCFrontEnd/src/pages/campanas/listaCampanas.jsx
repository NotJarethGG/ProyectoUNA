

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
        <button className='CrearCampana'>Crear Campaña</button>
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
                      <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
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
        {`
          /* Estilos para la tabla */
          .TableCampaña {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }

          .TableCampaña th,
          .TableCampaña td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: center;
          }

          .TableCampaña th {
            background-color: #f2f2f2;
          }

          .TableCampaña tr:nth-child(even) {
            background-color: #f2f2f2;
          }

          /* Estilos para la paginación */
          .pagination {
            display: flex;
            list-style: none;
            padding: 0;
            justify-content: center;
          }

          .pagination li {
            margin: 0 5px;
            cursor: pointer;
            font-size: 16px;
            padding: 5px 10px;
            border: 1px solid #ccc;
            background-color: #fff;
          }

          .pagination li.active {
            background-color: #007bff;
            color: #fff;
            border: 1px solid #007bff;
          }

          .pagination li:hover {
            background-color: #007bff;
            color: #fff;
            border: 1px solid #007bff;
          }

          /* Estilos para el cuadro de confirmación */
          .confirmation-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
          }

          .confirmation-content {
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
          }

          .btn-confirm {
            margin: 5px;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
          }

          .btn-yes {
            background-color: red;
            color: white;
          }

          .btn-no {
            background-color: blue;
            color: white;
          }
        `}
      </style>
    </>
  );
};

export default ListaCampanas;
