import { pedirObras } from "./api.js";

const resultado = await pedirObras();
console.log(resultado.data);