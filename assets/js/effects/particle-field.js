/* =========================================
   HARMONIZA — PARTICLE ENGINE v2 (14A CORE)
   Cinematic Atmospheric Particle System
========================================= */

class ParticleField {

  constructor(canvas, options = {}) {

    this.canvas = canvas;
    this.ctx = canvas?.getContext("2d");

    this.particles = [];

    this.count = options.count || 120;
    this.type = options.type || "dust";

    this.windInfluence = options.windInfluence ?? 1;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.dpr = window.devicePixelRatio || 1;

    this.running = false;

    this.init();

    window.addEventListener("resize", () => this.resize());

  }

  /* ---------------------------------
     INITIALIZE
  --------------------------------- */

  init() {

    if (!this.canvas) return;

    this.resize();

    this.createParticles();

    this.running = true;

    this.loop();

  }

  /* ---------------------------------
     RESIZE HANDLING
  --------------------------------- */

  resize() {

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    if (!this.canvas) return;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;

    this.ctx.scale(this.dpr, this.dpr);

  }

  /* ---------------------------------
     PARTICLE CREATION
  --------------------------------- */

  createParticles() {

    this.particles = [];

    for (let i = 0; i < this.count; i++) {

      this.particles.push(this.spawnParticle());

    }

  }

  spawnParticle() {

    const types = {

      dust: {
        size: [0.5, 2],
        speed: [0.2, 0.8],
        alpha: [0.1, 0.4]
      },

      rain: {
        size: [1, 2],
        speed: [4, 10],
        alpha: [0.2, 0.6]
      },

      embers: {
        size: [1, 3],
        speed: [0.3, 1.2],
        alpha: [0.3, 0.8]
      },

      pollen: {
        size: [1, 2],
        speed: [0.1, 0.5],
        alpha: [0.2, 0.5]
      },

      fog: {
        size: [10, 40],
        speed: [0.05, 0.2],
        alpha: [0.02, 0.08]
      }

    };

    const t = types[this.type] || types.dust;

    return {

      x: Math.random() * this.width,
      y: Math.random() * this.height,

      vx: 0,
      vy: Math.random() * (t.speed[1] - t.speed[0]) + t.speed[0],

      size: Math.random() * (t.size[1] - t.size[0]) + t.size[0],

      alpha: Math.random() * (t.alpha[1] - t.alpha[0]) + t.alpha[0],

      life: Math.random() * 100,

      decay: Math.random() * 0.005 + 0.002

    };

  }

  /* ---------------------------------
     UPDATE SYSTEM
  --------------------------------- */

  update() {

    const wind =
      window.SceneEngine?.windField?.getVector()
      || { x: 0, y: 0 };

    for (let p of this.particles) {

      // WIND INFLUENCE
      p.vx += wind.x * this.windInfluence * 0.05;
      p.vy += wind.y * this.windInfluence * 0.02;

      // MOTION
      p.x += p.vx;
      p.y += p.vy;

      // LIFE CYCLE
      p.life -= p.decay;

      // RESET PARTICLE
      if (
        p.y > this.height ||
        p.x > this.width ||
        p.life <= 0
      ) {
        Object.assign(p, this.spawnParticle());
        p.y = 0;
      }

    }

  }

  /* ---------------------------------
     RENDER SYSTEM
  --------------------------------- */

  render() {

    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let p of this.particles) {

      this.ctx.beginPath();

      this.ctx.fillStyle =
        `rgba(255,255,255,${p.alpha})`;

      this.ctx.arc(
        p.x,
        p.y,
        p.size,
        0,
        Math.PI * 2
      );

      this.ctx.fill();

    }

  }

  /* ---------------------------------
     MAIN LOOP
  --------------------------------- */

  loop() {

    if (!this.running) return;

    this.update();
    this.render();

    requestAnimationFrame(() => this.loop());

  }

  /* ---------------------------------
     TYPE SWITCHING (SCENES)
  --------------------------------- */

  setType(type) {

    this.type = type;

    this.createParticles();

  }

  setDensity(count) {

    this.count = count;

    this.createParticles();

  }

}

/* GLOBAL EXPORT */
window.ParticleField = ParticleField;