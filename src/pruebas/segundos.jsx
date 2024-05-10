import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { createProductoAhora } from "../util/api";
import axios from "axios";

export default function ProductoForm() {

    // Para el recojo de categorias
    const [listaCategorias, setListadCategorias] = useState([]);

    const {register, handleSubmit, formState: {
        errors
    }} = useForm();

    const onSubmit = handleSubmit( async (object) => {
       const res = await axios.post("http://localhost:8000/api/v1/producto/", object);
       //const res = await createProductoAhora(object);
       console.log(res)
       
    });

    // Inicializando el servicio
    useEffect(() => {
        leerApi();
    }, []);

    // Funcion para conectar Api
    const leerApi = async () => {
        const rutaApi = "http://localhost:8000/api/v1/categoria/";
        const response = await fetch(rutaApi);
        const categoria = await response.json();
        setListadCategorias(categoria);
    }

    return (
        <div className="container mt-3">
            <form onSubmit={onSubmit}>
                <textarea 
                rows={3} 
                placeholder="Descripcion del producto"
                {...register("descripcion", {required: true})}>
                </textarea>

                {errors.descripcion && <span>El campo es requerido</span>}

                <br></br>

                <input 
                type="text" 
                placeholder="Precio producto"
                {...register("precio", {required: true})}/>

                {errors.precio && <span>El campo es requerido</span>}

                <br></br>
                <label htmlFor="categoria" className="">
                    Selecciona una categoria:
                </label>
                <select {...register("categoriaid", {required: true})} id="categoriaid">
                    {listaCategorias.map((categoriaid) => (
                        <option key={categoriaid.id} value={categoriaid.id}>
                            {categoriaid.nombre}
                        </option>
                    ))}
                </select>
                {errors.categoria && <span>El campo es requerido</span>}
                <button>Guardar</button>
            </form>
        </div>
    );
}