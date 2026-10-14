/* =========================================
   PARTICLE BRIDGE CONTROLLER v1
   Harmoniza Cinematic System Layer
========================================= */

class ParticleBridgeController {

  constructor(sceneEngine, particleEngine) {

    this.scene = sceneEngine;
    this.particles = particleEngine;

    this.enabled = true;

    this.densityMultiplier = 1;
    this.type = "dust";
  }

  /* -------------------------------------
     SYNC FROM SCENE ENGINE
  ------------------------------------- */

  update(windVector) {

    if (!this.enabled) return;
    if (!this.particles) return;

    /* -----------------------------
       1. WIND SYNC
    ----------------------------- */

    const wind = windVector || this.scene.getWindVector?.() || {
      x: 0,
      y: 0
    };

    /* -----------------------------
       2. ATMOSPHERIC DENSITY SYNC
    ----------------------------- */

    const density =
      this.scene.atmosphere?.particleDensity ?? 0.5;

    const mappedDensity =
      Math.floor(80 + density * 180 * this.densityMultiplier);

    this.particles.setDensity(mappedDensity);

    /* -----------------------------
       3. TYPE SYNC (SCENE BASED)
    ----------------------------- */

    const sceneType =
      this.scene.currentScene;

    switch (sceneType) {

      case "rain":
        this.setType("rain");
        break;

      case "forest-drift":
        this.setType("pollen");
        break;

      case "night-study":
        this.setType("dust");
        break;

      default:
        this.setType("dust");
    }

    /* -----------------------------
       4. UPDATE PARTICLE ENGINE
    ----------------------------- */

    this.particles.update(wind);
  }

  /* -------------------------------------
     TYPE CONTROL
  ------------------------------------- */

  setType(type) {

    if (this.type === type) return;

    this.type = type;

    this.particles.setType(type);
  }

  /* -------------------------------------
     ENABLE / DISABLE
  ------------------------------------- */

  setEnabled(state) {
    this.enabled = state;
  }
}

window.ParticleBridgeController = ParticleBridgeController;