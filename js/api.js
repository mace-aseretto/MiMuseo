
 export async function pedirObras() {
    const respuesta = await fetch("https://openaccess-api.clevelandart.org/api/artworks/?type=Painting&has_image=1&limit=50");
    const obras = await respuesta.json();
    return obras;
}

export async function pedirObraPorId(id) {
    const respuesta = await fetch(
        `https://openaccess-api.clevelandart.org/api/artworks/${id}`
    );
    const resultado = await respuesta.json();
    return resultado.data;

}