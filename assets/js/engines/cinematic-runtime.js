/* =========================================
   HARMONIZA CINEMATIC RUNTIME v2
   Modular Rendering Pipeline
========================================= */

class CinematicRuntime {

  constructor(engine) {

    this.engine = engine;

    this.modules = {
      wind: null,
      fog: null,
      particles: null,
      lighting: null
    };

  }

  /* ---------------------------
     MODULE REGISTRATION
  --------------------------- */

  registerModules(modules) {

    this.modules = {
      ...this.modules,
      ...modules
    };

  }

  /* ---------------------------
     RUNTIME UPDATE LOOP
  --------------------------- */

  update(time) {

    const wind =
      this.modules.wind?.getVector?.()
      || { x: 0, y: 0 };

    /* 🌫 FOG */
    if (this.modules.fog?.update) {
      this.modules.fog.update(wind);
    }

    /* ✨ PARTICLES */
    if (this.modules.particles?.update) {
      this.modules.particles.update(wind);
    }

    /* 🌗 LIGHTING */
    if (this.modules.lighting?.update) {
      this.modules.lighting.update(time, wind);
    }

  }
}