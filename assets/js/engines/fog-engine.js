/* =========================================
   HARMONIZA FOG ENGINE
========================================= */

class FogEngine {

  constructor(selector = ".scene-fog") {
    this.fog = document.querySelector(selector);

    this.offset = 0;

    this.animate();
  }

  animate() {

    if (!this.fog) return;

    this.offset += 0.02;

    const x =
      Math.sin(this.offset) * 20;

    const y =
      Math.cos(this.offset * 0.5) * 10;

    this.fog.style.transform =
      `translate(${x}px, ${y}px)`;

    requestAnimationFrame(
      this.animate.bind(this)
    );

  }

}

window.FogEngine = FogEngine;