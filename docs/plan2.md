## Scroll indicator y manifest

Le planteamos a la IA la parte de layout y le preguntamos por el bug del scroll y su movimiento diagonal, obteniendo esta solución:

---

```css
/* Scroll Indicator */
.scroll-indicator {
	position: absolute;
	bottom: var(--space-xl);
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space-sm);
	color: var(--color-text-muted);
	font-size: var(--text-sm);
}

.scroll-arrow {
	width: 24px;
	height: 24px;
	border-right: 2px solid currentColor;
	border-bottom: 2px solid currentColor;
	transform: rotate(45deg);
	animation: bounce 2s infinite;
}

@keyframes bounce {
	0%, 100% {
		transform: translateY(0) rotate(45deg);
	}
	50% {
		transform: translateY(8px) rotate(45deg);
	}
}

--------------------------------------------------------

Prompt:

Create a minimal scroll indicator component using HTML, CSS, and vanilla JavaScript (if needed). The indicator should be positioned at the bottom center of the screen and consist of a small arrow pointing down.

The arrow must be built using CSS borders (not images), rotated at 45 degrees, and styled with a subtle color that inherits from the parent (using currentColor).

Add a smooth vertical bounce animation that loops infinitely, moving the arrow slightly down and back up to indicate scroll. The animation should be subtle and not distracting.

The component should:

Be centered horizontally using left: 50% and transform: translateX(-50%)
Use flexbox to align elements vertically
Include spacing between elements using CSS variables
Be responsive and visually clean
Follow modern UI practices (minimal, smooth, performant)

Use only CSS for the animation (no JavaScript for motion), and ensure the animation uses transform for performance.

--------------------------------------------------------

Tras solucionar ese bug, solicitamos a la IA ayuda para generar el manifest y poder integrarlo con el resto de metadatos, que sí fueron incorporados manualmente.


--------------------------------------------------------

{
	"icons": [
		{
			"src": "icon-192.png",
			"sizes": "32x32",
			"type": "image/png"
		}
	]
}

--------------------------------------------------------

	 <link rel="manifest" href="/manifest.json">

--------------------------------------------------------

Prompt completo

Create a basic web app manifest file (manifest.json) and include it properly in an HTML document.

The manifest should define an icons array with at least one PNG icon (192x192 or similar), including properties for src, sizes, and type.

Then, show how to correctly link the manifest file inside the <head> of an HTML document using a <link rel="manifest"> tag.

Keep the structure clean and minimal, following best practices for progressive web apps (PWA).


--------------------------------------------------------

Por alguna razón, la IA asignó un tamaño de 32x32 al icono. Detectamos el error, lo corregimos manualmente y procedimos a implementar la configuración completa.
```
