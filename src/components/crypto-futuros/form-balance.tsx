import { useState, Fragment } from "react";
import { PlusCircle, X } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import axiosInstance from "@/api/axiosInstance";

type BalanceData = {
  balance_final: number;
};

export default function RegistrarBalanceDiario() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balanceData, setBalanceData] = useState<BalanceData>({
    balance_final: 0
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!balanceData.balance_final || balanceData.balance_final < 0) {
      alert("Por favor ingresa un balance válido.");
      return;
    }

    setIsLoading(true);

    try {
      await axiosInstance.post("/balance-diario-criypto", balanceData);
      alert("Balance diario registrado exitosamente");
      setIsModalOpen(false);
      setBalanceData({
        balance_final: 0
      });
      window.location.reload(); // Recargar la página después de enviar el formulario

    } catch (error) {
      console.error("Error al registrar el balance:", error);
      alert("Hubo un error al registrar el balance");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg"
      >
        <PlusCircle size={18} />
        <span>Registrar Balance Diario</span>
      </button>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-white hover:text-gray-300 transition">
                <X size={20} />
              </button>

              <Dialog.Title className="text-lg font-semibold text-white mb-4">Registrar Balance Diario</Dialog.Title>

              <div className="w-full grid grid-cols-1 gap-4 mb-4">
              
                {/* Balance Final */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Balance Final</label>
                  <input
                    type="number"
                    value={balanceData.balance_final || ""}
                    onChange={(e) => setBalanceData({ ...balanceData, balance_final: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    placeholder="0.00"
                    min="0"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className={`w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Guardando..." : "Registrar Balance"}
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
