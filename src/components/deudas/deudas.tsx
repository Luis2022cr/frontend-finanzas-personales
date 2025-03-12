import { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import DebtForm from "./formDeudas";

type Deuda = {
    id: string;
    descripcion: string;
    monto_original: number;
    monto_pendiente: number;
    estado: "pendiente" | "pagado";
};

type Cuenta = {
    id: string;
    nombre: string;
};

export default function DebtList() {
    const [debts, setDebts] = useState<Deuda[]>([]);
    const [accounts, setAccounts] = useState<Cuenta[]>([]);
    const [, setModalOpen] = useState(false);
    const [partialModalOpen, setPartialModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState("");
    const [debtToPay, setDebtToPay] = useState<Deuda | null>(null);
    const [paymentAmount, setPaymentAmount] = useState("");

    useEffect(() => {
        axiosInstance.get("/deudas").then((res) => setDebts(res.data));
        axiosInstance.get("/cuentas").then((res) => setAccounts(res.data));
    }, []);

    const openModal = (debt: Deuda, partial: boolean = false) => {
        setDebtToPay(debt);
        partial ? setPartialModalOpen(true) : setModalOpen(true);
    };

    const closeModals = () => {
        setModalOpen(false);
        setPartialModalOpen(false);
        setDebtToPay(null);
        setSelectedAccount("");
        setPaymentAmount("");
    };

    const handlePayDebt = async (partial: boolean = false) => {
        if (!selectedAccount || !debtToPay) {
            alert("Selecciona una cuenta para pagar");
            return;
        }

        if (partial && (!paymentAmount || Number(paymentAmount) <= 0)) {
            alert("Ingresa un monto válido para el pago parcial");
            return;
        }

        try {
            const endpoint = partial ? "/pagar-deudas-parcial" : "/pagar-deudas";
            const data = partial
                ? { deuda_id: debtToPay.id, cuenta_id: selectedAccount, monto_pago: Number(paymentAmount) }
                : { deuda_id: debtToPay.id, cuenta_id: selectedAccount };

            await axiosInstance.post(endpoint, data);
            alert("Pago realizado correctamente");
            window.location.reload();
        } catch (error) {
            alert("Error al procesar el pago");
        }
    };

    return (
        <div className="max-w-5xl mt-10 mx-auto bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-950 p-6 rounded-2xl shadow-lg">
            <DebtForm />

            <h2 className="text-2xl font-semibold text-indigo-200 text-center mt-6 mb-4">Deudas</h2>

            <h3 className="text-lg font-semibold text-red-300 mt-6">🔴 Deudas Pendientes</h3>
            <ul className="mt-4 space-y-3">
                {debts.filter(debt => debt.estado === "pendiente").map((debt) => (
                    <li key={debt.id} className="flex justify-between items-center bg-indigo-100 p-3 rounded-lg shadow-sm border border-indigo-300">
                        <span className="text-indigo-700 font-bold">
                            {debt.descripcion} <span className="font-semibold text-blue-800">(L. {debt.monto_original})</span>
                            <span className="font-semibold text-red-800"> - Pendiente: L. {debt.monto_pendiente}</span>
                        </span>
                        <div className="flex space-x-2">
                            {/* <button onClick={() => openModal(debt)} className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">Pagar</button> */}
                            <button onClick={() => openModal(debt, true)} className="bg-yellow-600 text-white px-3 py-1 rounded-lg hover:bg-yellow-700">Pago</button>
                        </div>
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
                            <span className="font-semibold text-gray-500">L.{debt.monto_original}</span>
                        </span>
                        <span className="text-green-600 font-semibold">Pagado</span>
                    </li>
                ))}
            </ul>

            {/* {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold text-indigo-700 text-center mb-4">Confirmar Pago</h2>

                        <p className="text-gray-700 text-center mb-4">
                            ¿Deseas pagar <span className="font-bold text-red-600">L. {debtToPay?.monto_pendiente}</span> por <span className="font-bold">{debtToPay?.descripcion}</span>?
                        </p>

                        <select onChange={(e) => setSelectedAccount(e.target.value)} className="w-full p-3 border border-indigo-300 rounded-lg mb-4">
                            <option value="">Selecciona una cuenta</option>
                            {accounts.map((account) => <option key={account.id} value={account.id}>{account.nombre}</option>)}
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button onClick={closeModals} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancelar</button>
                            <button onClick={() => handlePayDebt(false)} className="bg-green-600 text-white px-4 py-2 rounded-lg">Confirmar Pago</button>
                        </div>
                    </div>
                </div>
            )} */}

            {partialModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold text-indigo-700 text-center mb-4">Pago</h2>
                        
                        <p className="text-gray-700 text-center mb-4">
                            Saldo Pendiente: <span className="font-bold text-red-600">L. {debtToPay?.monto_pendiente}</span> por <span className="font-bold">{debtToPay?.descripcion}</span>
                        </p>

                        <input type="number" placeholder="Monto a pagar" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} className="w-full p-2 border border-indigo-300 rounded-lg mb-4" />
                        <select onChange={(e) => setSelectedAccount(e.target.value)} className="w-full p-3 border border-indigo-300 rounded-lg mb-4">
                            <option value="">Selecciona una cuenta</option>
                            {accounts.map((account) => <option key={account.id} value={account.id}>{account.nombre}</option>)}
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button onClick={closeModals} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancelar</button>
                            <button onClick={() => handlePayDebt(true)} className="bg-yellow-600 text-white px-4 py-2 rounded-lg">Pagar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

