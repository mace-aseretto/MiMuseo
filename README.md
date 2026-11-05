# Mi Museo 

Mi Museo es una página web que permite explorar una colección de obras de arte y guardar las favoritas.

Las obras se obtienen mediante la API del Cleveland Museum of Art.

## Funcionalidades

- **Galería de obras:** muestra pinturas con su imagen, título, artista y fecha.
- **Buscador:** permite buscar obras por título o artista.
- **Favoritos:** permite guardar y eliminar obras favoritas.
- **Almacenamiento local:** utiliza `localStorage` para conservar los favoritos al cerrar el navegador.
- **Paginación:** muestra 12 obras por página e incluye botones para avanzar y retroceder.
- **Diseño responsive:** se adapta a diferentes tamaños de pantalla.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- LocalStorage

## API utilizada

La aplicación utiliza la API pública del Cleveland Museum of Art para obtener información e imágenes de las obras.

Documentación: https://openaccess-api.clevelandart.org/

## Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Ejecutar `index.html` utilizando Live Server o un servidor local.
4. Explorar las obras, utilizar el buscador y guardar favoritos.

## Estructura del proyecto

```text
Mi Museo/
├── index.html
├── favoritos.html
├── README.md
├── css/
│   ├── styles.css
│   └── tarjetas.css
└── js/
    ├── app.js
    ├── api.js
    ├── favoritos.js
    └── models/
        └── Obra.js
```

