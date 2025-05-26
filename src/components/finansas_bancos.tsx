
import Loading_Artifys from "./Loading_artifys"
import { ObtenerBalanceIngresosyGastos } from "@/api/servicios/balances"

export default function Finansas_bancos() {
  // State for bank accounts  
  const [{ data: balance, loading: loadingBalance }] = ObtenerBalanceIngresosyGastos();

  if (loadingBalance) return <Loading_Artifys />;
  if (!balance) return <div>No se encontraron productos.</div>;

  return (
    <>
      {/* Header */}
      <div className="mb-8">

        <div className="bg-gradient-to-r from-gray-800 to-indigo-900 rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between items-center border border-indigo-700">
          <div>
            <p className="text-indigo-300 mb-1 text-center">Balance Total</p>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
              L. {balance.balance_total.toFixed(2)}
            </p>
          </div>
          {/* <div className="mt-4 md:mt-0 flex gap-6">
            <div className="text-center">
              <p className="text-indigo-300 mb-1">Ingresos</p>
              <p className="text-xl font-semibold text-cyan-400">
                L. {balance.total_ingresos.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-indigo-300 mb-1">Gastos</p>
              <p className="text-xl font-semibold text-pink-400">
                L. {balance.total_gastos.toFixed(2)}
              </p>
            </div>
          </div> */}
        </div>

      </div>
    </>
  )
}

