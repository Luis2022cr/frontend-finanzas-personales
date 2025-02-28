import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import Layout from './layouts/Layout';
import Layout_Login from './layouts/Layout_Login';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    {/* <AuthProvider> */}

      <BrowserRouter>
        <Routes>
          {/* Rutas que utilizan el Layout por defecto */}
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
          </Route>

          {/* Rutas que utilizan el Layout de Login= segundo Layout*/}
          <Route path="/" element={<Layout_Login />}>
            {/* Autenticacion para un dashboard */}

            {/* <Route path="/" element={<EstudianteRoute />}>
          
            </Route> */}

            {/* Autenticacion para un dashboard */}

            {/* <Route path="/" element={<CoordinadoresAuth />}>
            
            </Route> */}

            {/* Autenticacion para un dashboard */}

            {/* <Route path="/" element={<VoaeAuth />}>
              <Route path="dashboard-voae/main" element={<DashboardAdminVoae />} />
            </Route> */}
          </Route>

        </Routes>
      </BrowserRouter>
    {/* </AuthProvider> */}
  </>
);
