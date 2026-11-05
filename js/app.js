import { pedirObras } from "./api.js";
import { Obra } from "./models/Obra.js";

const resultado = await pedirObras();
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const obras = resultado.data.map(obra => {
    return new Obra(
        obra.id,
        obra.title,
        obra.creation_date,
        obra.creators?.[0]?.description,
        obra.images?.web?.url
    );
});




const contenedorObras = document.getElementById("contenedor-obras");

let paginaActual = 1;
const obrasPorPagina = 12;
const buscador = document.getElementById("buscador");
const botonAnterior = document.getElementById("anterior");
const botonSiguiente = document.getElementById("siguiente");
const numeroPagina = document.getElementById("numero-pagina");

buscador.addEventListener("input", () => {
    paginaActual = 1;
    mostrarPagina();
});
function mostrarObras(lista) {
    contenedorObras.replaceChildren();

    lista.forEach(obra => {
   localStorage.setItem(`obra-${obra.id}`, JSON.stringify(obra));
    if (!obra.image) return;

    const tarjeta = document.createElement("article");
    tarjeta.classList.add("project-card");
    tarjeta.dataset.id = obra.id;
contenedorObras.appendChild(tarjeta);

const encabezadoTarjeta = document.createElement("div");
encabezadoTarjeta.classList.add("encabezado-tarjeta");
tarjeta.appendChild(encabezadoTarjeta);

const titulo = document.createElement("h2");
titulo.textContent = obra.title;
encabezadoTarjeta.appendChild(titulo);

const contenedorImagen = document.createElement("div");
contenedorImagen.classList.add("project-art");



const imagen = document.createElement("img");
imagen.src = obra.image;
tarjeta.appendChild(contenedorImagen);


contenedorImagen.appendChild(imagen);

const artist = document.createElement("p");
artist.textContent = obra.artist;
tarjeta.appendChild(artist);

const fecha = document.createElement("p");
fecha.textContent = obra.date;
tarjeta.appendChild(fecha);

const botonFavorito = document.createElement("button");
botonFavorito.textContent = "♡";
if (favoritos.includes(obra.id)) {
    botonFavorito.textContent = "♥";
}
botonFavorito.classList.add("favorito");
encabezadoTarjeta.appendChild(botonFavorito);
botonFavorito.addEventListener("click", () => {
    if (botonFavorito.textContent === "♡") {
        botonFavorito.textContent = "♥";
    favoritos.push(obra.id);
localStorage.setItem("favoritos", JSON.stringify(favoritos));
    } else {
         botonFavorito.textContent = "♡";
        favoritos = favoritos.filter(id => id !== obra.id);
         localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
});
});
}
function mostrarPagina() {
    const textoBusqueda = buscador.value.toLowerCase().trim();

    const obrasFiltradas = obras.filter(obra => {
        const artista = (obra.artist || "").toLowerCase();

        return obra.title.toLowerCase().includes(textoBusqueda) ||
               artista.includes(textoBusqueda);
    });

    const totalPaginas = Math.max(1, Math.ceil(obrasFiltradas.length / obrasPorPagina));

if (paginaActual > totalPaginas) {
    paginaActual = totalPaginas;
}

    const inicio = (paginaActual - 1) * obrasPorPagina;
    const fin = inicio + obrasPorPagina;

    mostrarObras(obrasFiltradas.slice(inicio, fin));
    numeroPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;
}

mostrarPagina();

botonAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarPagina();
    }
});

botonSiguiente.addEventListener("click", () => {
    paginaActual++;
    mostrarPagina();
});