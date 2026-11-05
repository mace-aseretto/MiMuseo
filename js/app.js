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

console.log(obras)


const contenedorObras = document.getElementById("contenedor-obras");


const buscador = document.getElementById("buscador");
buscador.addEventListener("input", () => {
    const textoBusqueda = buscador.value.toLowerCase().trim();
     obras.forEach (obra => {
        const artista = (obra.artist || "").toLowerCase();
        const coincide = obra.title.toLowerCase().includes(textoBusqueda) || artista.includes(textoBusqueda);
const tarjeta = document.querySelector(`[data-id="${obra.id}"]`);

        if (tarjeta) {
            tarjeta.style.display = coincide ? "" : "none";
        }
    });
});
obras.forEach(obra => {
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
tarjeta.classList.add("project-card");
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