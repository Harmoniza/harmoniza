/* =========================================
   HARMONIZA SCENE LOADER v1
   Safe scene bootstrap system
========================================= */

window.SceneLoader = {

  init(sceneName) {

    if (
      !window.SceneEngine ||
      !window.SceneEngine.loadScene
    ) {

      console.warn(
        "SceneEngine not ready, retrying..."
      );

      requestAnimationFrame(() =>
        this.init(sceneName)
      );

      return;
    }

    const waitForEngine = () => {

      if (!window.SceneEngine.currentScene) {

        requestAnimationFrame(
          waitForEngine
        );

        return;
      }

      console.log(
        "🎬 Scene Loader Active:",
        sceneName
      );

      window.SceneEngine.loadScene(
        sceneName
      );

    };

    waitForEngine();

  }

};