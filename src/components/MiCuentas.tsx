import { useState, ChangeEvent } from "react";
import { PlusCircle, Trash2, CreditCard, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import Loading_Artifys from "./Loading_artifys";
import { ObtenerCuentas } from "@/api/servicios/cuentas";
import axiosInstance from "@/api/axiosInstance";

type Bankcuenta = {
  name: string;
  balance: number;
  cuentaNumber: string;
  image?: string;
};

export default function Micuenta() {
  const [{ data: cuentas, loading: loadingcuentas }] = ObtenerCuentas();
  
  const [newcuenta, setNewcuenta] = useState<Bankcuenta>({ name: "", balance: 0, cuentaNumber: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagen, setImagen] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);  // Estado para manejar el loading del botón

  const handleAddcuenta = async () => {
    if (!newcuenta.name || newcuenta.balance < 0 || !newcuenta.cuentaNumber || !imagen) {
      alert("Por favor ingresa un nombre, número de cuenta y un saldo válido");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", newcuenta.name);
    formData.append("saldo", newcuenta.balance.toString());
    formData.append("numero_cuenta", newcuenta.cuentaNumber);
    formData.append("file", imagen);

    setIsLoading(true); // Activar el loading cuando inicie el proceso

    try {
      // Enviar la solicitud a la API para crear la cuenta
      await axiosInstance.post("/cuentas", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Cuenta creada exitosamente");
      setNewcuenta({ name: "", balance: 0, cuentaNumber: "" });
      setIsModalOpen(false);
      window.location.reload(); // Recargar la página después de enviar el formulario
    } catch (error) {
      console.error("Error al crear la cuenta:", error);
      alert("Hubo un error al crear la cuenta");
    } finally {
      setIsLoading(false); // Desactivar el loading una vez finalice el proceso
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImagen(file);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Número de cuenta copiado al portapapeles");
  };

  if (loadingcuentas) return <Loading_Artifys />;
  if (!cuentas) return <div>No se encontraron productos.</div>;

  return (
    <>
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">Mis Cuentas</h2>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md flex items-center shadow-lg">
            <PlusCircle size={18} className="mr-2" /> 
            <span className="text-xs md:text-base"> Agregar Cuenta </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cuentas.map((cuenta) => (
            <div key={cuenta.id} className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-5 border-l-4 border-cyan-400 transform hover:scale-105">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {cuenta.imagen && <img src={cuenta.imagen} alt={cuenta.nombre} className="w-12 h-12 rounded-full mr-3 object-cover" />}
                  <div>
                    <h3 className="font-semibold text-lg text-white">{cuenta.nombre}</h3>
                    <div className="flex items-center mt-1 mb-2">
                      <p className="text-sm text-cyan-200 mr-2">{cuenta.numero_cuenta}</p>
                      <button onClick={() => copyToClipboard(cuenta.numero_cuenta)} className="text-cyan-200 hover:text-white">
                        <CreditCard size={14} />
                      </button>
                    </div>
                    <p className="text-2xl font-bold text-white mt-2">L. {cuenta.saldo.toLocaleString()}</p>
                  </div>
                </div>
                <button className="text-indigo-200 hover:text-red-300">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal para agregar cuenta */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 rounded-lg shadow-lg w-96 relative">
          <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-white">
            <X size={18} />
          </button>
          <h3 className="text-lg font-semibold text-white mb-4">Agregar Nueva Cuenta</h3>
          <div className="space-y-4">
            <input type="text" placeholder="Nombre" value={newcuenta.name} onChange={(e) => setNewcuenta({ ...newcuenta, name: e.target.value })} className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white" />
            <input type="text" placeholder="Número de Cuenta" value={newcuenta.cuentaNumber} onChange={(e) => setNewcuenta({ ...newcuenta, cuentaNumber: e.target.value })} className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white" />
            <input type="number" placeholder="Saldo Inicial" value={newcuenta.balance} onChange={(e) => setNewcuenta({ ...newcuenta, balance: Number(e.target.value) })} className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-indigo-900/30 text-white" />
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full px-4 py-2 text-white file:bg-pink-500 file:text-white file:rounded-md" />
            <button 
              onClick={handleAddcuenta} 
              className={`w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md hover:from-pink-600 hover:to-purple-700 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoading} // Deshabilitar el botón mientras esté cargando
            >
              {isLoading ? "Cargando..." : "Agregar Cuenta"} {/* Mostrar "Cargando..." mientras se envía */}
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
