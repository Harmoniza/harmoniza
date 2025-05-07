---
layout: page
title: Blog
permalink: /blog/
---

# Blog & Updates

Welcome to the Harmoniza blog — a space where I share music updates, creative insights, new releases, and behind-the-scenes moments.

Even as a solo artist, I believe in transparency, connection, and storytelling. Here, you’ll find posts about the journey, upcoming projects, featured tracks, and resources for fellow creators.

---

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> — {{ post.date | date: "%B %d, %Y" }}
    </li>
  {% endfor %}
</ul>

<!-- Support Harmoniza Section -->
<div class="support-harmoniza bold-style">
  <h2>Support Harmoniza</h2>
  <p>If you find these resources helpful, consider supporting us with a small donation. Your contributions allow us to keep providing valuable tools and sounds.</p>
  <form action="/donate" method="post">
    <label for="amount">Enter your donation amount:</label>
    <input type="number" id="amount" name="amount" min="1" placeholder="e.g., 5">
    <button type="submit" class="donate-button">Donate</button>
  </form>
</div>

<!-- Contact Us Section -->
<div class="contact-us bold-style">
  <h2>Contact Us</h2>
  <p>Have questions or suggestions? Reach out to us at <a href="mailto:el602444@gmail.com">el602444@gmail.com</a>.</p>
</div>
