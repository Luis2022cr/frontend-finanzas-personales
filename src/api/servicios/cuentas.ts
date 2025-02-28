import { useAxios } from "../axiosInstance";

export interface Cuentas {
    id: string,
    nombre: string,
    saldo: number,
    numero_cuenta: string,
    imagen: string
}

export const ObtenerCuentas = () => {
    const response = useAxios<Cuentas[]>({
        url: `/cuentas`,
    }, {
        useCache: false,
    });
    return response;
}; 