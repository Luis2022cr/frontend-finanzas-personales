
import TransactionForm from "./TransactionForm"
import TransactionTable from "./TransactionTable"

export default function Trasacciones() {

  return (
    <>

      {/* Transactions Section */}
      <section>
        <div className="flex justify-between items-center mb-4 gap-2 ">
          <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-4">
            Transacciones
          </h2>
          <TransactionForm />
        </div>
        <TransactionTable />
      </section>
    </>
  )
}

