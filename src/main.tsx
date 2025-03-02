import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import Layout from './layouts/Layout';
import Layout_Login from './layouts/Layout_Login';
import { AuthProvider } from './api/AuthContext';
import Dashboard from './pages/Dashboard';
import DashboardCripto from './components/crypto-futuros/dashbard-cripto-futuros';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <AuthProvider>

      <BrowserRouter>
        <Routes>
          {/* Rutas que utilizan el Layout por defecto */}
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
          </Route>

          {/* Rutas que utilizan el Layout de Login= segundo Layout*/}
          <Route path="/" element={<Layout_Login />}>
            <Route path="dashboard/main" element={<Dashboard />} />
            <Route path="dashboard-futuros" element={<DashboardCripto />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </>
);
