## Página 404 interactiva

A partir de este código de la web [https://reactbits.dev/backgrounds/dot-grid] generamos un chat para comenzar a crear la página 404. Aquí referencia:

---

```js
"use client";
import { useRef, useEffect, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

import "./DotGrid.css";

gsap.registerPlugin(InertiaPlugin);

const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

const DotGrid = ({
  dotSize = 16,
  gap = 32,
  baseColor = "#5227FF",
  activeColor = "#5227FF",
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = "",
  style,
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;

    const p = new window.Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;

    let rafId;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);

  useEffect(() => {
    buildGrid();
    let ro = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(buildGrid);
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      window.addEventListener("resize", buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e) => {
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const rect = canvasRef.current.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: "elastic.out(1,0.75)",
              });
              dot._inertiaApplied = false;
            },
          });
        }
      }
    };

    const onClick = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: "elastic.out(1,0.75)",
              });
              dot._inertiaApplied = false;
            },
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener("mousemove", throttledMove, { passive: true });
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", throttledMove);
      window.removeEventListener("click", onClick);
    };
  }, [
    maxSpeed,
    speedTrigger,
    proximity,
    resistance,
    returnDuration,
    shockRadius,
    shockStrength,
  ]);

  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid;
```

---

Pedimos generar una plantilla CSS para crear una página 404 con tres tamaños de texto.

---

```css
body {
  min-height: 100vh;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
  color:
  overflow: hidden;


}

#grid {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  z-index: 0;
  pointer-events: none;
}

.text-block {
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  max-width: 620px;
  padding: 40px;
  text-align: center;

  color:
}

.text-block p {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0.01em;
  color:
}

.text-block h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.01em;
}

.text-block h1 {
  margin: 0;
  font-size: 64px;
  line-height: 1.1;
  letter-spacing: 0.01em;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.text-block h1:hover {
  transform: scale(1.3);
}


.char {
  display: inline-block;
  text-align: center;
  color: inherit;
  will-change: contents;
}
```

---

### Prompt base

```txt
Create a clean 404 error page using HTML, CSS and vanilla JavaScript.

Requirements:

STRUCTURE:
- A full-screen layout centered both vertically and horizontally.
- Include a <canvas id="grid"> as a fixed background covering the entire viewport.
- A central container called ".text-block" with:
  - h1: "404"
  - h2: "Not Found"
  - p: descriptive error message


STYLE:
- Use system UI font stack
- Center everything using flexbox

TYPOGRAPHY:
- h1: 64px, bold, with hover scale effect (scale 1.3, smooth easing)
- h2: 24px, bold
- paragraph: 16px, normal weight, line-height 1.6
- container max width: 620px

SPACING:
- Use fixed spacing values (no CSS variables)
- Gap between elements: ~12px
- Padding: ~40px

CANVAS:
- Must be fixed (position: fixed)
- Full viewport size (100vw, 100vh)
- z-index behind content
- pointer-events: none

ANIMATION:
- Smooth hover effect on h1 using cubic-bezier(0.22, 1, 0.36, 1)
- No external frameworks required

EXTRA:
- Keep the code minimal, clean, and production-ready
- No CSS variables
- No frameworks
- Ensure proper layering (canvas behind, content above)

Output:
- Full HTML + CSS code
- Optional JS placeholder for canvas animation
```

---

Posteriormente, añadimos personalmente las variables, los imports y un botón de componentes que volviera a la homepage, con algunas correcciones mínimas de la IA por errores humanos, como fallos de escritura o un mal planteamiento de la lógica.

---

```css
@import url("reset.css");
@import url("theme.css");
@import url("base.css");
@import url("navigation.css");
@import url("layout.css");
@import url("components.css");

body {
  min-height: 100vh;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--color-bg);
  color: var(--color-text);
  overflow: hidden;
}

#grid {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  z-index: 0;
  pointer-events: none;
}

.text-block {
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);

  max-width: 620px;
  padding: var(--space-lg);
  text-align: center;

  color: var(--color-text);
}

/* TEXTO PEQUEÑO (muted) */
.text-block p {
  margin: 0;
  font-size: var(--text-sm);
  font-weight: 400;
  line-height: var(--leading-normal);
  letter-spacing: 0.01em;
  color: var(--color-text-muted);
}

/* TEXTO MEDIO */
.text-block h2 {
  margin: 0;
  font-size: var(--text-xl);
  font-weight: 700;
  line-height: var(--leading-normal);
  letter-spacing: 0.01em;
}

/* 404 GRANDE */
.text-block h1 {
  margin: 0;
  font-size: var(--text-4xl);
  line-height: var(--leading-normal);
  letter-spacing: 0.01em;
  transition: transform 0.3s var(--ease-out);
}

.text-block h1:hover {
  transform: scale(1.3);
}

/* BOTÓN */
.text-block .btn {
  margin-top: var(--space-lg);
}

/* CHARS (IMPORTANTE: heredan color) */
.char {
  display: inline-block;
  text-align: center;
  color: inherit;
  will-change: contents;
}

.no-scramble {
  display: inline;
}
```

---

Con toda la información anterior, planteamos un JS en paralelo, basado en la misma referencia de contenidos que queríamos aplicar, llamado Scramble, para los h2 y p.

---

```js
window.addEventListener("load", () => {
  const grid = document.getElementById("grid");

  if (grid) {
    const ctx = grid.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      grid.width = width * dpr;
      grid.height = height * dpr;

      grid.style.width = width + "px";
      grid.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const bg = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-bg")
        .trim();

      ctx.fillStyle = bg || "--color-bg";
      ctx.fillRect(0, 0, width, height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  }

  if (!window.gsap || !window.SplitText || !window.ScrambleTextPlugin) return;

  gsap.registerPlugin(SplitText, ScrambleTextPlugin);

  const root = document.getElementById("scrambledText");
  if (!root) return;

  const paragraph = root.querySelectorAll("p, h2");
  if (!paragraph) return;

  const radius = 60;
  const duration = 1.6;
  const speed = 0.15;
  const scrambleChars = ".:";

  const split = new SplitText(paragraph, {
    type: "words,chars",
    wordsClass: "word",
    charsClass: "char",
  });

  const chars = split.chars;

  chars.forEach((c) => {
    const original = c.textContent;

    gsap.set(c, {
      attr: { "data-content": original },
    });

    if (original.trim() === "") {
      c.classList.add("no-scramble");
      return;
    }

    const width = c.getBoundingClientRect().width;

    gsap.set(c, {
      width: width,
      minWidth: width,
      maxWidth: width,
    });
  });

  let lastTrigger = 0;

  root.addEventListener("pointermove", (e) => {
    const now = performance.now();
    if (now - lastTrigger < 30) return;
    lastTrigger = now;

    chars.forEach((c) => {
      if (c.classList.contains("no-scramble")) return;

      const rect = c.getBoundingClientRect();

      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        gsap.to(c, {
          overwrite: true,
          duration: duration * (1 - dist / radius),
          scrambleText: {
            text: c.dataset.content,
            chars: scrambleChars,
            speed: speed,
          },
          ease: "power2.out",
        });
      }
    });
  });
});
```

---

Después, creamos el js de canvas del principio con algunas correcciones manuales como añadir una transparencia al fondo para que en un futuro, al hacer los modos dark/light pudiese coexistir el canvas.

---

```js
window.addEventListener("load", () => {
  const grid = document.getElementById("grid");

  if (grid) {
    const ctx = grid.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      grid.width = width * dpr;
      grid.height = height * dpr;

      grid.style.width = width + "px";
      grid.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const bg = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-bg")
        .trim();

      ctx.fillStyle = bg || "--color-bg";
      ctx.fillRect(0, 0, width, height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  }

  if (!window.gsap || !window.SplitText || !window.ScrambleTextPlugin) return;

  gsap.registerPlugin(SplitText, ScrambleTextPlugin);

  const root = document.getElementById("scrambledText");
  if (!root) return;

  const paragraph = root.querySelectorAll("p, h2");
  if (!paragraph) return;

  const radius = 60;
  const duration = 1.6;
  const speed = 0.15;
  const scrambleChars = ".:";

  const split = new SplitText(paragraph, {
    type: "words,chars",
    wordsClass: "word",
    charsClass: "char",
  });

  const chars = split.chars;

  chars.forEach((c) => {
    const original = c.textContent;

    gsap.set(c, {
      attr: { "data-content": original },
    });

    if (original.trim() === "") {
      c.classList.add("no-scramble");
      return;
    }

    const width = c.getBoundingClientRect().width;

    gsap.set(c, {
      width: width,
      minWidth: width,
      maxWidth: width,
    });
  });

  let lastTrigger = 0;

  root.addEventListener("pointermove", (e) => {
    const now = performance.now();
    if (now - lastTrigger < 30) return;
    lastTrigger = now;

    chars.forEach((c) => {
      if (c.classList.contains("no-scramble")) return;

      const rect = c.getBoundingClientRect();

      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        gsap.to(c, {
          overwrite: true,
          duration: duration * (1 - dist / radius),
          scrambleText: {
            text: c.dataset.content,
            chars: scrambleChars,
            speed: speed,
          },
          ease: "power2.out",
        });
      }
    });
  });
});
```

---

### Prompt final

```txt
Create a JavaScript file for a 404 error page.

Requirements:

GENERAL:
- Use vanilla JavaScript.
- Run everything inside window.addEventListener("load", ...).
- The page contains a canvas with id="grid".
- The page also contains a text container with id="scrambledText".
- Do not use modules.
- Do not use frameworks.

CANVAS SETUP:
- Get the canvas using document.getElementById("grid").
- If the canvas exists:
  - Get its 2D context.
  - Support retina screens using window.devicePixelRatio.
  - Create a resizeCanvas() function.
  - Canvas size must always match the full viewport using window.innerWidth and window.innerHeight.
  - Set canvas.width and canvas.height multiplied by devicePixelRatio.
  - Set canvas.style.width and canvas.style.height in pixels.
  - Use ctx.setTransform(dpr, 0, 0, dpr, 0, 0).
  - Read the CSS variable --color-bg from :root using getComputedStyle(document.documentElement).
  - Use that value as the canvas background color.
  - Fill the full canvas with ctx.fillRect(0, 0, width, height).
  - Run resizeCanvas() once on load.
  - Re-run resizeCanvas() on window resize.

TEXT SCRAMBLE:
- Before doing text animation, check that gsap, SplitText and ScrambleTextPlugin exist on window.
- If any of them are missing, stop safely without errors.
- Register SplitText and ScrambleTextPlugin with gsap.registerPlugin().
- Select the root element #scrambledText.
- Inside it, select only p and h2 elements.
- Split those elements into words and characters using SplitText.
- Use:
  - type: "words,chars"
  - wordsClass: "word"
  - charsClass: "char"

CHARACTER PREPARATION:
- For every character:
  - Store its original textContent inside data-content.
  - If the character is whitespace, add the class "no-scramble" and skip it.
  - Measure its width with getBoundingClientRect().
  - Lock its width, minWidth and maxWidth using GSAP so the text does not jump during scrambling.

SCRAMBLE INTERACTION:
- Add a pointermove listener to #scrambledText.
- Throttle the pointermove effect so it only runs every 30ms.
- For every character:
  - Skip characters with class "no-scramble".
  - Calculate the distance between the pointer and the center of the character.
  - Use a radius of 60px.
  - If the pointer is inside the radius, animate that character with gsap.to().
  - Use overwrite: true.
  - Duration should be 1.6 * (1 - dist / radius).
  - Use ScrambleTextPlugin with:
    - text: original character stored in data-content
    - chars: ".:"
    - speed: 0.15
  - Use ease: "power2.out".

OUTPUT:
- Return only the complete JavaScript code.
- Keep it clean, commented only where useful, and production-ready.
```

---

Finalmente, pusimos el Html manualmente con todos los metadatos, favicon, scripts etc y lo hicimos funcionar para generar la página.
