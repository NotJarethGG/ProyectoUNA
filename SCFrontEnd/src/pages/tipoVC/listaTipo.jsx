
import { useState } from "react";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate , Link} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTipos, eliminarTipo } from "../../services/TiposServicios";
import ReactPaginate from "react-paginate";

const ListaTipos = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "ver-tipo",
    getTipos,
    { enabled: true }
  );
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleDeleteCandidate = async (id) => {
    try {
      await eliminarTipo(id);
      await refetch();
      toast.success("¡Eliminado Exitosamente!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error("Error en la solicitud Axios:", error);
    }
    setDeleteConfirm(null);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirm(id);
  };

  const handleEditTipo = (id) => {
    navigate(`/update-tipo/${id}`);
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">Error</div>;

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="type-registration">
        
        
        <h1 className="Namelist">Registro de Tipos</h1>
        <Link to="/agregar-tipo-admin">
        <button>Crear Tipo</button>
        </Link>
        <div className="Div-Table">
          <table className="TableTipo">
            <thead>
              <tr>
                <th>ID Tipo</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((tipo) => (
                <tr key={tipo.id}>
                  <td>{tipo.id}</td>
                  <td>{tipo.nombreTipo}</td>
                  <td>{tipo.statusVC}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteConfirmation(tipo.id)}
                      className="btnEliminar"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Borrar
                    </button>
                    <button
                      onClick={() => handleEditTipo(tipo.id)}
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

      {deleteConfirm !== null && (
        <div className="overlay">
          <div className="delete-confirm">
            <p>¿Estás seguro de que quieres eliminar este tipo?</p>
            <button onClick={() => handleDeleteCandidate(deleteConfirm)}>
              Sí
            </button>
            <button onClick={() => setDeleteConfirm(null)}>No</button>
          </div>
        </div>
      )}

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
    </>
  );
};

export default ListaTipos;
