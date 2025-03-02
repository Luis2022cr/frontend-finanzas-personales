import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-lg flex justify-between items-center">
      {/* Título */}
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
        Mi Control Financiero
      </h1>

      {/* Botones de Navegación */}
      <div className="flex gap-4">
        <Link to="/dashboard/main">
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all">
            Inicio
          </button>
        </Link>
        <Link to="/dashboard-futuros">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-all">
            Dashboard Futuros
          </button>
        </Link>
      </div>
    </header>
  );
}
