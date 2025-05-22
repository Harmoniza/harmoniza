---
layout: default
title: Home
---

<div class="home-container">
  <header class="home-header centered">
    <h1 class="main-title">Welcome to Harmoniza</h1>
    <p class="description">
      Discover a wide range of high-quality, royalty-free music tracks and resources designed to elevate your projects.
      Pay what you want — empower your creativity.
    </p>
    <a href="/full_tracks/" class="browse-full-tracks-button funky-btn">🎧 Browse Full Tracks</a>
  </header>

  <section class="explore-sections centered">
    <h2>Explore Our Sections</h2>
    <div class="section-grid">
      {% assign sections = site.data.sections %}
      <div class="section-card"><h3>Loops & Beats</h3><p>Seamless rhythm loops and punchy beats.</p><a href="/tools_and_resources/loops_and_beats/" class="section-link funky-btn">Explore</a></div>
      <div class="section-card"><h3>Chord Progressions</h3><p>Inspiring and smooth chord sequences.</p><a href="/tools_and_resources/chord_progressions/" class="section-link funky-btn">Explore</a></div>
      <div class="section-card"><h3>Sound Effects</h3><p>Layer your mix with detailed sound textures.</p><a href="/tools_and_resources/sound_effects/" class="section-link funky-btn">Explore</a></div>
      <div class="section-card"><h3>Vocals</h3><p>Unique vocal samples and hooks.</p><a href="/tools_and_resources/vocals/" class="section-link funky-btn">Explore</a></div>
      <div class="section-card"><h3>Full Tracks</h3><p>Complete songs for creators and listeners.</p><a href="/full_tracks/" class="section-link funky-btn">Explore</a></div>
      <div class="section-card"><h3>Templates & Assets</h3><p>Social media, web, and audio visuals.</p><a href="/tools_and_resources/templates_and_assets/" class="section-link funky-btn">Explore</a></div>
    </div>
  </section>

  <section class="subscribe-section centered">
    <h2>Stay Tuned for Updates!</h2>
    <p>Join our email list and never miss a drop.</p>
    <form class="subscribe-form" action="https://docs.google.com/forms/d/e/[YOUR_GOOGLE_FORM_ID]/formResponse" method="post" target="_blank">
      <input type="email" id="email" name="entry.YOUR_ENTRY_ID" placeholder="Enter your email" required class="subscribe-input">
      <button type="submit" class="subscribe-button funky-btn">Subscribe</button>
    </form>
  </section>

  <div class="contact-us bold-style centered">
  <h2>Contact Us</h2>
  <p>Email us at <a href="mailto:el602444@gmail.com">el602444@gmail.com</a></p>
</div>
