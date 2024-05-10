import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

 export default function Producto() {
  
  // Para el listado de producto
  const [listaProductos, setListaProductos] = useState([]);
  const [listaProductosFiltrado, setListaProductosFiltrado] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [ascendente, setAscendente] = useState(1);
  const [columnaAnterior, setColumnaAnterior] = useState("descripcion");
  const [textoBuscar, setTextoBuscar] = useState("");
  const [pagina, setPagina] = useState(0);
  const [filasPagina] = useState(5);
  const [numPaginas, setNumPaginas] = useState(0);

  useEffect(() => {
    leerApi();
  }, []);

  const leerApi = async () => {
    const rutaApi = "http://localhost:8000/api/v1/producto/";
    const response = await fetch(rutaApi);
    const producto = await response.json();
    setListaProductos(producto);
    setListaProductosFiltrado(producto);
    setCargando(false);
    setNumPaginas(Math.ceil(producto.length / filasPagina));
  };

  const MostrarTabla = () => {
    return (
      <table className="table">
        <thead>
          <Link to="/registro">
          <button className="btn btn-info">Registrar</button>
          </Link>
          <tr>
            <th>
              CODIGO
            </th>
            <th>
              DESCRIPCION
            </th>
            <th>
              PRECIO
            </th>
            <th>
              CATEGORIA
            </th>
          </tr>
        </thead>
        <tbody>
          {listaProductosFiltrado
            .slice(pagina * filasPagina, (pagina + 1) * filasPagina)
            .map((producto) => (
              <tr key={producto.codigo}>
                <td className="table-info">{producto.codigo}</td>
                <td className="table-info">{producto.descripcion}</td>
                <td className="table-info">{producto.precio}</td>
                <td className="table-info">{producto.categoria_nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  const buscarProducto = (event) => {
    const textoB = event.target.value;
    setTextoBuscar(textoB);
    const resultado = listaProductos.filter((producto) =>
      producto[columnaAnterior].toUpperCase().includes(textoB.toUpperCase())
    );
    setListaProductosFiltrado(resultado);
  };

  const avanzar = () => {
    if (pagina < numPaginas - 1) {
      setPagina(pagina + 1);
    }
  };

  const retroceder = () => {
    if (pagina > 0) {
      setPagina(pagina - 1);
    }
  };

  const generarPaginacion = () => {
    const items = [];
    for (let i = 0; i < numPaginas; i++) {
      items.push(
        <li
          key={i}
          className={`page-item ${pagina === i ? "active" : ""}`}
          aria-current={pagina === i ? "page" : null}
        >
          <button className="page-link" onClick={() => setPagina(i)}>
            {i + 1}
          </button>
        </li>
      );
    }
    return items;
  };

  return (
    <section className="">
      <div className="container">
        <h2 className="text-start text-capitalize">productos</h2>
        <div className="mb-3">
          <input
            type="text"
            value={textoBuscar}
            onChange={buscarProducto}
            className="form-control"
            placeholder="Buscar producto por descripcion"
          />
        </div>
        {cargando ? (
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          MostrarTabla()
        )}
        <nav aria-label="...">
          <ul className="pagination">
            <li className={`page-item ${pagina === 0 ? "disabled" : ""}`}>
              <button className="page-link" onClick={retroceder}>
                Previous
              </button>
            </li>
            {generarPaginacion()}
            <li
              className={`page-item ${
                pagina === numPaginas - 1 ? "disabled" : ""
              }`}
            >
              <button className="page-link" onClick={avanzar}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
