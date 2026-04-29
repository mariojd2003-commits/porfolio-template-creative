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
    charsClass: "char"
  });

  const chars = split.chars;

  chars.forEach(c => {
    const original = c.textContent;

    gsap.set(c, {
      attr: { "data-content": original }
    });

    if (original.trim() === "") {
      c.classList.add("no-scramble");
      return;
    }

    const width = c.getBoundingClientRect().width;

    gsap.set(c, {
      width: width,
      minWidth: width,
      maxWidth: width
    });
  });

  let lastTrigger = 0;

  root.addEventListener("pointermove", e => {
    const now = performance.now();
    if (now - lastTrigger < 30) return;
    lastTrigger = now;

    chars.forEach(c => {
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
            speed: speed
          },
          ease: "power2.out"
        });
      }
    });
  });
});