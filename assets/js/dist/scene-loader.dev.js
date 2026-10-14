"use strict";

/* =========================================
   HARMONIZA SCENE LOADER v1
   Safe scene bootstrap system
========================================= */
window.SceneLoader = {
  init: function init(sceneName) {
    var _this = this;

    if (!window.SceneEngine || !window.SceneEngine.loadScene) {
      console.warn("SceneEngine not ready, retrying...");
      requestAnimationFrame(function () {
        return _this.init(sceneName);
      });
      return;
    }

    var waitForEngine = function waitForEngine() {
      if (!window.SceneEngine.currentScene) {
        requestAnimationFrame(waitForEngine);
        return;
      }

      console.log("🎬 Scene Loader Active:", sceneName);
      window.SceneEngine.loadScene(sceneName);
    };

    waitForEngine();
  }
};
//# sourceMappingURL=scene-loader.dev.js.map
