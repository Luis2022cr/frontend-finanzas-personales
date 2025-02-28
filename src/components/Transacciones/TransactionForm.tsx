import { useState, useRef, Fragment } from "react"
import { PlusCircle, X } from "lucide-react"
import { Dialog, Transition } from "@headlessui/react"

// Types
type TransactionType = "income" | "expense"
type Transaction = {
  id: string
  amount: number
  description: string
  type: TransactionType
  date: string
  bankAccountId: string
  receiptImage?: string
}

type BankAccount = {
  id: string
  name: string
  balance: number
  accountNumber: string
  image?: string
}

export default function TransactionForm() {
  const [accounts] = useState<BankAccount[]>([
    {
      id: "1",
      name: "Cuenta Principal",
      balance: 5000,
      accountNumber: "1234-5678-9012-3456",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Ahorros",
      balance: 10000,
      accountNumber: "9876-5432-1098-7654",
      image: "/placeholder.svg?height=100&width=100",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>({
    amount: 0,
    description: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
    bankAccountId: "1",
    receiptImage: ""
  })

  const transactionReceiptInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setNewTransaction((prev) => ({ ...prev, receiptImage: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
     <button
  onClick={() => setIsModalOpen(true)}
  className="w-full sm:w-auto flex items-center gap-2 md:px-6 md:py-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
>
  <PlusCircle size={18} />
  <span className="text-xs md:text-base">Registrar Transacción</span>
</button>

<Transition appear show={isModalOpen} as={Fragment}>
  <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
    <div className="fixed inset-0 bg-black bg-opacity-30" />
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel className="relative bg-gradient-to-r from-indigo-800 to-purple-800 rounded-lg shadow-lg p-6 w-full max-w-lg md:max-w-xl">
        
        {/* Botón de cierre en la parte superior derecha */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-white hover:text-gray-300 transition"
        >
          <X size={20} />
        </button>

        <Dialog.Title className="text-lg font-semibold text-white mb-4">
          Registrar Nueva Transacción
        </Dialog.Title>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Descripción</label>
            <input
              type="text"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
              placeholder="Ej: Compras supermercado"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Monto</label>
            <input
              type="number"
              value={newTransaction.amount || ""}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, amount: Number.parseFloat(e.target.value) || 0 })
              }
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
              placeholder="0.00"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Fecha</label>
            <input
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Recibo (opcional)</label>
            <input
              type="file"
              accept="image/*"
              ref={transactionReceiptInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Cuenta de Origen</label>
            <select
              value={newTransaction.bankAccountId}
              onChange={(e) => setNewTransaction({ ...newTransaction, bankAccountId: e.target.value })}
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>{account.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Tipo de Transacción</label>
            <select
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as TransactionType })}
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
            >
              <option value="expense">Gasto</option>
              <option value="income">Ingreso</option>
            </select>
          </div>
        </div>
          <button className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md hover:from-pink-600 hover:to-purple-700">
              Agregar Cuenta
            </button>
      </Dialog.Panel>
    </div>
  </Dialog>
</Transition>

    </>
  )
}
