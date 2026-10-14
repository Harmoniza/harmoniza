"use strict";

/* =========================================
   FOREST DRIFT V2 SCENE MODULE (CLEAN)
========================================= */
window.addEventListener("DOMContentLoaded", function () {
  var waitForEngine = function waitForEngine() {
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
      var fog = this.fogLayer;
      var particles = this.particleLayer;
      var lighting = this.lightingLayer;
      if (!fog || !particles || !lighting) return;
      var wind = this.windField ? this.windField.getVector() : this.wind;
      var windX = wind.x;
      var windY = wind.y;
      /* 🌫 FOG */

      fog.style.transform = "translate(".concat(windX * 30, "px, ").concat(windY * 15, "px) scale(1.1)");
      fog.style.opacity = 0.4 + Math.abs(windX * 0.5);
      /* 🌲 PARTICLES */

      particles.style.transform = "translate(".concat(windX * 60, "px, ").concat(windY * 25, "px)");
      /* 🌗 LIGHT */

      lighting.style.opacity = 0.45 + Math.sin(this.time * 0.5) * 0.15;
      document.body.style.filter = "contrast(1.05) saturate(1.1)";
    };
  };

  waitForEngine();
});
//# sourceMappingURL=forest-drift.dev.js.map
