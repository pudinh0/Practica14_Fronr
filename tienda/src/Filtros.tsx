interface FiltrosProps {
    categorias: string[];
    activa: String;
    onCambiar: (categoria: string) => void; // PROP DE SALIDA
}


export function Filtros({ categorias, activa, onCambiar }: FiltrosProps) {
    return (

        <nav className="filtros">
            {
                categorias.map((c) => (
                    <button
                        key={c}
                        className={c === activa ? 'filtros__boton filtros__boton--activo' : "filtros__boton"}
                        onClick={() => onCambiar(c)}
                    >
                        {c}
                    </button>
                ))
            }
        </nav>
    );
}