## Formulario de contacto

Al revisar los requisitos opcionales, me interesé por el formulario, por lo que me registré y, partiendo del HTML disponible en la web, pedí a la IA que lo adaptara a un estilo más acorde con nuestro diseño y la estética general del proyecto.

---

```css
.contact-form {
	width: min(100%, 720px);
	margin: var(--space-lg) auto 0;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--space-md);
}

.contact-form input,
.contact-form textarea {
	width: 100%;
	padding: var(--space-sm) var(--space-md);
	border-radius: 16px;
	border: 1px solid var(--color-text-muted);
	background: var(--color-bg-alt);
	color: var(--color-text);
	font: inherit;
	outline: none;
}

.contact-form textarea {
	grid-column: 1 / -1;
	min-height: 140px;
	resize: vertical;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
	color: var(--color-text-muted);
}

.contact-form input:focus,
.contact-form textarea:focus {
	border-color: var(--color-accent);
	box-shadow: 0 0 0 3px rgba(50, 53, 187, 0.25);
}

.contact-form button {
	grid-column: 1 / -1;
	justify-self: center;
	border: none;
}

--------------------------------------------------------

Create a responsive contact form using HTML and CSS with a clean, modern design based on a design system with CSS variables.

The form container should:

Have a max width of around 720px using min(100%, 720px)
Be centered horizontally
Use CSS Grid with two columns (1fr 1fr)
Include consistent spacing using CSS variables

The form inputs should:

Include text inputs and a textarea
Use full width
Have rounded corners (around 16px)
Use a subtle border and background color based on variables
Inherit font styles
Remove default outlines

The textarea should:

Span across both columns
Have a minimum height
Be vertically resizable only

Add placeholder styling using a muted color.

On focus:

Change the border color to an accent color
Add a soft glow effect using box-shadow

Include a submit button that:

Spans across both columns
Is centered horizontally
Has no border by default

Keep the design minimal, clean, and consistent with a dark/light design system using CSS variables.

--------------------------------------------------------

Posteriormente, incorporamos el comportamiento responsive.

--------------------------------------------------------

/* Responsive */
@media (max-width: 640px) {
	.contact-form {
		grid-template-columns: 1fr;
		width: 100%;
	}

	.contact-form textarea,
	.contact-form button {
		grid-column: auto;
	}

	.contact-form button {
		width: 100%;
	}
}

.social-links {
	display: flex;
	justify-content: center;
	gap: var(--space-lg);
	margin-top: var(--space-lg);
}

.social-links a {
	color: var(--color-text-muted);
	transition: color 0.3s;
}

.social-links a:hover {
	color: var(--color-accent);
}

--------------------------------------------------------

Add responsive styles for a contact form and social links section using CSS.

For screens below 640px:

Change the contact form from a two-column grid to a single-column layout.
Make the form take full width.
Reset the textarea and button grid column so they fit naturally in one column.
Make the submit button full width on mobile.

Also create a social links section:

Use flexbox.
Center the links horizontally.
Add consistent spacing between links using CSS variables.
Add top margin.
Style links with a muted color by default.
On hover, change the link color to the accent color.
Keep transitions smooth and minimal.

--------------------------------------------------------

Después incorporamos la imagen circular en la sección About para completar los pasos opcionales.

--------------------------------------------------------

.about-avatar img {
	width: clamp(140px, 20vw, 200px);
	aspect-ratio: 1 / 1;
	object-fit: cover;
	border-radius: 50%;

	/* estilo acorde a tu UI */
	background: var(--color-bg-alt);
	border: 1px solid rgba(73, 73, 73, 0.12);
	box-shadow: 0 20px 40px rgba(0,0,0,0.3);

	transition: transform 0.3s ease;
}

--------------------------------------------------------

Create a responsive circular avatar image using HTML and CSS, styled to match a modern UI design system.

The image should:

Use a fluid width with clamp() to scale between small and large screens
Maintain a perfect square aspect ratio (1:1)
Use object-fit: cover to properly crop the image
Have a fully rounded shape (border-radius: 50%)

Apply visual styling:

Background color based on a CSS variable
Subtle border with low opacity
Soft shadow to create depth

Add a smooth hover interaction:

Slight transform (e.g., scale or translate)
Use a subtle transition with easing

Keep the design clean, minimal, and consistent with a dark/light design system using CSS variables.

--------------------------------------------------------

Usamos la información de los recursos para subir una foto a un servidor y cargarla desde allí.
```
