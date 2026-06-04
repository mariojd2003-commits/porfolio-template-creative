# Portfolio Web — Portfolio a partir de un error

Encuentra aquí el proyectyo desplegado: [https://mariojd2003-commits.github.io/porfolio-template-creative/]

Un portfolio web desarrollado con **HTML, CSS y JavaScript nativo**, construido sobre una base modular y escalable, con especial foco en **diseño visual, rendimiento y experiencia de usuario**.

El proyecto integra un **sistema de diseño completo**, una **navegación moderna con glassmorphism**, soporte **dark/light mode**, y una **página 404 interactiva** con animaciones avanzadas en canvas y texto.

---

## Características principales

Arquitectura limpia y modular (CSS dividido por capas)
Design System con variables CSS (tokens semánticos)
Modo oscuro por defecto + modo claro persistente
Navegación moderna con efecto _glassmorphism_
Interacciones avanzadas (Scramble text con GSAP)
Canvas interactivo tipo _Dot Grid_
Responsive real (no parcheado)
Componentes reutilizables

---

## Instrucciones de configuración para desarrollo local

Este proyecto no requiere instalación de dependencias ni compilación previa, ya que está desarrollado con HTML, CSS y JavaScript puro.

## Clonar el repositorio

```bash
git clone https://github.com/mariojd2003-commits/porfolio-template-creative.git
```

---

## Guía de personalización local

Este portfolio está preparado para que cada usuario pueda adaptarlo fácilmente a su propia identidad visual, proyectos y datos de contacto. La estructura está pensada para modificar elementos concretos sin tener que rehacer toda la plantilla.

### Personalización de colores y temas

Los temas visuales del proyecto se encuentran definidos en el archivo:

[other.css](./assets/css/other.css)

Dentro de este archivo están configurados los colores principales mediante variables CSS y tokens semánticos. Desde ahí se pueden modificar los valores del modo oscuro y del modo claro.

Esto permite cambiar la identidad visual del portfolio de forma sencilla, manteniendo la coherencia entre ambos temas.

Por ejemplo, se pueden ajustar colores como:

/_ 🌙 Dark mode — default _/
:root {
--color-bg: #15131d;
--color-bg-alt: #1a1a1a;
--color-text: #f5f5f5;
--color-text-muted: #9e9ac2;
--color-accent: #5154de;
--color-accent-hover: #818cf8;
}

/_ ☀️ Light mode _/
[data-theme="light"] {
--color-bg: #f7f7fb;
--color-bg-alt: #ffffff;
--color-text: #15131d;
--color-text-muted: #5f5b7a;
--color-accent: #3235bb;
--color-accent-hover: #4f46e5;
}

Si se quiere cambiar el aspecto general del portfolio, lo recomendable es modificar primero estos tokens en lugar de cambiar colores sueltos en cada sección.

### Cambiar la imagen de perfil en la sección About

La estructura principal del portfolio se encuentra en:

[index.html](./index.html).

En la sección `About`, el usuario puede sustituir la imagen de perfil por una imagen propia.

El bloque que debe modificarse es este:

```html
<div class="about-avatar animate-on-scroll">
  <img
    src="https://ik.imagekit.io/mtjg3ogqf/1000049272.jpg"
    alt="Imagen externa"
  />
</div>
```

Para cambiarla, basta con subir la imagen personal a cualquier servidor de imágenes, como ImageKit, Cloudinary, Imgur u otro servicio similar, y sustituir el valor de `src` por el nuevo enlace.

Ejemplo:

```html
<div class="about-avatar animate-on-scroll">
  <img src="https://tuservidor.com/tu-imagen.jpg" alt="Imagen de perfil" />
</div>
```

### Editar las habilidades y sus porcentajes

En la misma sección `About`, el usuario puede modificar las habilidades mostradas y el porcentaje de cada barra.

Cada habilidad funciona con una variable CSS inline llamada `--fill`.

Ejemplo:

```html
<div class="skill-card">
  <span class="skill-icon">🎨</span>
  <h3>CSS/Sass</h3>
  <div class="skill-bar">
    <div class="skill-fill" style="--fill: 95%"></div>
  </div>
</div>
```

Para cambiar el nivel de una habilidad, solo hay que modificar el porcentaje:

```html
style="--fill: 75%"
```

También se pueden cambiar el icono y el nombre de la habilidad:

```html
<span class="skill-icon">✏️</span>
<h3>Branding</h3>
<div class="skill-bar">
  <div class="skill-fill" style="--fill: 88%"></div>
</div>
```

Los valores recomendados deben estar entre `0%` y `100%`.

### 4. Sustituir las imágenes de proyectos

En la sección de proyectos, las imágenes actuales funcionan como imágenes temporales de ejemplo.

Los bloques originales son similares a estos:

```html
<img
  src="https://picsum.photos/400/300?random=1"
  alt="E-commerce Platform"
  loading="lazy"
/>

<img
  src="https://picsum.photos/400/300?random=2"
  alt="Dashboard UI"
  loading="lazy"
/>

<img
  src="https://picsum.photos/400/300?random=3"
  alt="Mobile App Landing"
  loading="lazy"
/>
```

Para personalizar el portfolio, se recomienda sustituir esas imágenes por capturas reales de trabajos personales.

Ejemplo:

```html
<img
  src="https://tuservidor.com/proyecto-1.jpg"
  alt="Proyecto de branding"
  loading="lazy"
/>
```

También es recomendable cambiar el atributo `alt` para describir correctamente cada proyecto.

### Cambiar el formulario de contacto

En la sección de contacto, el formulario utiliza Formspree como sistema de envío.

El bloque actual incluye una URL de ejemplo:

```html
<form
  action="https://formspree.io/f/mbdwlwpj"
  method="POST"
  class="contact-form"
  data-reveal-stagger
></form>
```

Para recibir los mensajes en una cuenta propia, el usuario debe crear su propio formulario en Formspree y sustituir el valor de `action` por su endpoint personal.

Ejemplo:

```html
<form
  action="https://formspree.io/f/tu-codigo"
  method="POST"
  class="contact-form"
  data-reveal-stagger
></form>
```

De esta forma, los mensajes enviados desde el portfolio llegarán al correo configurado por el usuario.

### Recomendación final

Después de realizar cualquier cambio, se recomienda probar el proyecto en local utilizando Live Server o abriendo el archivo `index.html` en el navegador. Una vez comprobado que todo funciona correctamente, los cambios pueden subirse al repositorio mediante commit y publicarse automáticamente en GitHub Pages.

---

A partir de un error nació este portfolio.

Lo que empezó como la creación de una interfaz 404 terminó convirtiéndose en una oportunidad para replantear desde cero cómo debería ser una base real para mostrar trabajo al mundo. El objetivo era crear una estructura útil para cualquier persona que quiera empezar a enseñar su trabajo de forma profesional.

Desde el principio se tomó una decisión clara a nivel visual: trabajar sobre el morado como color principal. No solo por estética, sino porque funciona bien en interfaces digitales y permite construir una identidad reconocible sin complicarse que queda bien con los temas. A partir de ahí, todo el sistema se adapta tanto a modo oscuro como claro, manteniendo coherencia en ambos casos.

El cambio entre temas no está añadido después, forma parte del propio sistema. Los colores están definidos con las variables de la plantilla del sistema, lo que facilita ajustar y mantener todo sin romper nada. Además, el usuario puede cambiar entre light y dark y esa elección se guarda, algo básico pero que muchas veces se pasa por alto.

Al final, lo importante es que funciona. Es una base clara, fácil de modificar y lista para que cualquiera. Pensada desde el punto de vista de una persona que cuando tuvo que crear esta plantilla tenía mucho del código creado, y tuvo que adaptarse para incorporar sus propios diseños.

### Créditos y agradecimientos:

Agradezco a [Rubén Balbás Vega](https://github.com/ruvebal) por dejarme la plantilla de portfolio del proyecto y preocuparse por mis entregas y haciendo posible que pudiera entregar este proyecto con buen feedback.

También agradezco a la empresa [Upify](https://upifymobile.com/) porque aunque no me ayudara personalmente en el proyecto ha sido mi proyecto de TFG y me ha enseñado la funcionalidad práctica de los tokens y estados en el ámbito profesional junto a otras muchas funciones del CSS.

Creador del portfolio web Mario Jiménez Díaz [mariojd2003-commits](https://github.com/mariojd2003-commits)
