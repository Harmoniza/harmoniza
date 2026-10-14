/* =========================================
   LIGHT PULSE SYSTEM
========================================= */

class LightPulse {

  constructor(element) {

    this.element = element;

    this.mood = "default";

  }

  setMood(mood) {
    this.mood = mood;
  }

  update(time) {

    if (!this.element) return;

    let pulse =
      0.5 + Math.sin(time * 0.8) * 0.1;

    if (this.mood === "deep-forest") {

      pulse =
        0.35 + Math.sin(time * 0.5) * 0.15;

    }

    this.element.style.opacity = pulse;

  }
}

window.LightPulse = LightPulse;