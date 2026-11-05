# Memoria del proyecto: Mi Museo

## 1. Introducción

**Mi Museo** es una página web para explorar pinturas de la colección del Cleveland Museum of Art. Permite consultar las obras en una galería, buscar por título o artista y guardar una selección de favoritos.

El proyecto se ha desarrollado como práctica de **HTML, CSS y JavaScript**, con especial atención al consumo de una API externa, la creación dinámica de elementos HTML y la gestión de datos en el navegador.

## 2. Objetivos

El objetivo principal es desarrollar una web funcional que muestre información de obras de arte obtenida de una API pública.

Objetivos específicos:

- Obtener datos de obras mediante `fetch()` y `async/await`.
- Representar cada obra mediante un objeto JavaScript.
- Generar las tarjetas de la galería dinámicamente.
- Implementar un buscador por título y artista.
- Dividir los resultados en páginas de 12 obras.
- Permitir añadir y eliminar obras favoritas.
- Conservar los favoritos mediante `localStorage`.
- Adaptar el diseño a pantallas de distintos tamaños.
- Organizar y documentar el proyecto usando Git y GitHub.

## 3. Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
| --- | --- |
| HTML5 | Estructura de la página principal y la página de favoritos. |
| CSS3 | Diseño de la galería, tarjetas, botones y adaptación a móviles. |
| JavaScript | Lógica de la aplicación e interacción con el usuario. |
| Fetch API | Peticiones a la API del museo. |
| `localStorage` | Almacenamiento de los favoritos en el navegador. |
| Git y GitHub | Control de versiones y conservación del código. |

El proyecto utiliza módulos de JavaScript mediante `type="module"` e instrucciones `import` y `export`.

## 4. Estructura del proyecto

Los archivos principales son:

```text
Mi Museo/
├── index.html
├── favoritos.html
├── README.md
├── css/
│   ├── styles.css
│   └── tarjetas.css
├── js/
│   ├── api.js
│   ├── app.js
│   ├── favoritos.js
│   └── models/
│       └── Obra.js
└── docs/
    └── memoria.md
```

- **`index.html`**: contiene la cabecera, el buscador, la galería y los controles de paginación.
- **`favoritos.html`**: contiene la página donde se muestran las obras guardadas como favoritas.
- **`styles.css`**: define los estilos generales de la web.
- **`tarjetas.css`**: define el diseño de las tarjetas y de la galería.
- **`api.js`**: realiza las peticiones de obras a la API externa.
- **`app.js`**: transforma los datos, crea las tarjetas y gestiona el buscador, la paginación y los favoritos de la página principal.
- **`favoritos.js`**: gestiona la visualización y eliminación de favoritos.
- **`models/Obra.js`**: contiene la clase `Obra`, utilizada para representar los datos de cada pintura.

## 5. Obtención de datos mediante la API

La aplicación utiliza la API pública del **Cleveland Museum of Art**:

<https://openaccess-api.clevelandart.org/>

La petición principal utiliza una URL de este tipo:

```text
https://openaccess-api.clevelandart.org/api/artworks/?type=Painting&has_image=1&limit=200
```

Los parámetros permiten solicitar pinturas (`type=Painting`), limitar los resultados a obras que tengan imagen asociada (`has_image=1`) y pedir hasta 200 registros (`limit=200`).

En `api.js`, la función `pedirObras()` realiza la petición con `fetch()`, convierte la respuesta a JSON y devuelve los datos. Después, `app.js` transforma cada registro en un objeto de la clase `Obra`.

Cada objeto contiene las siguientes propiedades:

- `id`: identificador de la obra.
- `title`: título.
- `date`: fecha de creación.
- `artist`: artista o autor.
- `image`: dirección de la imagen.

## 6. Funcionamiento de la aplicación

### 6.1. Galería de obras

Al abrir la página principal, JavaScript solicita los datos y construye las tarjetas mediante `document.createElement()`. Cada tarjeta muestra la imagen, el título, el artista, la fecha y un botón para marcarla como favorita.

