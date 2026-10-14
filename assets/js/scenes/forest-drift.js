/* =========================================
   FOREST DRIFT V2 SCENE MODULE (CLEAN)
========================================= */

window.addEventListener("DOMContentLoaded", () => {

  const waitForEngine = () => {

    if (!window.SceneEngine) {
      requestAnimationFrame(waitForEngine);
      return;
    }

    /* ❌ REMOVED:
       SceneEngine.registerScene(...)
       (now handled in scene-engine.js)
    */

    /* -------------------------------------
       FOREST DRIFT ACTIVE BEHAVIOR HOOK
    ------------------------------------- */

    window.SceneEngine.onForestUpdate = function () {

      const fog = this.fogLayer;
      const particles = this.particleLayer;
      const lighting = this.lightingLayer;

      if (!fog || !particles || !lighting) return;

      const wind =
        this.windField
          ? this.windField.getVector()
          : this.wind;

      const windX = wind.x;
      const windY = wind.y;

      /* 🌫 FOG */

      fog.style.transform =
        `translate(${windX * 30}px, ${windY * 15}px) scale(1.1)`;

      fog.style.opacity =
        0.4 + Math.abs(windX * 0.5);

      /* 🌲 PARTICLES */

      particles.style.transform =
        `translate(${windX * 60}px, ${windY * 25}px)`;

      /* 🌗 LIGHT */

      lighting.style.opacity =
        0.45 + Math.sin(this.time * 0.5) * 0.15;

      document.body.style.filter =
        `contrast(1.05) saturate(1.1)`;

    };

  };

  waitForEngine();

});