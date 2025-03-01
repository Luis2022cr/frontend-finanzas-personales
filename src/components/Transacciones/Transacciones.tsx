
import TransactionForm from "./TransactionForm"
import TransactionTable from "./TransactionTable"
import TraspasoEntreCuentas from "./transferenciaEntreCuentas"

export default function Trasacciones() {

  return (
    <>

      {/* Transactions Section */}
      <section>
        <div className="grid grid-col-3 md:flex justify-between items-center mb-4 gap-2 ">
          <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 md:mb-4">
            Transacciones
          </h2>
          <TraspasoEntreCuentas/>
          <TransactionForm />
        </div>
        <TransactionTable />
      </section>
    </>
  )
}

