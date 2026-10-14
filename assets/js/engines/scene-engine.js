/* =========================================
   HARMONIZA SCENE ENGINE v5
   Persistent Atmospheric Runtime
========================================= */

class HarmonizaSceneEngine {

  constructor() {

    this.scenes = {};
    this.currentScene = null;

    this.audioLayers = {
      rain: null,
      birds: null,
      wind: null
    };

    this.globalVolume = 0.5;

    /* =====================================
   CINEMATIC SYSTEM
===================================== */

this.fogLayer = null;
this.particleLayer = null;
this.lightingLayer = null;
this.transitionLayer = null;

/* 🌫 NEW PARTICLE ENGINE */
this.particleEngine = null;

/* 🌉 PARTICLE BRIDGE CONTROLLER (14E) */
this.particleBridge = null;

/* 🌫 CINEMATIC PULSE (14F) */
this.cinematicPulse = null;

/* 🌬 MODULAR WIND FIELD */
this.windField = null;

/* 🌬 FALLBACK WIND */
this.wind = {
  x: 0,
  y: 0,
  strength: 0.3
};

this.time = 0;
this.isTransitioning = false;

/* =====================================
   PERSISTENT ATMOSPHERIC STATE
===================================== */

this.atmosphere = {

  fogIntensity: 0.5,
  particleDensity: 0.5,
  lightingStrength: 0.5,

  targetFog: 0.5,
  targetParticles: 0.5,
  targetLighting: 0.5
};

/* 🌐 15A HYBRID ATMOSPHERE PROFILE */

this.atmosphereProfile = {

  globalBlend: 0.6,
  uiBoost: 0.0,
  sceneLock: false,

  /* 🌫 15B ADDITIONS */
  sceneBlend: 1.0,
  sceneResponse: 1.0

};

/* 🎧 AUDIO CROSSFADE */
this.audioFades = {
  rain: { target: 0, current: 0 },
  birds: { target: 0, current: 0 },
  wind: { target: 0, current: 0 }
};

this.fadeSpeed = 0.02;

this.init();
  }

  /* -------------------------------------
     INIT
  ------------------------------------- */

  init() {

    this.cacheAudio();

    this.bindGlobalControls();
    this.bindAmbientButtons();

    this.initCinematicSystem();

    this._startAudioCrossfadeLoop();
  }

  initCinematicSystem() {

  this.fogLayer =
    document.querySelector(".cinematic-fog");

  this.particleLayer =
    document.querySelector(".cinematic-particles");

  this.lightingLayer =
    document.querySelector(".cinematic-lighting");

  this.transitionLayer =
    document.querySelector(".scene-transition");

  /* 🌬 INIT WIND FIELD */
  if (window.WindField) {

    this.windField =
      new window.WindField({
        strength: 0.3
      });
  }

  /* 🌫 PARTICLE ENGINE (CANVAS) */
  const particleCanvas =
    document.getElementById("particleCanvas");

  if (
    particleCanvas &&
    window.ParticleField
  ) {

    this.particleEngine =
      new window.ParticleField(
        particleCanvas,
        {
          count: 140,
          type: "dust",
          windInfluence: 1
        }
      );
  }

  /* 🌉 PARTICLE BRIDGE (14E) */
  if (
    window.ParticleBridgeController &&
    this.particleEngine
  ) {

    this.particleBridge =
      new window.ParticleBridgeController(
        this,
        this.particleEngine
      );
  }

  /* 🌫 CINEMATIC PULSE (14F) */
  if (window.CinematicPulse) {

    this.cinematicPulse =
      new window.CinematicPulse(this);
  }

  this.startCinematicLoop();
}

