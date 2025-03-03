import { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import DebtForm from "./formDeudas";

type Deuda = {
    id: string;
    descripcion: string;
    monto: number;
    estado: "pendiente" | "pagado";
};

type Cuenta = {
    id: string;
    nombre: string;
};

export default function DebtList() {
    const [debts, setDebts] = useState<Deuda[]>([]);
    const [accounts, setAccounts] = useState<Cuenta[]>([]);
    
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState("");
    const [debtToPay, setDebtToPay] = useState<Deuda | null>(null);

    useEffect(() => {
        axiosInstance.get("/deudas").then((res) => setDebts(res.data));
        axiosInstance.get("/cuentas").then((res) => setAccounts(res.data));
    }, []);

    const openModal = (debt: Deuda) => {
        setDebtToPay(debt);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setDebtToPay(null);
        setSelectedAccount("");
    };

    const handlePayDebt = async () => {
        if (!selectedAccount || !debtToPay) {
            alert("Selecciona una cuenta para pagar");
            return;
        }

        try {
            await axiosInstance.post("/pagar-deudas", { deuda_id: debtToPay.id, cuenta_id: selectedAccount });
            alert("Deuda pagada correctamente");

            // Actualizar estado localmente
            setDebts(debts.map(d => d.id === debtToPay.id ? { ...d, estado: "pagado" } : d));
            
            closeModal();
            window.location.reload(); // Recargar la página después de enviar el formulario
        } catch (error) {
            alert("Error al pagar la deuda");
        }
    };

    return (
        <div className="max-w-3xl mt-10 mx-auto bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-950 p-6 rounded-2xl shadow-lg">
            <DebtForm />

            {/* Deudas pendientes */}
            <h2 className="text-2xl font-semibold text-indigo-200 text-center mt-6 mb-4">
                Deudas
            </h2>

            <h3 className="text-lg font-semibold text-red-300 mt-6">🔴 Deudas Pendientes</h3>
            <ul className="mt-4 space-y-3">
                {debts.filter(debt => debt.estado === "pendiente").map((debt) => (
                    <li
                        key={debt.id}
                        className="flex justify-between items-center bg-indigo-100 p-3 rounded-lg shadow-sm border border-indigo-300"
                    >
                        <span className="text-indigo-700">
                            {debt.descripcion} -{" "}
                            <span className="font-semibold text-red-500">L. {debt.monto}</span>
                        </span>

                        <button
                            onClick={() => openModal(debt)}
                            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                        >
                            Pagar
                        </button>
                    </li>
                ))}
            </ul>

            {/* Deudas pagadas */}
            <h3 className="text-lg font-semibold text-green-300 mt-6">🟢 Deudas Pagadas</h3>
            <ul className="mt-4 space-y-3">
                {debts.filter(debt => debt.estado === "pagado").map((debt) => (
                    <li
                        key={debt.id}
                        className="flex justify-between items-center bg-gray-200 p-3 rounded-lg shadow-sm border border-gray-400 opacity-75"
                    >
                        <span className="text-gray-600">
                            {debt.descripcion} -{" "}
                            <span className="font-semibold text-gray-500">L.{debt.monto}</span>
                        </span>
                        <span className="text-green-600 font-semibold">Pagado</span>
                    </li>
                ))}
            </ul>

            {/* MODAL PARA SELECCIONAR CUENTA */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold text-indigo-700 text-center mb-4">
                            Confirmar Pago
                        </h2>

                        <p className="text-gray-700 text-center mb-4">
                            ¿Deseas pagar <span className="font-bold">L. {debtToPay?.monto}</span> por <span className="font-bold">{debtToPay?.descripcion}</span>?
                        </p>

                        <select
                            onChange={(e) => setSelectedAccount(e.target.value)}
                            className="w-full p-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                        >
                            <option value="">Selecciona una cuenta</option>
                            {accounts.map((account) => (
                                <option key={account.id} value={account.id}>
                                    {account.nombre}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className="bg-gray-400 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-500 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handlePayDebt}
                                className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                            >
                                Confirmar Pago
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
