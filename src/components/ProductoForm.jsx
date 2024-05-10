import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function ProductoForm() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  // Para poder mostrar un breve mensaje
  const [registroCompl, setRegistroCompl] = useState(false);
  const [formData, setFormData] = useState({

    categoriaid: '',  
    descripcion: '',
    precio: '',
  });

  useEffect(() => {
    // Esta funcion permite llamar al api en formato get
    // para poder traer todas las categorias de la tabla
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/categoria/");
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al recoger categoria:', error);
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
    // Solo se agrega para mostrar un mensaje de que el user debe completar los campos
    if(!formData.categoriaid || !formData.descripcion || !formData.precio) {
        alert("Completar los campos");
        return;
    }
    try {
      // Se esta recogiendo las datas que se ingresaron en los input de los formularios
        const dataToSend = {
            ...formData,
            categoriaid: parseInt(formData.categoriaid),
          };

          // Mandando en nuesta api el formato post para el registro
        const response = await axios.post("http://localhost:8000/api/v1/producto/", dataToSend);
        console.log('Producto creado:', response.data);

        setRegistroCompl(true);

        // Estamos redirigiendo al user después del previo registro de data
        setTimeout(() => {
          navigate('/producto');
        }, 3000);
    } catch (error) {
      console.error('Error creando producto:', error);
      
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
      <Form onSubmit={handleSubmit} className="formulario">
      <h2 className='text-capitalize'>Nuevo producto</h2>
      {registroCompl && <p className="text-info">¡Se ha registrado el producto! Redirigiendo a la vista de productos...</p>}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="categoriaid">Seleccionar Categoria</Form.Label>
        <Form.Select name="categoriaid" value={formData.categoriaid} onChange={handleChange}>
            <option>Categorias</option>
              {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}           
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Descripcion</Form.Label>
        <Form.Control 
        as="textarea" 
        rows={3} 
        placeholder="Descripcion del producto"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control type="text"
          placeholder="Precio producto"
          name="precio"
          value={formData.precio}
          onChange={handleChange} />
      </Form.Group>
      <button type="text"  className="btn btn-success mt-2">Registrar producto</button>
    </Form>
    </div>
  );
}