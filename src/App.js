import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Componente1 from "./component/Componente1";
import Componente2 from "./component/Componente2";

function App() {
 const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarComponente, setMostrarComponente] = useState(1); // 👈 controla qué componente ver

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/productos");
        setProductos(res.data);
      } catch (err) {
        setError("No se pudo conectar con la API 😥");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // 👇 función para alternar entre Componente1 y Componente2
  const cambiarComponente = () => {
    setMostrarComponente((prev) => (prev === 1 ? 2 : 1));
  };


  return (
     <div>
      <h1>Mi Aplicación React</h1>

      {/* 🔹 Botón para cambiar de componente */}
      <button onClick={cambiarComponente}>
        Cambiar a {mostrarComponente === 1 ? "Componente 2" : "Componente 1"}
      </button>

      {/* 🔹 Solo se muestra uno de los dos */}
      {mostrarComponente === 1 ? <Componente1 /> : <Componente2 />}

      {/* 🔹 Sección de productos con manejo de API */}
      <section>
        <h2>Lista de productos</h2>
        {loading && <p>Cargando productos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <ul>
            {productos.map((p, index) => (
              <li key={index}>{p.nombre} - ${p.precio}</li>
            ))}
          </ul>
        )}
      </section>
    </div> 
  );
}

export default App;
