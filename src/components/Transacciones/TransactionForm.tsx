import { useState, useRef, Fragment, ChangeEvent } from "react"
import { PlusCircle, X } from "lucide-react"
import { Dialog, Transition } from "@headlessui/react"
import axiosInstance from "@/api/axiosInstance"
import { ObtenerCuentas } from "@/api/servicios/cuentas"
import Loading_Artifys from "../Loading_artifys"

// Types
type TransactionType = "ingresos" | "gastos"
type Transaction = {
  id: string
  amount: number
  description: string
  type: TransactionType
  date: string
  bankAccountId: string
  receiptImage?: string
}


export default function TransactionForm() {
    const [{ data: cuentas, loading: loadingcuentas }] = ObtenerCuentas();
  

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>({
    amount: 0,
    description: "",
    type: "gastos",
    date: new Date().toISOString().split("T")[0],
    bankAccountId: "1",
    receiptImage: ""
  })

  const [receiptImage, setReceiptImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const transactionReceiptInputRef = useRef<HTMLInputElement>(null)

  // Maneja la selección del archivo
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setReceiptImage(file)
  }

  const handleSubmit = async () => {
    if (!newTransaction.amount || !newTransaction.description || !newTransaction.date || !newTransaction.bankAccountId) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    const formData = new FormData()
    formData.append("monto", newTransaction.amount.toString())
    formData.append("descripcion", newTransaction.description)
    formData.append("tipo", newTransaction.type)
    formData.append("fecha", newTransaction.date)
    formData.append("cuenta_id", newTransaction.bankAccountId)
    if (receiptImage) {
      formData.append("file", receiptImage)
    }

    setIsLoading(true)

    try {
      await axiosInstance.post("/transacciones", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      alert("Transacción creada exitosamente")
      setIsModalOpen(false)
      setNewTransaction({
        amount: 0,
        description: "",
        type: "gastos",
        date: new Date().toISOString().split("T")[0],
        bankAccountId: "1",
        receiptImage: "",
      })
      setReceiptImage(null)
      window.location.reload(); // Recargar la página después de enviar el formulario

    } catch (error) {
      console.error("Error al crear la transacción:", error)
      alert("Hubo un error al crear la transacción")
    } finally {
      setIsLoading(false)
    }
  }
  if (loadingcuentas) return <Loading_Artifys />;
  if (!cuentas) return <div>No se encontraron productos.</div>;

  
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
              {/* Botón de cierre */}
              <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-white hover:text-gray-300 transition">
                <X size={20} />
              </button>

              <Dialog.Title className="text-lg font-semibold text-white mb-4">Registrar Nueva Transacción</Dialog.Title>

              {/* Formulario de la transacción */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Descripción */}
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
                {/* Monto */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Monto</label>
                  <input
                    type="number"
                    value={newTransaction.amount || ""}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
                    placeholder="0.00"
                    min="0"
                  />
                </div>
                {/* Fecha */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Fecha</label>
                  <input
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
                  />
                </div>
                {/* Recibo */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Recibo (opcional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={transactionReceiptInputRef}
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 text-white file:bg-pink-500 file:text-white file:rounded-md"
                  />
                </div>
                {/* Cuenta de Origen */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Cuenta de Origen</label>
                  <select
                    value={newTransaction.bankAccountId}
                    onChange={(e) => setNewTransaction({ ...newTransaction, bankAccountId: e.target.value })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
                  >
                    {cuentas.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Tipo de Transacción */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Tipo de Transacción</label>
                  <select
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as TransactionType })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white"
                  >
                    <option value="gastos">Gasto</option>
                    <option value="ingresos">Ingreso</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className={`w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md hover:from-pink-600 hover:to-purple-700 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Registrar Transacción"}
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
