import { useAxios } from "../axiosInstance";

export interface Deudas {
    id: string;
    fecha: string;
    balance_final: number;
    pnl_dia: number;
  }
  

export const ObtenerDeudas = () => {
 const response = useAxios<Deudas[]>({
       url: `/deudas`,
   }, {
       useCache: false,
   });
   return response;
};
