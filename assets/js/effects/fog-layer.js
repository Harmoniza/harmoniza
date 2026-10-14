/* =========================================
   FOG LAYER SYSTEM
========================================= */

class FogLayer {

  constructor(element) {

    this.element = element;

    this.intensity = 1;
    this.depth = 1;

  }

  setIntensity(value) {
    this.intensity = value;
  }

  setDepth(value) {
    this.depth = value;
  }

  update(wind) {

    if (!this.element) return;

    const offsetX =
      wind.x * 20 * this.depth;

    const offsetY =
      wind.y * 10 * this.depth;

    this.element.style.transform =
      `translate(${offsetX}px, ${offsetY}px) scale(1.05)`;

    this.element.style.opacity =
      0.3 * this.intensity;

  }
}

window.FogLayer = FogLayer;