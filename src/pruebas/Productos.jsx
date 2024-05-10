import { useEffect, useState } from "react";
import { ApiWebURL } from "../util";
// Ruta del api de django

function Productos() {

    const [listaProductos, setListaProductos] = useState([]);
    const [listaproductoFiltrado, setlistaproductoFiltrado] = useState([]);
    const [cargandoProductos, setCargandoProductos] = useState(true);
    const [productoBuscar, setProductoBuscar]= useState("");
    const [columnaBuscar, setColumnaBuscar] = useState("descripcion");


    useEffect( ()  => {
        leerServicioApi();
    }, []);

    const leerServicioApi = async () => {
        const rutaApi = ApiWebURL + 'productos';
        const response = await fetch(rutaApi);
        const data = await response.json();
        setListaProductos(data);
        setlistaproductoFiltrado(data);
        setCargandoProductos(false);

    };

    // Funcion para mostrar la tabla
    const mostrarTablas = () => {
        return (
            <table className="table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Precio</th>                    
                </tr>
              </thead>
              <tbody>  
                {listaProductos.map((data) => (
                    <tr key={data.codigo}>
                      <td>{data.codigo}</td>
                      <td>{data.descripcion}</td>
                      <td>{data.precio}</td>
                    </tr>
                ) )}
              </tbody>
            </table>
          );
    };

    

    const buscarProducto = (event) => {
      const textoB = event.target.value;
      setProductoBuscar(textoB);
    
      // Filtrar la lista de productos por descripción
      const resultado = listaProductos.filter((data) =>
        data[columnaBuscar].toUpperCase().includes(textoB.toUpperCase())
      );
    
      // Actualizar la lista de productos filtrados
      setListaProductos(resultado);
    };


    return (
        <section className="padded">
          <div className="container">
            <h2>Productos</h2>
            <div className="mb-3">
              <input
              type="text"
              value={productoBuscar}
              onChange={buscarProducto}
              className="form-control"
              placeholder="Producto buscar por descripción"
              />
            </div>
            {cargandoProductos ? (
              <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              mostrarTablas()
            )}
          </div>
        </section>
      );

}

export default Productos;