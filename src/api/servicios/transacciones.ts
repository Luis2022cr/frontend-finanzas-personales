import { useAxios } from "../axiosInstance";

export interface Transacciones {
    id: string,
    monto: number,
    descripcion: string,
    tipo: string,
    fecha: string,
    cuenta_id: string,
    recibo: string,
    cuenta_nombre: string
}

export const ObtenerTransacciones = () => {
    const response = useAxios<Transacciones[]>({
        url: `/transacciones`,
    }, {
        useCache: false,
    });
    return response;
}; 