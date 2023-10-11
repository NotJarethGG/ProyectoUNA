// import { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

//       const response = await axios.post('login', {
//         email,
//         password,
//       });

//       if (response.data.status === 1) {
//         console.log(response.data);
//         // Aquí puedes manejar la lógica de autenticación exitosa
//       } else {
//         console.log("Error de inicio de sesión");
//         // Aquí puedes manejar la lógica de error de inicio de sesión
//       }
//     } catch (error) {
//       console.error("Error en la solicitud:", error);
//       // Aquí puedes manejar errores de red u otros errores
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

//       const response = await axios.post('logout');

//       if (response.data.status === 1) {
//         // Logout exitoso, limpiar la información de autenticación en el cliente
//         setEmail('');
//         setPassword('');
//         console.log("Sesión cerrada con éxito");
//         // Puedes redirigir al usuario a la página de inicio de sesión o a otra página después del logout
//       } else {
//         console.log("Error al cerrar sesión");
//         // Manejar errores de logout si es necesario
//       }
//     } catch (error) {
//       console.error("Error en la solicitud:", error);
//       // Manejar errores de red u otros errores
//     }
//   };

//   return (
//     <div className="Login" style={styles.container}>
//       <h2 style={styles.title}>Iniciar Sesión</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group" style={styles.formGroup}>
//           <label htmlFor="email" style={styles.label}>Correo Electrónico</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={styles.input}
//           />
//         </div>
//         <div className="form-group" style={styles.formGroup}>
//           <label htmlFor="password" style={styles.label}>Contraseña</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//           />
//         </div>
//         <button type="submit" style={styles.button}>Iniciar Sesión</button>
//       </form>
//       <button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: '400px',
//     margin: '0 auto',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
//     backgroundColor: '#fff',
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   formGroup: {
//     marginBottom: '15px',
//   },
//   label: {
//     display: 'block',
//     marginBottom: '5px',
//   },
//   input: {
//     width: '100%',
//     padding: '10px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//   },
//   button: {
//     width: '100%',
//     padding: '10px',
//     fontSize: '16px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
//   logoutButton: {
//     width: '100%',
//     padding: '10px',
//     fontSize: '16px',
//     backgroundColor: '#CD1719',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     marginTop: '10px',
//   },
// };

// export default Login;

import { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null); // Estado para almacenar el token

  useEffect(() => {
    // Recuperar el token del localStorage al cargar el componente
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

      const response = await axios.post('login', {
        email,
        password,
      });

      if (response.data.status === 1) {
        // Guardar el token en el localStorage
        localStorage.setItem('token', JSON.stringify(response.data));
        // Actualizar el estado con el token
        setToken(response.data.token);

        console.log(response.data);
        // Aquí puedes manejar la lógica de autenticación exitosa
      } else {
        console.log("Error de inicio de sesión");
        // Aquí puedes manejar la lógica de error de inicio de sesión
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      // Aquí puedes manejar errores de red u otros errores
    }
  };

  const handleLogout = async () => {
    try {
      axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

      // Eliminar el token del localStorage
      localStorage.removeItem('token');
      // Limpiar el estado del token
      setToken(null);

      const response = await axios.post('logout');

      if (response.data.status === 1) {
        // Logout exitoso, limpiar la información de autenticación en el cliente
        setEmail('');
        setPassword('');
        console.log("Sesión cerrada con éxito");
        // Puedes redirigir al usuario a la página de inicio de sesión o a otra página después del logout
      } else {
        console.log("Error al cerrar sesión");
        // Manejar errores de logout si es necesario
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      // Manejar errores de red u otros errores
    }
  };

  // Configurar Axios para enviar el token en cada solicitud
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div className="Login" style={styles.container}>
      <h2 style={styles.title}>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Iniciar Sesión</button>
      </form>
      <button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  logoutButton: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#CD1719',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Login;
