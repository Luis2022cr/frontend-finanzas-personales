import { useState, Fragment } from "react";
import { PlusCircle, X } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import axiosInstance from "@/api/axiosInstance";
import { ObtenerCuentas } from "@/api/servicios/cuentas";
import Loading_Artifys from "../Loading_artifys";

// Definición del tipo de transferencia
type TransferData = {
  monto: number;
  descripcion: string;
  fecha: string;
  cuenta_origen: string;
  cuenta_destino: string;
};

export default function TraspasoEntreCuentas() {
  const [{ data: cuentas, loading: loadingcuentas }] = ObtenerCuentas();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTransfer, setNewTransfer] = useState<TransferData>({
    monto: 0,
    descripcion: "",
    fecha: new Date().toISOString().split("T")[0],
    cuenta_origen: "",
    cuenta_destino: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!newTransfer.monto || !newTransfer.descripcion || !newTransfer.fecha || !newTransfer.cuenta_origen || !newTransfer.cuenta_destino) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    if (newTransfer.cuenta_origen === newTransfer.cuenta_destino) {
      alert("La cuenta de origen y destino no pueden ser la misma.");
      return;
    }

    setIsLoading(true);

    try {
      await axiosInstance.post("/traspaso-de-fondos", newTransfer);
      alert("Transferencia realizada exitosamente");
      setIsModalOpen(false);
      setNewTransfer({
        monto: 0,
        descripcion: "",
        fecha: new Date().toISOString().split("T")[0],
        cuenta_origen: "",
        cuenta_destino: "",
      });
      window.location.reload(); // Recargar la página después de enviar el formulario
    } catch (error) {
      console.error("Error al realizar la transferencia:", error);
      alert("Hubo un error al realizar la transferencia");
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingcuentas) return <Loading_Artifys />;
  if (!cuentas) return <div>No se encontraron cuentas.</div>;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full sm:w-auto flex items-center gap-2 md:px-6 md:py-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-md hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
      >
        <PlusCircle size={18} />
        <span className="text-xs md:text-base">Realizar Transferencia</span>
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

              <Dialog.Title className="text-lg font-semibold text-white mb-4">Realizar Transferencia</Dialog.Title>

              {/* Formulario de la transferencia */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Descripción</label>
                  <input
                    type="text"
                    value={newTransfer.descripcion}
                    onChange={(e) => setNewTransfer({ ...newTransfer, descripcion: e.target.value })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-indigo-900/30 text-white"
                    placeholder="Ej: Pago de renta"
                  />
                </div>
                {/* Monto */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Monto</label>
                  <input
                    type="number"
                    value={newTransfer.monto || ""}
                    onChange={(e) => setNewTransfer({ ...newTransfer, monto: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-indigo-900/30 text-white"
                    placeholder="0.00"
                    min="0"
                  />
                </div>
                {/* Fecha */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Fecha</label>
                  <input
                    type="date"
                    value={newTransfer.fecha}
                    onChange={(e) => setNewTransfer({ ...newTransfer, fecha: e.target.value })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-indigo-900/30 text-white"
                  />
                </div>
                {/* Cuenta de Origen */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Cuenta de Origen</label>
                  <select
                    value={newTransfer.cuenta_origen}
                    onChange={(e) => setNewTransfer({ ...newTransfer, cuenta_origen: e.target.value })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-indigo-900/30 text-white"
                  >
                    <option value="">Seleccione una cuenta</option>
                    {cuentas.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Cuenta de Destino */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Cuenta de Destino</label>
                  <select
                    value={newTransfer.cuenta_destino}
                    onChange={(e) => setNewTransfer({ ...newTransfer, cuenta_destino: e.target.value })}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-indigo-900/30 text-white"
                  >
                    <option value="">Seleccione una cuenta</option>
                    {cuentas.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className={`w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Realizar Transferencia"}
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
