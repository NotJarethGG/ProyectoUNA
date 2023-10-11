import { useState } from 'react';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
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
                      <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
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
      <style>
        {`
          /* Estilos para la tabla */
          .TableVOluntariado {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }

          .TableVOluntariado th,
          .TableVOluntariado td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: center;
          }

          .TableVOluntariado th {
            background-color: #f2f2f2;
          }

          .TableVOluntariado tr:nth-child(even) {
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

export default ListaVOluntariados;