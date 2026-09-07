# Portafolio personal de Alejandro Gallardo

Este repositorio contiene mi portafolio personal como desarrollador web junior. En
el sitio presento mi perfil, las tecnologías que conozco, proyectos personales y
mis medios de contacto.

## Sitio

- [Ver portafolio en línea](https://portafolio-dev12.netlify.app/)
- [Ver repositorio en GitHub](https://github.com/Alej011/portafolio_dev)

## Plantilla y personalización

El portafolio parte de la plantilla **Read Only** de [HTML5 UP](https://html5up.net/),
la cual fue adaptada y personalizada para mostrar mi información, experiencia de
aprendizaje y proyectos. La plantilla se distribuye bajo la licencia Creative
Commons Attribution 3.0 incluida en [LICENSE.txt](LICENSE.txt).

## Tecnologías empleadas

- HTML5
- CSS3 y Sass
- JavaScript
- jQuery
- Font Awesome
- Git y GitHub
- Python, Node.js, Express.js y Docker como tecnologías complementarias
- MySQL y PostgreSQL
- Arduino, ESP32, sensores, actuadores y conceptos de IoT

## Ejecutar localmente

El proyecto es un sitio estático y no requiere un proceso de compilación para
visualizar la versión disponible en este repositorio. El CSS compilado está
incluido en `assets/css/main.css`; el repositorio no contiene actualmente una
configuración automatizada para recompilar `assets/sass/main.scss`.

1. Clona el repositorio y entra en su carpeta:

	 ```bash
	 git clone https://github.com/Alej011/portafolio_dev.git
	 cd portafolio_dev
	 ```

2. Inicia un servidor local. Por ejemplo, con Python:

	 ```bash
	 python -m http.server 8000
	 ```

3. Abre [http://localhost:8000](http://localhost:8000) en el navegador.

También puedes abrir `index.html` directamente, aunque un servidor local permite
probar el sitio en un entorno más cercano al de producción.

## Agregar proyectos

Los proyectos se administran desde `assets/js/projects.js`. Para agregar uno,
copia uno de los objetos del arreglo `projects` y actualiza su título, imagen,
resumen, descripción, tecnologías y enlaces.

El campo `demoUrl` contiene la demostración publicada. El campo `codeUrl` contiene
el repositorio y puede permanecer vacío mientras el código no sea público:

```javascript
{
	title: 'Nombre del proyecto',
	image: 'images/mi-proyecto.png',
	width: 1200,
	height: 600,
	summary: 'Descripción corta para la tarjeta.',
	description: ['Descripción completa del proyecto.'],
	technologies: ['HTML5', 'CSS3', 'JavaScript'],
	demoUrl: 'https://ejemplo.netlify.app/',
	codeUrl: ''
}
```

La galería presenta cuatro proyectos inicialmente y activa automáticamente el
botón «Mostrar más proyectos» cuando existen proyectos adicionales.

## Modificaciones realizadas

- Se sustituyó el contenido original de la plantilla por la presentación personal
	de Alejandro Gallardo.
- Se agregaron las secciones «Sobre mí», «Tecnologías», «Proyectos personales» y
	«Contáctame».
- Se incorporaron enlaces a GitHub, LinkedIn, Gmail y a los proyectos publicados.
- Se añadieron imágenes, textos descriptivos y tecnologías de frontend, backend,
	bases de datos, electrónica y microcontroladores.
- Se adaptaron los estilos visuales, la tipografía, los iconos y la distribución
	responsive para el contenido del portafolio.
- Se mejoraron la navegación, los textos alternativos, las etiquetas ARIA, el
	enfoque visible del teclado y el soporte para la reducción de movimiento.
- Se corrigieron textos, acentos, nombres de tecnologías y descripciones de los
	proyectos.

## Créditos

- Plantilla: [HTML5 UP](https://html5up.net/)
- Iconos: [Font Awesome](https://fontawesome.com/)
- Librerías: [jQuery](https://jquery.com/), [Scrollex](https://github.com/ajlkn/jquery.scrollex)
	y Responsive Tools.
