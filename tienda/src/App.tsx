import { useState } from 'react';
import { Catalogo } from './Catalogo';
import { Encabezado } from './Encabezado';
import { Layout } from './Layout';
import { PiePagina } from './PiePagina';
import { Filtros } from './Filtros';
import { useProductos } from './hooks/useProductos';
import type { Producto } from './datos';
import { MensajeError } from './MensajeError';
import { Cargando } from './Cargando';
import { crearPedido } from './servicios/tienda'; 

function App() {
  const { productos, cargando, error, reintentar } = useProductos();
  const [categoria, setCategoria] = useState('todas');
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [procesandoPedido, setProcesandoPedido] = useState(false);

  const categorias = ['todas', ...new Set(productos.map(p => p.categoria))];
  const productosvisibles = categoria === 'todas' ? productos : productos.filter((p) => p.categoria === categoria);
  const productosDisponibles = productosvisibles.filter((producto) => producto.existencia > 0).length;
  const total = carrito.reduce((suma, p) => suma + p.precio, 0);

  function agregar(producto: Producto) {
    setCarrito((anterior) => [...anterior, producto]);
  }

  async function handleRealizarPedido() {
    if (carrito.length === 0) return;
    
    setProcesandoPedido(true);
    try {
      const idsProductos = carrito.map(producto => producto.id);

      const nuevoPedido = {
        correo: "popusa@gmail.com",
        telefono: "1234567890",
        productos: idsProductos 
      };

      const resultado = await crearPedido(nuevoPedido);
      
      alert(`¡Pedido creado con éxito! Folio: ${resultado.folio}`);
      setCarrito([]); 
      reintentar();
    } catch (error) {
      alert("Hubo un error al intentar crear el pedido. Intenta nuevamente.");
      console.error(error);
    } finally {
      setProcesandoPedido(false);
    }
  }

  return (
    <Layout
      encabezado={<Encabezado piezas={carrito.length} />}
      pie={
        <PiePagina 
          piezas={carrito.length} 
          total={total} 
          onRealizarPedido={handleRealizarPedido}
          procesando={procesandoPedido}
        />
      }>
      <section className='portada'>
        <h1>Catalogo de temporada</h1>
        <p>{productosDisponibles} productos disponibles</p>
        {cargando && <Cargando/>}
        {error && <MensajeError mensaje={error} onReintentar={reintentar} />}
        {!cargando && !error && (
          <>
            <Filtros categorias={categorias} activa={categoria} onCambiar={setCategoria} />
            <Catalogo productos={productosvisibles} onAgregar={agregar} />
          </>
        )}
      </section>
    </Layout>
  );
}

export default App;