---
layout: default
title: Blog
permalink: /blog/
---

<section class="blog-listing">
  <h1>Blog</h1>
  <ul class="blog-posts">
    {% for post in site.posts %}
      <li class="blog-post-item">
        <a href="{{ post.url }}" class="blog-link">{{ post.title }}</a>
        <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
      </li>
    {% endfor %}
  </ul>
</section>

<!-- RSS Subscribe Link -->
<div class="rss-container">
  <a href="{{ site.url }}/feed.xml" class="rss-subscribe">
    Subscribe via RSS
  </a>
</div>