  /* -------------------------------------
   MAIN RENDER LOOP
------------------------------------- */

startCinematicLoop() {

  const loop = () => {

    this.time += 0.01;

    /* 🌬 UPDATE WIND FIELD */

    if (this.windField) {

      this.windField.update(this.time);

    } else {

      this.updateWindField();
    }

    /* 🌐 15A HYBRID UPDATE PIPELINE */

this.updateAtmosphereHybrid();

this.updateFog();

    /* 🌉 PARTICLE BRIDGE */

    if (this.particleBridge) {

      this.particleBridge.update(
        this.getWindVector()
      );

    } else {

      this.updateParticles();
    }

    this.updateLighting();

    requestAnimationFrame(loop);
  };

  loop();
}

  
/* -------------------------------------
   FALLBACK WIND SYSTEM
------------------------------------- */

updateWindField() {

  this.wind.x =
    Math.sin(this.time * 0.5) *
    this.wind.strength;

  this.wind.y =
    Math.cos(this.time * 0.3) *
    this.wind.strength;
}

/* -------------------------------------
   15A HYBRID ATMOSPHERE ENGINE (15B UPGRADED)
------------------------------------- */

updateAtmosphereHybrid() {

  const a = this.atmosphere;
  const p = this.atmosphereProfile;

  if (p.sceneLock) return;

  /* 🌐 SCENE PERSONALITY FACTOR (15B CORE) */
  const sceneBlend = p.sceneBlend ?? 1.0;
  const sceneResponse = p.sceneResponse ?? 1.0;

  /* 🌫 BASE UI + SCENE INFLUENCE */
  const blend =
    (p.globalBlend + p.uiBoost) *
    sceneBlend *
    sceneResponse;

  /* 🛡 SAFETY CLAMP */
  const finalBlend =
    Math.min(
      Math.max(blend, 0),
      2
    );

  /* 🌫 ATMOSPHERE INTERPOLATION */

  a.fogIntensity +=
    (a.targetFog - a.fogIntensity)
    * 0.02
    * finalBlend;

  a.particleDensity +=
    (a.targetParticles - a.particleDensity)
    * 0.02
    * finalBlend;

  a.lightingStrength +=
    (a.targetLighting - a.lightingStrength)
    * 0.02
    * finalBlend;
}

/* -------------------------------------
   15A UI ATMOSPHERE INFLUENCE
------------------------------------- */

applyUIAtmosphereBoost(amount = 0.2) {

  if (!this.atmosphereProfile) return;

  this.atmosphereProfile.uiBoost = amount;
}

/* -------------------------------------
   15A CLEAR UI INFLUENCE
------------------------------------- */

clearUIAtmosphereBoost() {

  if (!this.atmosphereProfile) return;

  this.atmosphereProfile.uiBoost = 0;
}

/* -------------------------------------
   GET ACTIVE WIND VECTOR
------------------------------------- */

getWindVector() {

  if (this.windField) {
    return this.windField.getVector();
  }

  return this.wind;
}

/* -------------------------------------
   FOG SYSTEM
------------------------------------- */

updateFog() {

  if (!this.fogLayer) return;

  const wind =
    this.getWindVector();

  const offsetX =
    wind.x * 20;

  const offsetY =
    wind.y * 10;

  const intensity =
    this.atmosphere.fogIntensity;

  this.fogLayer.style.transform =
    `translate(${offsetX}px, ${offsetY}px)
     scale(${1.02 + intensity * 0.08})`;

  this.fogLayer.style.opacity =
    0.2 + intensity * 0.6;
}

/* -------------------------------------
   PARTICLE SYSTEM (UPDATED + BRIDGE SAFE)
------------------------------------- */

updateParticles() {

  const wind =
    this.getWindVector();

  /* 🌫 OPTIONAL DOM MOTION LAYER */
  if (this.particleLayer) {

    const driftX =
      wind.x * 40;

    const driftY =
      wind.y * 20;

    this.particleLayer.style.transform =
      `translate(${driftX}px, ${driftY}px)`;

    this.particleLayer.style.opacity =
      this.atmosphere.particleDensity * 0.35;
  }

  /* 🌫 REAL PARTICLE ENGINE (CANVAS SYSTEM) */
  if (this.particleEngine) {
    this.particleEngine.update(wind);
    this.particleEngine.render();
  }

  /* 🌉 BRIDGE CONTROLLER (SAFE 14E HOOK) */
  if (this.particleBridge) {
    this.particleBridge.update(wind);
  }
}

/* -------------------------------------
   LIGHTING SYSTEM
------------------------------------- */

updateLighting() {

  if (!this.lightingLayer) return;

  const pulse =
    0.5 +
    Math.sin(this.time * 0.8) * 0.1;

  const strength =
    this.atmosphere.lightingStrength;

  this.lightingLayer.style.opacity =
    pulse * strength;
}

