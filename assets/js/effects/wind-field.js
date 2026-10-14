/* =========================================
   HARMONIZA WIND FIELD SYSTEM v1.1
   Physics-based ambient wind engine
========================================= */

class WindField {

  constructor(options = {}) {

    this.strength = options.strength ?? 0.3;

    this.x = 0;
    this.y = 0;

    this.time = 0;

    // optional future expansion hooks
    this.noiseOffset = options.noiseOffset ?? 0;

  }

  update(time) {

    this.time = time;

    this.x =
      Math.sin(this.time * 0.5 + this.noiseOffset) * this.strength;

    this.y =
      Math.cos(this.time * 0.3 + this.noiseOffset) * this.strength;
  }

  getVector() {
    return { x: this.x, y: this.y };
  }

  setStrength(value) {
    this.strength = value;
  }

}