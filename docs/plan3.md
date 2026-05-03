## Menú de navegación

Quería cambiar el menú de navegación por uno más moderno, por lo que, partiendo de la base que teníamos, introdujimos toda la información en la IA y nos generó esto:

---

```css
/* --------------------------------------------------------------------------
   4. Navigation (initial approach)
   -------------------------------------------------------------------------- */
.nav {
  position: fixed;
  top: var(--space-lg);
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: var(--space-lg);
  pointer-events: none;
}

.nav-container {
  width: min(90%, 760px);
  min-height: 64px;
  padding: 0 var(--space-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 999px;

  /* Glassmorphism base */
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);

  pointer-events: auto;
  max-width: 760px;
}

.nav-logo {
  font-size: var(--text-xl);
  font-weight: 700;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: var(--space-lg);
  list-style: none;
}

.nav-links a {
  color: var(--color-text-muted);
  transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a:focus {
  color: var(--color-accent);
}
```

---

### Prompt completo

```txt
Create a centered navigation bar using HTML and CSS with a glassmorphism style. The navigation should be fixed at the top of the viewport and horizontally centered using a container with a max width.

The navbar must have a pill-shaped design (fully rounded corners), a semi-transparent background, a subtle border, and a backdrop blur effect to create depth. Include a soft shadow to separate it from the background.

Inside the navigation, include:

A simple text-based logo (no icons or images) aligned to the left
A horizontal list of navigation links aligned to the right

The layout should use flexbox for alignment and spacing, and include smooth hover transitions on the links (color change only).

Avoid any theme toggles, icons, or dark/light mode logic. Keep the implementation minimal, clean, and focused on the initial layout structure.

Use CSS variables for spacing, typography, and colors to maintain consistency with a design system.
```

---

Queríamos añadir, junto al texto “Portfolio”, el icono del favicon como logotipo corporativo, por lo que pedimos a la IA que generase una nueva variante.

---

```css
/* --------------------------------------------------------------------------
   4. Navigation (initial approach)
   -------------------------------------------------------------------------- */
.nav {
  position: fixed;
  top: var(--space-lg);
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: var(--space-lg);
  pointer-events: none;
}

.nav-container {
  width: min(90%, 760px);
  min-height: 64px;
  padding: 0 var(--space-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 999px;

  /* Glassmorphism base */
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);

  pointer-events: auto;
  max-width: 760px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  font-size: var(--text-xl);
  font-weight: 700;
  text-decoration: none;
}

.nav-logo-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  display: block;
}

.nav-links {
  display: flex;
  gap: var(--space-lg);
  list-style: none;
}

.nav-links a {
  color: var(--color-text-muted);
  transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a:focus {
  color: var(--color-accent);
}
```

---

### Prompt completo (preciso)

```txt
Create a fixed, centered navigation bar using HTML and CSS with a glassmorphism design.

The navigation should be positioned at the top of the viewport and centered horizontally using a wrapper (.nav) and an inner container (.nav-container). The wrapper must span full width and use flexbox to center the container.

The .nav-container should:

Have a max width (around 760px) and responsive width using min(90%, 760px)
Be pill-shaped using a large border-radius (999px)
Use a semi-transparent background (rgba)
Include a subtle border and a strong backdrop blur (backdrop-filter)
Have a soft shadow for depth
Use flexbox to align a logo on the left and navigation links on the right

The navigation should include:

A logo section (.nav-logo) with optional icon and text, aligned using flexbox
A horizontal list of links (.nav-links) with spacing between items
Links with a muted default color and a smooth hover transition to an accent color

Additional requirements:

Use CSS variables for spacing, typography, and colors
Disable pointer events on the outer wrapper and enable them on the container
Keep the implementation clean, minimal, and performance-friendly
Do not include theme toggles, dark/light mode logic, or complex interactions"
```

---

Implementamos el icono en el HTML y ajustamos el responsive para que se adaptara mejor a la nueva navegación.

---

```css
@media (max-width: 900px) {
  .nav-container {
    flex-wrap: wrap;
    row-gap: var(--space-sm);
    width: min(82%, 620px);
    padding: var(--space-sm) var(--space-lg);
    border-radius: 32px;
    justify-content: center;
  }

  .nav-logo {
    width: 100%;
    justify-content: center;
    gap: var(--space-sm);
  }

  .nav-logo-icon {
    width: 32px;
    height: 32px;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
    gap: var(--space-md);
  }

  .nav-links a {
    font-size: var(--text-sm);
  }
}
```

---

Planteamos la lógica a partir de las variables ya establecidas e implementamos en /other.css un nuevo sistema para los modos dark y light, estableciendo el modo oscuro como predeterminado para mantener la coherencia con la estética del proyecto.

---

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    animation-duration: 0s !important;
    transition-duration: 0s !important;
    scroll-behavior: auto !important;
  }
}

/* --------------------------------------------------------------------------
   Color Tokens
   -------------------------------------------------------------------------- */

/* 🌙 Dark mode — default */
:root {
  --color-bg: #15131d;
  --color-bg-alt: #1a1a1a;
  --color-text: #f5f5f5;
  --color-text-muted: #9e9ac2;
  --color-accent: #5154de;
  --color-accent-hover: #818cf8;
}

