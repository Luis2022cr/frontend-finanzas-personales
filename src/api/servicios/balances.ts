import  { useAxios } from "../axiosInstance";

export interface Balances {
    balance_total: number;
    total_ingresos: number;
    total_gastos: number;
}

export const ObtenerBalanceIngresosyGastos = () => {
    const response = useAxios<Balances>({
        url: `/balance-ingresos-y-gastos`,
    }, {
        useCache: false,
    });
    return response;
}; 