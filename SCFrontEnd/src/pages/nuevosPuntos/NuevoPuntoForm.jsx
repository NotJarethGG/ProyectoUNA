import { useState } from 'react';
import axios from 'axios';

// Estilos CSS para el formulario
const formStyles = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

// Estilos CSS para los campos de entrada
const inputStyles = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '16px',
};

// Estilos CSS para el botón de envío
const buttonStyles = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const NuevoPuntoForm = () => {
  const [nombrePunto, setNombrePunto] = useState('');
  const [descripcionPunto, setDescripcionPunto] = useState('');
  const [ubicacionPunto, setUbicacionPunto] = useState('');
  const [galeria, setGaleria] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombrePunto', nombrePunto);
    formData.append('descripcionPunto', descripcionPunto);
    formData.append('ubicacionPunto', ubicacionPunto);
    formData.append('galeria', galeria);

    try {
      axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

      const response = await axios.post('nuevo-punto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 1) {
        console.log('Nuevo punto de interés creado exitosamente');
      } else {
        console.log('Error al crear el punto de interés');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div style={formStyles}>
      <h2>Crear Nuevo Punto de Interés</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Punto:</label>
          <input
            type="text"
            value={nombrePunto}
            onChange={(e) => setNombrePunto(e.target.value)}
            required
            style={inputStyles}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={descripcionPunto}
            onChange={(e) => setDescripcionPunto(e.target.value)}
            required
            style={inputStyles}
          />
        </div>
        <div>
          <label>Ubicación:</label>
          <input
            type="text"
            value={ubicacionPunto}
            onChange={(e) => setUbicacionPunto(e.target.value)}
            required
            style={inputStyles}
          />
        </div>
        <div>
          <label>Galería:</label>
          <input
            type="file"
            onChange={(e) => setGaleria(e.target.files[0])}
            required
            style={inputStyles}
          />
        </div>
        {galeria && (
          <div>
            <img
              src={URL.createObjectURL(galeria)}
              alt="Vista previa de la imagen"
              style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
          </div>
        )}

        <button type="submit" style={buttonStyles}>
          Crear Punto de Interés
        </button>
      </form>
    </div>
  );
};

export default NuevoPuntoForm;
