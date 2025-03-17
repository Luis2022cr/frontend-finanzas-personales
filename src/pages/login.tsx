import { useState } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { AxiosError } from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validación básica
    if (!username || !password) {
      setError('Por favor ingresa un usuario y una contraseña');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/login', {
        usuario: username,
        password: password
      });

      // Si el login es exitoso, el backend devuelve el token y los datos del usuario
      const { token } = response.data;

      // Guardar el token en sessionStorage
      sessionStorage.setItem('token', token);

      // Redirigir al dashboard o página principal
      window.location.href = '/dashboard/main'; // O la ruta que necesites

    } catch (err) {
      setLoading(false);

      // Verificamos si el error es de tipo AxiosError
      if (err instanceof AxiosError) {
        if (err.response && err.response.data) {
          setError(err.response.data.error); // Mostrar error desde el backend
        } else {
          setError('Error de red o servidor');
        }
      } else {
        setError('Error al iniciar sesión');
      }
    }
  };

  return (
    <>
      <header className=" bg-gradient-to-r from-gray-800 to-indigo-900 border-b-2">
        <div className='flex justify-between items-center mx-5 p-1 '>

          <a href="/" className='text-white font-bold'>
            Control de finanzas
          </a>
          <a href="/login" className="bg-indigo-950 hover:bg-indigo-800 text-sky-50 p-2 px-4 rounded-xl"> Login</a>
        </div>
      </header>

      <div className="p-4 md:p-0 flex items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-indigo-900">
        <div className="bg-indigo-900/80 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-white mb-6">Iniciar sesión</h2>

          {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-indigo-300 mb-1">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
                placeholder="Nombre de usuario"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-indigo-300 mb-1">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
                placeholder="Contraseña"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
