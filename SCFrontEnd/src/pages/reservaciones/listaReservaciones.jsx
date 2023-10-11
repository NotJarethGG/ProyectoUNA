import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getReservaciones, eliminarReservacion } from "../../services/ReservacionesServicios";
import ReactPaginate from "react-paginate";

const ListaReservaciones = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(
    "reservaciones",
    getReservaciones,
    { enabled: true }
  );
  const navigate = useNavigate();

  const [reservacionToDelete, setReservacionToDelete] = useState(null);
  const [confirmarVisible, setConfirmarVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleShowConfirmation = (id) => {
    setReservacionToDelete(id);
    setConfirmarVisible(true);
  };

  const handleHideConfirmar = () => {
    setReservacionToDelete(null);
    setConfirmarVisible(false);
  };

  const handleDeleteReservaciones = async () => {
    try {
      if (reservacionToDelete !== null) {
        await eliminarReservacion(reservacionToDelete);
        await queryClient.invalidateQueries("reservaciones");
        toast.success("¡Eliminada Exitosamente!", {
          position: toast.POSITION.TOP_RIGHT
        });
        handleHideConfirmar();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditReservaciones = (id) => {
    navigate(`/reservaciones-update/${id}`);
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">Error</div>;

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="user-reservations">
        <h1 className="Namelist">Reservaciones</h1>
        <Link to='/crear-reservacion-admin'><button>Crear Reservacion</button></Link>
        <div className="Div-Table">
          <table className="TableReservaciones">
            <thead>
              <tr>
                <th>ID Reservaciones</th>
                <th>Nombre Visitante</th>
                <th>Primer Apellido</th>
                <th>Segundo Apellido</th>
                <th>Cédula Visitante</th>
                <th>Fecha de Reserva</th>
                <th>Cupo</th>
                <th>Teléfono Visitante</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((reservaciones) => (
                <tr key={reservaciones.id}>
                  <td>{reservaciones.id}</td>
                  <td>{reservaciones.nombreVis}</td>
                  <td>{reservaciones.apell1Vis}</td>
                  <td>{reservaciones.apell2Vis}</td>
                  <td>{reservaciones.cedulaVis}</td>
                  <td>{reservaciones.fechaReserva}</td>
                  <td>{reservaciones.cupo}</td>
                  <td>{reservaciones.telefonoVis}</td>
                  <td>{reservaciones.email}</td>
                  <td>{reservaciones.status}</td>
                  <td>
                    <button
                      onClick={() => handleShowConfirmation(reservaciones.id)}
                      className="btnEliminar"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                    </button>
                    <button
                      onClick={() => handleEditReservaciones(reservaciones.id)}
                      className="btnModificar"
                    >
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
      {confirmarVisible && (
        <div className="confirmar-modal">
          <div className="confirmar-content">
            <p>¿Estás seguro de que deseas eliminar esta reservación?</p>
            <button
              onClick={handleDeleteReservaciones}
              className="btn-confirm btn-yes"
            >
              Sí
            </button>
            <button onClick={handleHideConfirmar} className="btn-confirm btn-no">
              No
            </button>
          </div>
        </div>
      )}

      {/* Estilos en línea */}
      <style>
        {`
          /* Estilos para la tabla */
          .TableReservaciones {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }

          .TableReservaciones th,
          .TableReservaciones td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: center;
          }

          .TableReservaciones th {
            background-color: #f2f2f2;
          }

          .TableReservaciones tr:nth-child(even) {
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
          .confirmar-modal {
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

          .confirmar-content {
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
}

export default ListaReservaciones;
