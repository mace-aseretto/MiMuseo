
 export async function pedirObras() {
    const respuesta = await fetch("https://openaccess-api.clevelandart.org/api/artworks/?q=sea&limit=5");
    const obras = await respuesta.json();
    
   
    return obras;
}

export class Obra {
    constructor(id, title, date, artist, image) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.artist = artist;
        this.image = image;
    }
}

const resultado = await pedirObras();


const obras = resultado.data.map(obra => {
    return new Obra(
        obra.id,
        obra.title,
        obra.creation_date,
        obra.creators[0]?.description,
        obra.images?.web?.url
    );
});


console.log(obras);

const contenedor = document.querySelector("#contenedor-obras");
const buscador = document.querySelector("#buscador");
buscador.addEventListener("input", () => {
    console.log(buscador.value);
});


obras.forEach(obra => {
    const tarjeta = document.createElement("article");

    tarjeta.innerHTML = `
       <h2>${obra.title}</h2>
        <p>${obra.artist}</p>
        <p>${obra.date}</p>
        ${obra.image ? `<img src="${obra.image}" alt="${obra.title}">` : "<p>Imagen no disponible</p>"}
    `;

    contenedor.appendChild(tarjeta);
    });