/* ☀️ Light mode */
[data-theme="light"] {
  --color-bg: #f7f7fb;
  --color-bg-alt: #ffffff;
  --color-text: #15131d;
  --color-text-muted: #5f5b7a;
  --color-accent: #3235bb;
  --color-accent-hover: #4f46e5;
}
```

---

### Prompt completo

```txt
Create a color token system using CSS custom properties for both dark mode (default) and light mode.

Define all color variables inside :root for the default dark theme, including:

Background color (--color-bg)
Secondary background (--color-bg-alt)
Main text color (--color-text)
Muted text color (--color-text-muted)
Primary accent color (--color-accent)
Hover accent color (--color-accent-hover)

Then create a light theme override using a [data-theme="light"] selector, redefining the same variables with appropriate light values.

The system should:

Use semantic naming (not raw color names)
Maintain good contrast and readability in both themes
Ensure visual consistency between dark and light modes
Be clean, scalable, and ready for use in a design system

Do not include additional styles, only the token definitions.
```

---

Planteamos en Figma un toggle para integrarlo en el diseño de la navegación y generamos toda la estructura necesaria para su posterior implementación en HTML.

---

```css
.theme-toggle {
  position: static;
  flex: 0 0 auto;

  width: 64px;
  height: 64px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s ease;
}

.theme-toggle:hover {
  transform: translateY(-2px);
}

.theme-toggle-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #000000;
  transition:
    background 0.3s ease,
    transform 0.3s ease;
}

/* En modo claro, el círculo se vuelve blanco */
[data-theme="light"] .theme-toggle-dot {
  background: #ffffff;
}
```

---

Como detalle, creamos en Illustrator una versión en light del icono para incorporarla al HTML y mantener coherencia con el tema claro.

---

```css
/* --------------------------------------------------------------------------
   4. Navigation
   -------------------------------------------------------------------------- */
.nav {
  position: fixed;
  top: var(--space-lg);
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-md);
  padding-inline: var(--space-lg);
  pointer-events: none;
}

.nav-container {
  width: min(90%, 760px);
  min-height: 64px;
  padding: 0 var(--space-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  pointer-events: auto;
  flex: 1 1 auto;
  max-width: 760px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  font-size: var(--text-xl);
  font-weight: 700;
  text-decoration: none;
}

.nav-logo-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  display: block;
}

/* Por defecto (dark) */
.nav-logo-icon-light {
  display: none;
}

/* Cuando está en light */
[data-theme="light"] .nav-logo-icon-dark {
  display: none;
}

[data-theme="light"] .nav-logo-icon-light {
  display: block;
}

.nav-logo-icon {
  transition: opacity 0.6s ease;
}

.nav-links {
  display: flex;
  gap: var(--space-lg);
  list-style: none;
}

.nav-links a {
  color: var(--color-text-muted);
  transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a:focus {
  color: var(--color-accent);
}

.theme-toggle {
  position: static;
  flex: 0 0 auto;

  width: 64px;
  height: 64px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    transform 0.3s ease;
}

.theme-toggle:hover {
  transform: translateY(-2px);
}

.theme-toggle-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #000000;
  transition:
    background 0.3s ease,
    transform 0.3s ease;
}

/* En modo claro, el círculo se vuelve blanco */
[data-theme="light"] .theme-toggle-dot {
  background: #ffffff;
}

@media (max-width: 900px) {
  .nav-container {
    flex-wrap: wrap;
    row-gap: var(--space-sm);
    width: min(82%, 620px);
    padding: var(--space-sm) var(--space-lg);
    border-radius: 32px;
    justify-content: center;
  }

  .nav-logo {
    width: 100%;
    justify-content: center;
    gap: var(--space-sm);
  }

  .nav-logo-icon {
    width: 32px;
    height: 32px;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
    gap: var(--space-md);
  }

  .nav-links a {
    font-size: var(--text-sm);
  }
}
```

---

### Prompt

```txt
Create a responsive fixed navigation bar using HTML and CSS with a glassmorphism style and light/dark theme support.
The navigation should be positioned at the top center of the viewport. Use an outer .nav wrapper that spans the full width and centers an inner .nav-container.
The .nav-container should have:


Responsive width using min()


Pill-shaped rounded corners


Semi-transparent background


Subtle border


backdrop-filter: blur(...)


Soft shadow


Flexbox layout


Logo on the left and navigation links on the right


Include a logo area with:


Text/logo link


Optional logo icon


Two logo icon variants: one for dark mode and one for light mode


Use [data-theme="light"] to switch which logo icon is visible


Add a separate circular theme toggle button next to the navbar. It should:


Match the glassmorphism style of the navbar


Be 64x64px


Contain a circular dot inside


Use black dot in dark mode and white dot in light mode


Have a subtle hover movement upward


Add responsive behavior for screens below 900px:


Allow the navbar container to wrap


Center the logo and links


Reduce logo icon size


Reduce link text size


Adjust padding and border radius for smaller screens


Use CSS variables for spacing, typography, and colors. Keep the animation subtle and performance-friendly.
```
