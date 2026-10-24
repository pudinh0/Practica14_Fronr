import { useEffect, useState } from "react";
import type { Producto } from "../datos";
import { traerProductos } from "../servicios/tienda";

export function useProductos() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [intento, setIntento] = useState(0);

    useEffect(() => {
        let vigente = true;

        setCargando(true);
        setError(null);

        traerProductos()
            .then((data) => {
                if (vigente) {
                    setProductos(data);
                }
            })
            .catch(() => {
                if (vigente) {
                    setError("Error al cargar los productos");
                }
            })
            .finally(() => {
                if (vigente) {
                    setCargando(false);
                }
            });

        return () => {
            vigente = false;
        };
    }, [intento]);

    function reintentar() {
        setCargando(true);
        setError(null);
        setIntento((prev) => prev + 1);
    }

    return { productos, cargando, error, reintentar };
}
