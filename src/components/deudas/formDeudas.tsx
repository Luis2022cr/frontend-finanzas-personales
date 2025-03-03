import { useState } from "react";
import axiosInstance from "@/api/axiosInstance";

export default function DebtForm() {
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async () => {
        if (!amount || !description) {
            alert("Por favor completa todos los campos");
            return;
        }

        try {
            await axiosInstance.post("/crear-deudas", { monto: amount, descripcion: description });
            alert("Deuda registrada correctamente");
            setAmount(0);
            setDescription("");
            setIsOpen(false); // Cierra el modal después de guardar
            window.location.reload(); // Recargar la página después de enviar el formulario

        } catch (error) {
            alert("Error al registrar la deuda");
        }
    };

    return (
        <div>
            {/* Botón para abrir el modal */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-all"
            >
                Registrar Deuda
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)} // Cierra al hacer clic fuera
                >
                    <div
                        className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-300 w-1/2"
                        onClick={(e) => e.stopPropagation()} // Evita cierre al hacer clic dentro
                    >
                        <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
                            Registrar Deuda
                        </h2>

                        <form className="grid grid-cols-3 gap-4">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                                placeholder="Monto"
                                className="w-full p-3 border  border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Descripción"
                                className="w-full p-3 border col-span-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </form>

                        {/* Botones de acción */}
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition-all"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
