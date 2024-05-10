import axios from "axios";

export const ApiWebURL = "http://localhost:8000/api/v1/producto/";

const Api = axios.create({
    baseUrl: "http://localhost:8000/api/v1/categoria/"
});

const Apiproducto = axios.create({
    baseUrl: "http://localhost:8000/api/v1/producto/"
});

export const getAllCate = () => Api.get("/");

export const createPro = (producto) => Apiproducto.post("", producto);

export const getAllProductos = () => Apiproducto.get("/");