import Finansas_bancos from "./finansas_bancos";
import Micuenta from "./MiCuentas";
import TransactionForm from "./Transacciones/TransactionForm";
import TraspasoEntreCuentas from "./Transacciones/transferenciaEntreCuentas";

export default function FinanceTracker() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-indigo-800 p-4 md:p-8 text-white">

      <Finansas_bancos />
      <Micuenta />
      <div className="  md:flex justify-between items-center mb-4 gap-2 ">
        <h2 className="text-3xl md:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 md:mb-4">
          Transacciones
        </h2>
        <div className="flex gap-4 mt-5">

          <TraspasoEntreCuentas />
          <TransactionForm />
        </div>
      </div>
    </div>
  )
}

