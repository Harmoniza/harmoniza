---
layout: page
title:
permalink: /blog/
---

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

{% include support-harmoniza.html %}