Las tarjetas se añaden al contenedor HTML `contenedor-obras`. Para evitar que se acumulen al cambiar de página, se limpia el contenido anterior antes de mostrar las nuevas obras.

### 6.2. Buscador

El buscador utiliza el evento `input` para detectar los cambios mientras el usuario escribe. El texto introducido se convierte a minúsculas y se eliminan los espacios al principio y al final.

Con el método `filter()`, JavaScript selecciona las obras cuyo título o artista contiene el texto buscado. Después vuelve a mostrar los resultados desde la primera página.

### 6.3. Paginación

La galería muestra **12 obras por página**.

Para ello se utilizan:

- `paginaActual`, que indica la página seleccionada.
- `obrasPorPagina`, que establece el número de obras visibles.
- `slice()`, que obtiene del array únicamente las obras que corresponden a la página actual.

Los botones «Anterior» y «Siguiente» permiten navegar entre páginas. El número total de páginas se calcula a partir de los resultados de la búsqueda, por lo que el buscador y la paginación funcionan conjuntamente.

### 6.4. Favoritos

Cada tarjeta incluye un botón con un corazón. Al pulsarlo, se añade o elimina el identificador de la obra del array de favoritos.

Los identificadores se guardan en `localStorage` bajo la clave `favoritos`. La aplicación también almacena los datos de las obras mostradas con claves basadas en su identificador, para poder recuperar su información en la página de favoritos.

De esta manera, los favoritos se mantienen después de recargar o cerrar el navegador, mientras no se borren los datos locales del sitio.

## 7. Diseño y adaptación a móviles

El diseño utiliza una estética sencilla, con un fondo claro, tipografía legible y tarjetas centradas para dar protagonismo a las pinturas.

Los estilos se organizan mediante variables CSS y reglas de maquetación con **Flexbox** y **CSS Grid**. La galería se presenta en dos columnas en pantallas amplias y se adapta a una columna en pantallas pequeñas mediante **media queries**.

Las imágenes mantienen sus proporciones mediante `object-fit: contain`, evitando recortes de las obras.

## 8. Organización del trabajo con Git

El proyecto se ha desarrollado con control de versiones mediante Git y GitHub. Durante el desarrollo se han utilizado ramas para separar funcionalidades, como el buscador y la paginación, y posteriormente integrar los cambios en `main`.

También se ha realizado una revisión final para eliminar código y archivos que ya no se utilizaban, además de organizar la documentación del repositorio.

## 9. Dificultades encontradas y soluciones

### Integración del buscador con la paginación

Inicialmente, el buscador ocultaba o mostraba tarjetas que ya existían en el HTML. Al implementar la paginación, solo se generaban las tarjetas de la página actual, por lo que no era posible mostrar coincidencias de otras páginas.

Para resolverlo, se modificó el flujo: primero se filtra el array completo de obras y después se aplica la paginación a los resultados.

### Botones de paginación que desaparecían

Los botones se habían colocado inicialmente dentro de `contenedor-obras`. Como JavaScript utilizaba `replaceChildren()` para limpiar ese contenedor, también eliminaba los botones.

La solución consistió en colocar los controles de paginación **fuera del contenedor de tarjetas**.

### Conservación de favoritos

Para mantener los favoritos entre sesiones, se utilizó `localStorage`. Los identificadores se almacenan en una lista y la información de las obras se recupera para representarlas en `favoritos.html`.

## 10. Conclusiones

Con **Mi Museo** se ha desarrollado una aplicación web que integra datos procedentes de una API real y permite interactuar con ellos mediante una interfaz visual.

El proyecto ha servido para practicar conceptos fundamentales de JavaScript, como arrays, clases, módulos, funciones, eventos, manipulación del DOM, peticiones asíncronas y almacenamiento local. También ha permitido aprender a organizar archivos, mantener un diseño responsive y trabajar con Git.

Como posibles ampliaciones futuras, se podrían incorporar mejoras en la gestión de errores de red o ampliar las opciones de búsqueda. Estas funcionalidades no son necesarias para el funcionamiento actual de la aplicación.
