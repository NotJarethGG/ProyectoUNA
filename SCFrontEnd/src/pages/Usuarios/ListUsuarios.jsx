import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getUsuarios, ELiminarUsuario } from '../../services/UsuariosServicios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom'; // Importa Link

const ListUsuarios = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    'usuarios',
    getUsuarios,
    { enabled: true }
  );
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const queryClient = useQueryClient();

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleDeleteUsuario = async (id) => {
    try {
      await ELiminarUsuario(id);
      await refetch();
      queryClient.invalidateQueries('usuarios');
      toast.success('¡Eliminado Exitosamente!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error(error);
    }
    setDeleteConfirm(null);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirm(id);
  };

  const handleEditUsuario = (id) => {
    navigate(`/user-update/${id}`);
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="error">Error</div>;

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(offset, offset + itemsPerPage);

  return (
    <>
      <div className="user-registration">
        <h1 className="Namelist">Registro de Usuarios</h1>
        <Link to="/agregar-usuario-admin" className="btnRegistrarAdmin">
          Crear Usuario
        </Link>
        <div className="Div-Table">
          <table className="TableUsuarios">
            <thead>
              <tr>
                <th>ID Usuario</th>
                <th>Nombre</th>
                <th>Primer Apellido</th>
                <th>Segundo Apellido</th>
                <th>Cédula</th>
                <th>Número</th>
                <th>Ocupación</th>
                <th>Rol</th>
                <th>Correo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apell1}</td>
                  <td>{usuario.apell2}</td>
                  <td>{usuario.cedula}</td>
                  <td>{usuario.numero}</td>
                  <td>{usuario.ocupacion}</td>
                  <td>{usuario.rol}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.status}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteConfirmation(usuario.id)}
                      className="btnEliminar"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                    </button>
                    <button
                      onClick={() => handleEditUsuario(usuario.id)}
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
            <p>¿Estás seguro de que quieres eliminar este usuario?</p>
            <button onClick={() => handleDeleteUsuario(deleteConfirm)}>Sí</button>
            <button onClick={() => setDeleteConfirm(null)}>No</button>
          </div>
        </div>
      )}

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
    </>
  );
};

export default ListUsuarios;
