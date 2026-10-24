import { pesos } from "./datos";

interface PiePaginaProps {
    piezas: number;
    total: number;
    onRealizarPedido: () => void;
    procesando: boolean;
}

export function PiePagina({ piezas, total, onRealizarPedido, procesando }: PiePaginaProps) {
    return (
        <footer className="pie">
            {}
            <div className="pie__info">
                <span className="pie__resumen">
                    {piezas === 0 ? "Tu carrito está vacío" : `${piezas} pieza(s) en el carrito`}
                </span>
                <span className="pie__total">{pesos.format(total)}</span>
            </div>
            
            {}
            {piezas > 0 && (
                <button 
                    className="pie__boton-pedido"
                    onClick={onRealizarPedido}
                    disabled={procesando}
                >
                    {procesando ? 'Procesando...' : 'Realizar Pedido'}
                </button>
            )}
        </footer>
    );
}