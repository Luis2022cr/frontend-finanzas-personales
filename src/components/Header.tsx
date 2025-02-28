import { useState } from "react"

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

export default function Header() {
  // State for bank accounts
  const [accounts, ] = useState<BankAccount[]>([
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

  // State for transactions
  const [transactions, ] = useState<Transaction[]>([
    {
      id: "1",
      amount: 1000,
      description: "Salario",
      type: "income",
      date: "2024-02-25",
      bankAccountId: "1",
    },
    {
      id: "2",
      amount: 200,
      description: "Compras supermercado",
      type: "expense",
      date: "2024-02-26",
      bankAccountId: "1",
      receiptImage: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      amount: 500,
      description: "Depósito ahorro",
      type: "income",
      date: "2024-02-27",
      bankAccountId: "2",
    },
  ])


  // Calculate total balance
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)


  return (
    <>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-2">
          Mi Control Financiero
        </h1>
        <div className="bg-gradient-to-r from-gray-800 to-indigo-900 rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between items-center border border-indigo-700">
          <div>
            <p className="text-indigo-300 mb-1">Balance Total</p>
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
              ${totalBalance.toLocaleString()}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-6">
            <div className="text-center">
              <p className="text-indigo-300 mb-1">Ingresos</p>
              <p className="text-xl font-semibold text-cyan-400">
                $
                {transactions
                  .filter((t) => t.type === "income")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-indigo-300 mb-1">Gastos</p>
              <p className="text-xl font-semibold text-pink-400">
                $
                {transactions
                  .filter((t) => t.type === "expense")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

