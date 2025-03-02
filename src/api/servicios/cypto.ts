import { useAxios } from "../axiosInstance";



export interface BalanceCripto {
    balance_total: number;
    pnl_diario: number;
  pnl_semanal: number;
  pnl_mensual: number;
  pnl_anual: number;
}

// Obtener el balance total
export const ObtenerBalanceCripto = () => {
  return useAxios<BalanceCripto>({ url: `/balance-criypto` }, { useCache: false });
};

export interface BalancesDiaCrypto {
  id: string;
  fecha: string;
  balance_final: number;
  pnl_dia: number;
}

export const TransaccionesPorDiaCripto = () => {
  const response = useAxios<BalancesDiaCrypto[]>({
      url: `/historial-balances-criypto`,
  }, {
      useCache: false,
  });
  return response;
}; 