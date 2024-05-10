import axios from "axios";

const Apiproducto = axios.create({
    baseUrl: "http://localhost:8000/api/v1/producto/"
});

export const createProductoAhora = (producto) => Apiproducto.post("/", producto);

