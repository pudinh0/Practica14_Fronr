import { api } from "./api";
import type { Producto } from "../datos";

interface Sobre<T>{
    data: T;
}

export interface Pedido {
    correo: string;
    telefono: string;
    productos: string[]; 
}

export async function traerProductos(): Promise<Producto[]>{
    const respuesta = await api.get<Sobre<Producto[]>>("/productos");
    return respuesta.data.data; 
}

export async function crearPedido(pedido: Pedido): Promise<{folio: string, total: number}> {
    try {
        const response = await api.post<Sobre<{folio: string, total: number}>>("/pedidos", pedido);
        
        return response.data.data; 
    } catch (error) {
        throw new Error("No se pudo guardar el pedido");
    }
}