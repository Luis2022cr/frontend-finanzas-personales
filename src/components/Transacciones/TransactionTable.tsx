import { useState } from "react";
import { Trash2, Edit, ArrowUp, ArrowDown, ImageIcon } from "lucide-react";
import TransactionFilter from "./TransactionFilter";
import Loading_Artifys from "../Loading_artifys";
import { ObtenerTransacciones } from "@/api/servicios/transacciones";
import { ObtenerCuentas } from "@/api/servicios/cuentas";

export default function TransactionTable() {
  const [{ data: transaccion, loading: loadingtransaccion }] = ObtenerTransacciones();
  const [{ data: cuentas, loading: loadingcuentas }] = ObtenerCuentas();
  
  const [filter, setFilter] = useState({
    type: "all",
    bankAccountId: "all",
    searchTerm: "",
  });

  if (loadingtransaccion || loadingcuentas) return <Loading_Artifys />;
  if (!transaccion || !cuentas) return <div>No se encontraron transacciones.</div>;

  const formattedAccounts = cuentas.map(account => ({
    id: account.id,
    name: account.nombre || 'Cuenta desconocida',
  }));

  const filteredTransactions = transaccion.filter(trans => {
    const matchesType = filter.type === "all" || trans.tipo === filter.type;
    const matchesAccount = filter.bankAccountId === "all" || trans.cuenta_id === filter.bankAccountId;
    const matchesSearch = trans.descripcion.toLowerCase().includes(filter.searchTerm.toLowerCase());
    return matchesType && matchesAccount && matchesSearch;
  });

  return (
    <>
      {/* Filtros */}
      <TransactionFilter filter={filter} setFilter={setFilter} accounts={formattedAccounts} />

      {/* Contenedor de la tabla/tarjetas */}
      <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-950 rounded-lg shadow-lg overflow-hidden border border-indigo-700 p-4">
        {/* Modo tabla (solo en pantallas grandes) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-900/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Descripción</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Cuenta</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Tipo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Monto</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Recibo</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-indigo-300 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-800">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-center text-indigo-300">
                    No hay transacciones que coincidan con los filtros
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="px-4 py-4">{new Date(transaction.fecha).toLocaleDateString()}</td>
                    <td className="px-4 py-4">{transaction.descripcion}</td>
                    <td className="px-4 py-4">{transaction.cuenta_nombre}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${transaction.tipo === "ingresos" ? "bg-cyan-900 text-cyan-300 border border-cyan-500" : "bg-pink-900 text-pink-300 border border-pink-500"}`}>
                        {transaction.tipo === "ingresos" ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
                        {transaction.tipo === "ingresos" ? "Ingreso" : "Gasto"}
                      </span>
                    </td>
                    <td className={`px-4 py-4 font-medium ${transaction.tipo === "ingresos" ? "text-cyan-400" : "text-pink-400"}`}>
                      ${transaction.monto.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      {transaction.recibo ? (
                        <a href={transaction.recibo} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-cyan-300 transition-colors">
                          <ImageIcon size={18} />
                        </a>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-indigo-400 hover:text-cyan-300 transition-colors mr-3">
                        <Edit size={18} />
                      </button>
                      <button className="text-indigo-400 hover:text-pink-300 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modo Tarjetas (solo en móviles) */}
        <div className="md:hidden flex flex-col gap-4">
          {filteredTransactions.length === 0 ? (
            <div className="text-center text-indigo-300">No hay transacciones que coincidan con los filtros</div>
          ) : (
            filteredTransactions.map(transaction => (
              <div key={transaction.id} className="bg-indigo-900 p-4 rounded-md shadow-md border border-indigo-700">
                <p className="text-xs text-indigo-300 mb-1">{new Date(transaction.fecha).toLocaleDateString()}</p>
                <p className="text-lg font-semibold text-white">{transaction.descripcion}</p>
                <p className="text-sm text-indigo-300">Cuenta: <span className="font-semibold text-white">{transaction.cuenta_nombre}</span></p>
                <p className={`text-sm font-semibold ${transaction.tipo === "ingresos" ? "text-cyan-300" : "text-pink-300"}`}>
                  {transaction.tipo === "ingresos" ? "Ingreso" : "Gasto"}: ${transaction.monto.toLocaleString()}
                </p>
                <div className="flex items-center justify-between mt-3">
                  {transaction.recibo ? (
                    <a href={transaction.recibo} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-cyan-300 transition-colors">
                      <ImageIcon size={18} />
                    </a>
                  ) : <span className="text-gray-500">-</span>}
                  <div>
                    <button className="text-indigo-400 hover:text-cyan-300 transition-colors mr-3">
                      <Edit size={18} />
                    </button>
                    <button className="text-indigo-400 hover:text-pink-300 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
