import { ObtenerBalanceCripto, TransaccionesPorDiaCripto } from "@/api/servicios/cypto";
import Loading_Artifys from "../Loading_artifys";
import RegistrarBalanceDiario from "./form-balance";


export default function DashboardCripto() {
    // Cargar balance total
    const [{ data: balance, loading: loadingBalance }] = ObtenerBalanceCripto();
    const [{ data: balanceDia, loading: loadingBalanceDia }] = TransaccionesPorDiaCripto();

    if (loadingBalance || loadingBalanceDia) return <Loading_Artifys />;
    if (!balance || !balanceDia) return <div>No se encontraron datos.<RegistrarBalanceDiario /></div>;

    return (
        <>
            <div className="mb-8 bg-gradient-to-r from-gray-800 to-indigo-900 mt-5 p-4 ">
                <div className="grid grid-col-3 md:flex justify-between items-center mb-4 gap-2 mx-5">
                    <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 md:mb-4">
                        Dashboard Cripto
                    </h2>
                    <RegistrarBalanceDiario />
                </div>


                <div className="bg-gradient-to-r mb-10 from-gray-800 to-indigo-900 rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between items-center border border-indigo-700">
                    <div>
                        <p className="text-indigo-300 mb-1">Balance Total</p>
                        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-500">
                            ${balance.balance_total.toFixed(2)}
                        </p>
                        <p className="text-sm text-indigo-400">L. {(balance.balance_total * 24).toFixed(2)}</p>
                    </div>

                    <div className="mt-4 md:mt-0 flex gap-6">
                        {/* PNL Diario */}
                        <div className="text-center">
                            <p className="text-indigo-300 mb-1">PNL Diario</p>
                            <p className={`text-xl font-semibold ${balance.pnl_diario >= 0 ? "text-green-400" : "text-red-400"}`}>
                                ${balance.pnl_diario.toFixed(2)}
                            </p>
                            <p className="text-sm text-indigo-400">L. {(balance.pnl_diario * 24).toFixed(2)}</p>
                        </div>

                        {/* PNL Semanal */}
                        <div className="text-center">
                            <p className="text-indigo-300 mb-1">PNL Semanal</p>
                            <p className={`text-xl font-semibold ${balance.pnl_semanal >= 0 ? "text-green-400" : "text-red-400"}`}>
                                ${balance.pnl_semanal.toFixed(2)}
                            </p>
                            <p className="text-sm text-indigo-400">L. {(balance.pnl_semanal * 24).toFixed(2)}</p>
                        </div>

                        {/* PNL Mensual */}
                        <div className="text-center">
                            <p className="text-indigo-300 mb-1">PNL Mensual</p>
                            <p className={`text-xl font-semibold ${balance.pnl_mensual >= 0 ? "text-green-400" : "text-red-400"}`}>
                                ${balance.pnl_mensual.toFixed(2)}
                            </p>
                            <p className="text-sm text-indigo-400">L. {(balance.pnl_mensual * 24).toFixed(2)}</p>
                        </div>

                        {/* PNL Anual */}
                        <div className="text-center">
                            <p className="text-indigo-300 mb-1">PNL Anual</p>
                            <p className={`text-xl font-semibold ${balance.pnl_anual >= 0 ? "text-green-400" : "text-red-400"}`}>
                                ${balance.pnl_anual.toFixed(2)}
                            </p>
                            <p className="text-sm text-indigo-400">L. {(balance.pnl_anual * 24).toFixed(2)}</p>
                        </div>
                    </div>
                </div>


                <div className="rounded rounded-3xl overflow-x-auto bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950">
                    <table className="min-w-full table-auto border-collapse border border-gray-700">
                        <thead className="bg-indigo-800">
                            <tr>
                                <th className="border border-gray-900 px-4 py-2 text-indigo-200">Fecha</th>
                                <th className="border border-gray-900 px-4 py-2 text-indigo-200">Balance Final</th>
                                <th className="border border-gray-900 px-4 py-2 text-indigo-200">PNL Diario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {balanceDia.map((balance, index) => (
                                <tr key={index} className=" transition duration-200 hover:bg-indigo-700">
                                    <td className="border border-gray-900 px-4 py-2 text-center text-gray-300">{balance.fecha}</td>
                                    <td className="border border-gray-900 px-4 py-2 text-center text-green-400 font-bold">
                                        ${balance.balance_final.toFixed(2)}
                                    </td>
                                    <td className={`border border-gray-900 px-4 py-2 text-center font-bold ${balance.pnl_dia >= 0 ? "text-green-400" : "text-red-400"}`}>
                                        ${balance.pnl_dia.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
