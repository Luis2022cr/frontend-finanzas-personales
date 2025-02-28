import { useState } from "react"
import {  Trash2, Edit, Save, X, ArrowUp, ArrowDown, ImageIcon } from "lucide-react"
import TransactionFilter from "./TransactionFilter";

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

export default function TransactionTable() {
  // State for bank accounts
  const [accounts, setAccounts] = useState<BankAccount[]>([
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
  const [transactions, setTransactions] = useState<Transaction[]>([
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


  // Edit states
  const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  // Filter states
  const [filter, setFilter] = useState({
    type: "all",
    bankAccountId: "all",
    searchTerm: "",
  })

  // Handle image upload
  const handleImageUpload = (file: File, callback: (dataUrl: string) => void) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      callback(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // Delete transaction
  const handleDeleteTransaction = (id: string) => {
    const transaction = transactions.find((t) => t.id === id)
    if (!transaction) return

    // Update bank account balance
    const updatedAccounts = accounts.map((account) => {
      if (account.id === transaction.bankAccountId) {
        const balanceChange = transaction.type === "income" ? -transaction.amount : transaction.amount
        return {
          ...account,
          balance: account.balance + balanceChange,
        }
      }
      return account
    })

    setAccounts(updatedAccounts)
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  // Start editing transaction
  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransactionId(transaction.id)
    setEditingTransaction({ ...transaction })
  }

  // Save edited transaction
  const handleSaveTransaction = () => {
    if (!editingTransaction) return

    // Calculate balance change for the bank account
    const originalTransaction = transactions.find((t) => t.id === editingTransactionId)
    if (!originalTransaction) return

    // Calculate the net effect on the bank account balance
    let balanceChange = 0

    // If bank account changed, we need to update both accounts
    if (originalTransaction.bankAccountId !== editingTransaction.bankAccountId) {
      // Reverse the effect on the original account
      if (originalTransaction.type === "income") {
        balanceChange -= originalTransaction.amount
      } else {
        balanceChange += originalTransaction.amount
      }

      // Apply the effect to the new account
      const updatedAccounts = accounts.map((account) => {
        if (account.id === originalTransaction.bankAccountId) {
          return {
            ...account,
            balance: account.balance + balanceChange,
          }
        } else if (account.id === editingTransaction.bankAccountId) {
          const newBalanceChange =
            editingTransaction.type === "income" ? editingTransaction.amount : -editingTransaction.amount
          return {
            ...account,
            balance: account.balance + newBalanceChange,
          }
        }
        return account
      })

      setAccounts(updatedAccounts)
    } else {
      // Same account, just calculate the difference
      if (originalTransaction.type === "income") {
        balanceChange -= originalTransaction.amount
      } else {
        balanceChange += originalTransaction.amount
      }

      if (editingTransaction.type === "income") {
        balanceChange += editingTransaction.amount
      } else {
        balanceChange -= editingTransaction.amount
      }

      const updatedAccounts = accounts.map((account) => {
        if (account.id === originalTransaction.bankAccountId) {
          return {
            ...account,
            balance: account.balance + balanceChange,
          }
        }
        return account
      })

      setAccounts(updatedAccounts)
    }

    // Update the transaction
    setTransactions(transactions.map((t) => (t.id === editingTransactionId ? editingTransaction : t)))

    // Reset editing state
    setEditingTransactionId(null)
    setEditingTransaction(null)
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTransactionId(null)
    setEditingTransaction(null)
  }

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = filter.type === "all" || transaction.type === filter.type
    const matchesAccount = filter.bankAccountId === "all" || transaction.bankAccountId === filter.bankAccountId
    const matchesSearch = transaction.description.toLowerCase().includes(filter.searchTerm.toLowerCase())
    return matchesType && matchesAccount && matchesSearch
  })

  return (
    <>
    
        {/* Filters */}
        <TransactionFilter filter={filter} setFilter={setFilter} accounts={accounts} />

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
                      {editingTransactionId === transaction.id ? (
                        // Editing mode
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="date"
                              value={editingTransaction?.date || ""}
                              onChange={(e) =>
                                setEditingTransaction((prev) => (prev ? { ...prev, date: e.target.value } : null))
                              }
                              className="w-full px-2 py-1 border border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 bg-indigo-900/30 text-white"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={editingTransaction?.description || ""}
                              onChange={(e) =>
                                setEditingTransaction((prev) =>
                                  prev ? { ...prev, description: e.target.value } : null,
                                )
                              }
                              className="w-full px-2 py-1 border border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 bg-indigo-900/30 text-white"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={editingTransaction?.bankAccountId || ""}
                              onChange={(e) =>
                                setEditingTransaction((prev) =>
                                  prev ? { ...prev, bankAccountId: e.target.value } : null,
                                )
                              }
                              className="w-full px-2 py-1 border border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 bg-indigo-900/30 text-white"
                            >
                              {accounts.map((account) => (
                                <option key={account.id} value={account.id}>
                                  {account.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={editingTransaction?.type || "expense"}
                              onChange={(e) =>
                                setEditingTransaction((prev) =>
                                  prev ? { ...prev, type: e.target.value as TransactionType } : null,
                                )
                              }
                              className="w-full px-2 py-1 border border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 bg-indigo-900/30 text-white"
                            >
                              <option value="expense">Gasto</option>
                              <option value="income">Ingreso</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              value={editingTransaction?.amount || 0}
                              onChange={(e) =>
                                setEditingTransaction((prev) =>
                                  prev ? { ...prev, amount: Number.parseFloat(e.target.value) || 0 } : null,
                                )
                              }
                              className="w-full px-2 py-1 border border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 bg-indigo-900/30 text-white"
                              min="0"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  handleImageUpload(file, (dataUrl) => {
                                    setEditingTransaction((prev) => (prev ? { ...prev, receiptImage: dataUrl } : null))
                                  })
                                }
                              }}
                              className="w-full px-2 py-1 border border-indigo-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500 bg-indigo-900/30 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={handleSaveTransaction} className="text-cyan-400 hover:text-cyan-300 mr-3">
                              <Save size={18} />
                            </button>
                            <button onClick={handleCancelEdit} className="text-pink-400 hover:text-pink-300">
                              <X size={18} />
                            </button>
                          </td>
                        </>
                      ) : (
                        // View mode
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(transaction.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{transaction.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {accounts.find((a) => a.id === transaction.bankAccountId)?.name || "Cuenta desconocida"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                transaction.type === "income"
                                  ? "bg-cyan-900 text-cyan-300 border border-cyan-500"
                                  : "bg-pink-900 text-pink-300 border border-pink-500"
                              }`}
                            >
                              {transaction.type === "income" ? (
                                <ArrowUp size={12} className="mr-1" />
                              ) : (
                                <ArrowDown size={12} className="mr-1" />
                              )}
                              {transaction.type === "income" ? "Ingreso" : "Gasto"}
                            </span>
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap font-medium ${
                              transaction.type === "income" ? "text-cyan-400" : "text-pink-400"
                            }`}
                          >
                            ${transaction.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {transaction.receiptImage ? (
                              <a
                                href={transaction.receiptImage}
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
                              onClick={() => handleEditTransaction(transaction)}
                              className="text-indigo-400 hover:text-cyan-300 transition-colors mr-3"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteTransaction(transaction.id)}
                              className="text-indigo-400 hover:text-pink-300 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </>
                      )}
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

