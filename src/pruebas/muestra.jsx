import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductoForm() {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    categoriaid: '',  // Cambiado a 'categoria_id'
    descripcion: '',
    precio: '',
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/categoria/");
        setCategorias(response.data);
      } catch (error) {
        console.error('Error fetching categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
        const dataToSend = {
            ...formData,
            categoriaid: parseInt(formData.categoriaid, 10),
          };

        const response = await axios.post("http://localhost:8000/api/v1/producto/", dataToSend);
        console.log('Producto creado:', response.data);

      // Limpiar el formulario después de la creación exitosa
        setFormData({
          categoriaid: '',  // Cambiado a 'categoria_id'
          descripcion: '',
          precio: '',
      });
    } catch (error) {
      console.error('Error creando producto:', error);
      
      // Imprimir detalles específicos del error
      if (error.response) {
        console.log('Detalles del error:', error.response.data);
      } else if (error.request) {
        console.log('Error en la solicitud:', error.request);
      } else {
        console.log('Error general:', error.message);
      }
    }
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <label htmlFor="categoriaid">Selecciona una categoría:</label>
        <select name="categoriaid" value={formData.categoriaid} onChange={handleChange}>
          <option value="">Seleccione...</option>
          {categorias.map((categoriaid) => (
            <option key={categoriaid.id} value={categoriaid.id}>
              {categoriaid.nombre}
            </option>
          ))}
        </select>

        <br />

        <textarea
          rows={3}
          placeholder="Descripción del producto"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        ></textarea>

        <br />

        <input
          type="text"
          placeholder="Precio producto"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
        />

        <br />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}