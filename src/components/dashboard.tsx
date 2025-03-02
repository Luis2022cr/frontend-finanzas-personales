import Finansas_bancos from "./finansas_bancos";
import Micuenta from "./MiCuentas";
import Trasacciones from "./Transacciones/Transacciones";


export default function FinanceTracker() {
  return (
    <div className=" bg-gradient-to-b from-gray-900 to-indigo-800 p-4 md:p-8 text-white">
    <Finansas_bancos/>
    <Micuenta/>
    <Trasacciones/>

    </div>
  )
}

