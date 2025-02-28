import { useState } from "react"
import { Trash2, Edit, ArrowUp, ArrowDown, ImageIcon } from "lucide-react"
import TransactionFilter from "./TransactionFilter";
import Loading_Artifys from "../Loading_artifys";
import { ObtenerTransacciones } from "@/api/servicios/transacciones";
import { ObtenerCuentas } from "@/api/servicios/cuentas";

export default function TransactionTable() {
  const [{ data: transaccion, loading: loadingtransaccion }] = ObtenerTransacciones();
    const [{ data: cuentas, loading: loadingcuentas }] = ObtenerCuentas();
    
    // Filter states
    const [filter, setFilter] = useState({
      type: "all",
    bankAccountId: "all",
    searchTerm: "",
  })
  if (loadingtransaccion || loadingcuentas) return <Loading_Artifys />;
  if (!transaccion || !cuentas) return <div>No se encontraron productos.</div>;

  const formattedAccounts = cuentas.map(account => ({
    id: account.id,   // Asegúrate de que el campo 'id' esté presente
    name: account.nombre || 'Cuenta desconocida',  // O cualquier campo adecuado para el nombre
  }));
  
  
  // Filter transactions
  const filteredTransactions = transaccion.filter((transaccion) => {
    const matchesType = filter.type === "all" || transaccion.tipo === filter.type
    const matchesAccount = filter.bankAccountId === "all" || transaccion.cuenta_id === filter.bankAccountId
    const matchesSearch = transaccion.descripcion.toLowerCase().includes(filter.searchTerm.toLowerCase())
    return matchesType && matchesAccount && matchesSearch
  })

  return (
    <>

      {/* Filters */}
      <TransactionFilter filter={filter} setFilter={setFilter} accounts={formattedAccounts} />

      {/* Transactions Table */}
      <div className="bg-gradient-to-r from-gray-800 to-indigo-900 rounded-lg shadow-lg overflow-hidden border border-indigo-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                  Cuenta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">
                  Recibo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-indigo-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-800">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-indigo-300">
                    No hay transacciones que coincidan con los filtros
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(transaction.fecha).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{transaction.descripcion}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction.cuenta_nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.tipo === "ingresos"
                              ? "bg-cyan-900 text-cyan-300 border border-cyan-500"
                              : "bg-pink-900 text-pink-300 border border-pink-500"
                            }`}
                        >
                          {transaction.tipo === "ingresos" ? (
                            <ArrowUp size={12} className="mr-1" />
                          ) : (
                            <ArrowDown size={12} className="mr-1" />
                          )}
                          {transaction.tipo === "ingresos" ? "Ingreso" : "Gasto"}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap font-medium ${transaction.tipo === "ingresos" ? "text-cyan-400" : "text-pink-400"
                          }`}
                      >
                        ${transaction.monto.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction.recibo ? (
                          <a
                            href={transaction.recibo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-cyan-300 transition-colors"
                          >
                            <ImageIcon size={18} />
                          </a>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-indigo-400 hover:text-cyan-300 transition-colors mr-3"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="text-indigo-400 hover:text-pink-300 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                  
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

