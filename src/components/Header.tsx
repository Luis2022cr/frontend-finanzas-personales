import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-lg flex justify-between items-center">
      {/* Título */}
      <h1 className="text-base md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
        Mi Control Financiero
      </h1>

      {/* Botones de Navegación */}
      <div className="flex gap-4">
        <Link to="/dashboard/main">
          <button className="px-4 py-2 text-sm md:text-base bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all">
            Cuentas
          </button>
        </Link>
        <Link to="/dashboard-futuros">
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-all">
              Crypto
          </button>
        </Link>
        <Link to="/dashboard-deudas">
          <button className="px-4 py-2 text-sm md:text-base bg-sky-600 hover:bg-sky-700 rounded-lg transition-all">
            Deudas
          </button>
        </Link>
      </div>
    </header>
  );
}