  /* -------------------------------------
     AUDIO CACHE
  ------------------------------------- */

  cacheAudio() {

    this.audioLayers.rain =
      document.getElementById("rainAudio");

    this.audioLayers.birds =
      document.getElementById("birdsAudio");

    this.audioLayers.wind =
      document.getElementById("windAudio");

    Object.values(this.audioLayers)
      .forEach(audio => {

        if (!audio) return;

        audio.loop = true;
        audio.volume = 0;

      });
  }

  /* -------------------------------------
     AUDIO CROSSFADE LOOP
  ------------------------------------- */

  _startAudioCrossfadeLoop() {

    if (this._audioLoopRunning) return;

    this._audioLoopRunning = true;

    const loop = () => {

      Object.keys(this.audioLayers)
        .forEach(key => {

          const audio =
            this.audioLayers[key];

          const fade =
            this.audioFades[key];

          if (!audio || !fade) return;

          fade.current +=
            (fade.target - fade.current) *
            this.fadeSpeed;

          audio.volume =
            fade.current *
            this.globalVolume;
        });

      requestAnimationFrame(loop);
    };

    loop();
  }

  /* -------------------------------------
   SCENE SYSTEM
------------------------------------- */

registerScene(name, config) {

  this.scenes[name] = config;
}

loadScene(name) {

  if (this.isTransitioning) return;

  const scene =
    this.scenes[name];

  if (!scene) return;

  this.beginTransition();

  setTimeout(() => {

    this.currentScene = name;

    this.applyAudio(scene.audio || {});
    this.applyVisuals(scene.visual || {});

    /* 🌫 ATMOSPHERIC TARGETS */

    this.atmosphere.targetFog =
      scene.visual?.fogIntensity ?? 0.5;

    this.atmosphere.targetParticles =
      scene.visual?.particleDensity ?? 0.5;

    this.atmosphere.targetLighting =
      scene.visual?.lightingStrength ?? 0.5;

    /* 🌬 SCENE WIND CONTROL */

    if (
      scene.visual?.windStrength !== undefined
    ) {

      if (this.windField) {

        this.windField.setStrength(
          scene.visual.windStrength
        );

      } else {

        this.wind.strength =
          scene.visual.windStrength;
      }
    }

    /* 🌫 PARTICLE TYPE SWITCHING */

    if (this.particleEngine) {

      if (name === "rain") {

        this.particleEngine.setType("rain");
        this.particleEngine.setDensity(180);

      } else if (name === "forest-drift") {

        this.particleEngine.setType("dust");
        this.particleEngine.setDensity(120);

      } else {

        this.particleEngine.setType("dust");
        this.particleEngine.setDensity(100);
      }
    }

    this.endTransition();

  }, 800);
}

/* -------------------------------------
   TRANSITIONS
------------------------------------- */

beginTransition() {

  this.isTransitioning = true;

  document.body.classList.add(
    "scene-transitioning"
  );

  if (this.transitionLayer) {

    this.transitionLayer.classList.add(
      "transition-active"
    );
  }

  document.body.style.transition =
    "filter 1s ease";

  document.body.style.filter =
    "brightness(0.72) saturate(0.85)";
}

endTransition() {

  setTimeout(() => {

    document.body.classList.remove(
      "scene-transitioning"
    );

    if (this.transitionLayer) {

      this.transitionLayer.classList.remove(
        "transition-active"
      );
    }

    document.body.style.filter =
      "brightness(1) saturate(1)";

    this.isTransitioning = false;

  }, 700);
}

/* -------------------------------------
   VISUAL ENGINE
------------------------------------- */

applyVisuals(config) {

  document.body.dataset.scene =
    this.currentScene;

  if (config.type) {

    document.body.dataset.sceneType =
      config.type;
  }
}

/* -------------------------------------
   AUDIO CONTROL
------------------------------------- */

applyAudio(audioConfig) {

  Object.entries(this.audioLayers)
    .forEach(([key, audio]) => {

      if (!audio) return;

      const enabled =
        audioConfig[key];

      audio.play().catch(() => {});

      this.audioFades[key].target =
        enabled ? 1 : 0;
    });
}

toggleAudio(soundName, buttonElement) {

  const fade =
    this.audioFades[soundName];

  if (!fade) return;

  const isActive =
    fade.target > 0;

  fade.target =
    isActive ? 0 : 1;

  if (buttonElement) {

    buttonElement.classList.toggle(
      "active"
    );

    buttonElement.textContent =
      isActive ? "Play" : "Pause";
  }
}

setVolume(value) {

  this.globalVolume = value;
}

/* -------------------------------------
   UI SYSTEM
------------------------------------- */

bindGlobalControls() {

  const volumeSlider =
    document.getElementById(
      "volumeControl"
    );

  if (volumeSlider) {

    volumeSlider.addEventListener(
      "input",
      (e) => {

        this.setVolume(
          e.target.value
        );
      }
    );
  }
}

bindAmbientButtons() {

  const soundButtons =
    document.querySelectorAll(
      ".sound-btn"
    );

  soundButtons.forEach(button => {

    /* CLICK */

    button.addEventListener(
      "click",
      () => {

        const sound =
          button.dataset.sound;

        this.toggleAudio(
          sound,
          button
        );

        /* 🌫 15A PREMIUM UI REACTION */

        this.applyUIAtmosphereBoost(
          0.25
        );

        setTimeout(() => {

          this.clearUIAtmosphereBoost();

        }, 1200);

      }
    );

    /* HOVER */

    button.addEventListener(
      "mouseenter",
      () => {

        this.applyUIAtmosphereBoost(
          0.08
        );

      }
    );

    button.addEventListener(
      "mouseleave",
      () => {

        this.clearUIAtmosphereBoost();

      }
    );

  });
}
}

/* =========================================
   ENGINE INIT
========================================= */

window.addEventListener(
  "DOMContentLoaded",
  () => {

    window.SceneEngine =
      new HarmonizaSceneEngine();

    /* 🌧 RAIN SCENE */

    SceneEngine.registerScene(
      "rain",
      {
        audio: {
          rain: true,
          birds: false,
          wind: false
        },

        visual: {
          type: "2d-rain",
          windStrength: 0.25,

          fogIntensity: 0.7,
          particleDensity: 0.45,
          lightingStrength: 0.5,

          /* 🌫 15B SCENE PERSONALITY */
          atmosphereBlend: 0.5,
          atmosphereResponse: 0.015
        }
      }
    );

    /* 🌲 FOREST DRIFT */

    SceneEngine.registerScene(
      "forest-drift",
      {
        audio: {
          rain: false,
          birds: true,
          wind: true
        },

        visual: {
          type: "forest-cinematic",
          windStrength: 0.6,

          fogIntensity: 0.85,
          particleDensity: 0.8,
          lightingStrength: 0.4,

          /* 🌫 15B SCENE PERSONALITY */
          atmosphereBlend: 0.9,
          atmosphereResponse: 0.03
        }
      }
    );

    SceneEngine.loadScene("rain");
  }
);