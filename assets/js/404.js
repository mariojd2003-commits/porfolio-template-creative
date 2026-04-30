class DotGrid {
  constructor(container = "grid") {
    this.canvasElement = document.getElementById(container);
    this.ctx = this.canvasElement.getContext("2d", { alpha: true });

    this.dpr = window.devicePixelRatio || 1;

    this.width = 0;
    this.height = 0;

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;

    this.baseColor = [55, 51, 68];
    this.activeColor = [82, 39, 255];

    this.gap = 31;
    this.dotSize = 1.4;
    this.proximity = 180;
    this.repulsionStrength = 16;
    this.mouseSmoothness = 0.08;

    this.resize();

    this.mouseX = this.width * 0.75;
    this.mouseY = this.height * 0.35;
    this.targetX = this.mouseX;
    this.targetY = this.mouseY;

    this.bindEvents();
    this.animate();
  }

  resize() {
    const rect = this.canvasElement.getBoundingClientRect();

    this.width = rect.width;
    this.height = rect.height;

    this.canvasElement.width = this.width * this.dpr;
    this.canvasElement.height = this.height * this.dpr;

    this.canvasElement.style.width = this.width + "px";
    this.canvasElement.style.height = this.height + "px";

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  bindEvents() {
    window.addEventListener("resize", () => this.resize());

    window.addEventListener("mousemove", (e) => {
      const rect = this.canvasElement.getBoundingClientRect();

      this.targetX = e.clientX - rect.left;
      this.targetY = e.clientY - rect.top;
    });
  }

  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  mixColor(c1, c2, amount) {
    const r = Math.round(this.lerp(c1[0], c2[0], amount));
    const g = Math.round(this.lerp(c1[1], c2[1], amount));
    const b = Math.round(this.lerp(c1[2], c2[2], amount));
    return `rgb(${r}, ${g}, ${b})`;
  }

  draw() {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.width, this.height);

    this.mouseX = this.lerp(this.mouseX, this.targetX, this.mouseSmoothness);
    this.mouseY = this.lerp(this.mouseY, this.targetY, this.mouseSmoothness);

    for (let x = 22; x < this.width; x += this.gap) {
      for (let y = 14; y < this.height; y += this.gap) {
        const dx = x - this.mouseX;
        const dy = y - this.mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        const influence = Math.max(0, 1 - dist / this.proximity);
        const eased = influence * influence * (3 - 2 * influence);

        const forceX = (dx / dist) * eased * this.repulsionStrength;
        const forceY = (dy / dist) * eased * this.repulsionStrength;

        const finalX = x + forceX;
        const finalY = y + forceY;

        const dotRadius = this.dotSize + eased * 1.2;
        const alpha = 0.45 + eased * 0.55;

        ctx.beginPath();
        ctx.arc(finalX, finalY, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.mixColor(this.baseColor, this.activeColor, eased);
        ctx.globalAlpha = alpha;
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

window.addEventListener("load", () => {
  const canvas = document.getElementById("grid");

  if (!canvas) {
    console.error("No existe el canvas #grid");
    return;
  }

  new DotGrid("grid");
});