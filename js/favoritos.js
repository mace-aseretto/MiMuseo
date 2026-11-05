
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
const obrasFavoritas = favoritos
    .map(id => JSON.parse(localStorage.getItem(`obra-${id}`)))
    .filter(obra => obra !== null);
const contenedorFavoritos = document.getElementById("contenedor-favoritos");

obrasFavoritas.forEach(obra => {
    if (!obra.image) return;

    const tarjeta = document.createElement("article");
tarjeta.classList.add("project-card");
contenedorFavoritos.appendChild(tarjeta);


const titulo = document.createElement("h2");
titulo.textContent = obra.title;
tarjeta.appendChild(titulo);

const contenedorImagen = document.createElement("div");
contenedorImagen.classList.add("project-art");
tarjeta.appendChild(contenedorImagen);

const imagen = document.createElement("img");
imagen.src = obra.image;
contenedorImagen.appendChild(imagen);

const artist = document.createElement("p");
artist.textContent = obra.artist;
tarjeta.appendChild(artist);

const fecha = document.createElement("p");
fecha.textContent = obra.date;
tarjeta.appendChild(fecha);


const botonFavorito = document.createElement("button");
botonFavorito.textContent = "♥";
botonFavorito.classList.add("favorito");
contenedorImagen.appendChild(botonFavorito);
botonFavorito.addEventListener("click", () => {
favoritos = favoritos.filter(id => id !== obra.id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
tarjeta.remove();
if (favoritos.length === 0) {
    contenedorFavoritos.textContent = "Todavía no tienes obras favoritas.";
}
});
});